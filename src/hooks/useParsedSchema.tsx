import { useState, useEffect } from "react";
import _ from "lodash";
import refParser from "json-schema-ref-parser";

const useParsedSchema = (defaultValue: object | any) => {
  const [parsedSchema, setParsedSchema] = useState();
  const [schema, setSchema] = useState();
  const validateAndSetSchema = (schemaToValidate: string) => {
    let maybeSchema: any;
    try {
      maybeSchema = JSON.parse(schemaToValidate);
    } catch (e) {
      //
    }
    if (!maybeSchema) {
      return;
    }
    setSchema(maybeSchema);
    refParser.dereference(maybeSchema).then((dereferencedSchema) => {
      setParsedSchema(dereferencedSchema);
      _.defer(() => window.localStorage.setItem("schema", schemaToValidate));
    });
  };
  useEffect(() => {
    if (defaultValue) {
      validateAndSetSchema(defaultValue);
    }
  }, []);
  return [parsedSchema, schema, validateAndSetSchema];
};

export default useParsedSchema;
