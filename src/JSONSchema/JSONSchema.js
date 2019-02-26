import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import _ from 'lodash';
import JSONSchemaFields from './fields/JSONSchemaFields';
import PrimitiveField from './fields/JSONSchemaPrimitiveField';

const itemMap = (i) => {
  if (i.type) {
    return <Typography key={i.type}>{i.type}</Typography>
  }
  if (i.properties) {
    return <JSONSchemaFields schema={i} />
  }
  return null;
}

class JSONSchema extends Component {
  render() {
    const { schema } = this.props;
    if (!schema) { return null; }
    if (schema && schema.type && !schema.properties) {
      return (
        <>
          {schema.oneOf && <Typography variant="body1">One Of</Typography>}
          {schema.oneOf && schema.oneOf.map((item) => {
            return (
              <PrimitiveField schema={item} />
            )
          })}
          {!schema.oneOf && <PrimitiveField schema={schema} />}
        </>

      )
    }
    if (schema && schema.type !== 'array') {
      return <JSONSchemaFields schema={schema} />
    }

    return null;
  }
}

export default JSONSchema;