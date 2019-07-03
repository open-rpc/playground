import { useState, Dispatch } from "react";

function useDefaultEditorValue(): [string | null, Dispatch<any>] {
  const [defaultValue, setDefaultValue] = useState<string | null>(() => {
    return window.localStorage.getItem("schema");
  });
  return [defaultValue, setDefaultValue];
}

export default useDefaultEditorValue;
