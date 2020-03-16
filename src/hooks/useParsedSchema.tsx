import { useState, useEffect, Dispatch } from "react";
import _ from "lodash";
import refParser from "json-schema-ref-parser";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

const useParsedSchema = (defaultValue: object | any): [OpenrpcDocument | undefined, Dispatch<string>] => {
  const [parsedSchema, setParsedSchema]: [OpenrpcDocument | undefined, Dispatch<OpenrpcDocument>] = useState();
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
      setParsedSchema(dereferencedSchema as OpenrpcDocument);
      // set original non-dereff'd schema to localstorage
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
