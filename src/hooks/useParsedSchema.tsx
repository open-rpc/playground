import { useState } from "react";
import _ from "lodash";
import refParser from "json-schema-ref-parser";

const useParsedSchema = (defaultValue: object | any) => {
  const [parsedSchema, setParsedSchema] = useState(defaultValue);
  const validateAndSetSchema = (schema: string) => {
    let maybeSchema;
    try {
      maybeSchema = JSON.parse(schema);
    } catch (e) {
      //
    }
    if (!maybeSchema) {
      return;
    }
    refParser.dereference(maybeSchema).then((dereferencedSchema) => {
      setParsedSchema(dereferencedSchema);
      _.defer(() => window.localStorage.setItem("schema", schema));
    });
  };
  return [parsedSchema, validateAndSetSchema];
};

export default useParsedSchema;
