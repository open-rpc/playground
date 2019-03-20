import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import _ from "lodash";
import JSONSchemaFields from "./fields/JSONSchemaFields";
import PrimitiveField from "./fields/JSONSchemaPrimitiveField";
import { JSONSchema4 } from "json-schema";

interface IProps {
  schema?: JSONSchema4;
}

class JSONSchema extends Component<IProps> {
  public render() {
    const { schema } = this.props;
    if (!schema) { return null; }
    if (_.isEmpty(schema)) { return null; }
    if (schema && schema.type && !schema.properties && schema.oneOf) {
      return (
        <>
          {schema.oneOf &&
            <>
              <Typography variant="body1">One Of</Typography>}
              {schema.oneOf.map((item) => {
                return (
                  <PrimitiveField schema={item} />
                );
              })}
            </>
          }
      </>
      );
    }
    let arrayWithItems = schema && schema.type === "array" && (schema.items || schema.contains);
    if (arrayWithItems) {
      arrayWithItems = _.isArray(arrayWithItems) ? arrayWithItems : [arrayWithItems];
      return (
        <>
          <Typography variant="body1">Array Of</Typography>
          <JSONSchemaFields schema={schema} />
          {arrayWithItems.map((item: JSONSchema4) => {
            return (
              <PrimitiveField schema={item} />
            );
          })}
        </>
      );
    }
    if (schema && schema.properties) {
      return <JSONSchemaFields schema={schema} />;
    }

    return <PrimitiveField schema={schema} />;
  }
}

export default JSONSchema;
