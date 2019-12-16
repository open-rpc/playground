import { useState, useEffect } from "react";
import _ from "lodash";
import refParser from "json-schema-ref-parser";

const useParsedSchema = (defaultValue: object | any) => {
  const [parsedSchema, setParsedSchema] = useState();
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
  useEffect(() => {
    if (defaultValue) {
      validateAndSetSchema(defaultValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [parsedSchema, validateAndSetSchema];
};

export default useParsedSchema;
