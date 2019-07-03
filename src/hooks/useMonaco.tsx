import React, { useState, useEffect } from "react";
import * as monaco from "monaco-editor";

const useMonaco = (
  monacoRef: React.RefObject<HTMLElement>,
  darkMode: boolean,
  onChange?: (event: monaco.editor.IModelContentChangedEvent, schema: string) => any,
  watchers?: any[],
) => {
  const [editor, setEditor] = useState();
  const updateDimensions = () => {
    if (editor) {
      editor.layout();
    }
  };
  useEffect(() => {
    let onChangeRef: monaco.IDisposable;
    if (monacoRef && monacoRef.current) {
      const e = monaco.editor.create(monacoRef.current, {
        theme: darkMode ? "vs-dark" : "vs",
      });
      setEditor(e);
      onChangeRef = e.onDidChangeModelContent((event: monaco.editor.IModelContentChangedEvent) => {
        if (onChange) {
          const v = e.getValue();
          onChange(event, v);
        }
      });
      window.addEventListener("resize", updateDimensions);
    }
    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (editor) {
        editor.dispose();
      }
      if (onChangeRef) {
        onChangeRef.dispose();
      }
    };
  }, [...watchers || []]);
  return [editor, updateDimensions];
};

export default useMonaco;
