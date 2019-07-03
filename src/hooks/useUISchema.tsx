import { useState } from "react";
import { IUISchema } from "../UISchema";

type SetSectionType = ({ section, key, value }: {
  section: string;
  key: string;
  value: any;
}) => any;

const useUISchema = (defaultValue: IUISchema): [IUISchema, SetSectionType] => {
  const [UISchema, setUISchema] = useState(defaultValue);
  const setUISchemaBySection: SetSectionType = ({ section, key, value }) => {
    setUISchema({
      ...UISchema,
      [section]: {
        ...UISchema.appBar,
        [key]: value,
      },
    });
  };
  return [UISchema, setUISchemaBySection];
};

export default useUISchema;
