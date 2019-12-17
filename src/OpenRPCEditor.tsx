import React, { useRef, useEffect } from "react";
import MonacoEditor from "@etclabscore/react-monaco-editor";
import * as monaco from "monaco-editor";
import useWindowSize from "@rehooks/window-size";
import { addDiagnostics } from "@etclabscore/monaco-add-json-schema-diagnostics";
import schema from "@open-rpc/meta-schema";

interface IProps {
  onChange?: (newValue: any) => void;
  editorDidMount?: (_: any, editor: any) => any;
  value: any;
}

const OpenRPCEditor: React.FC<IProps> = (props) => {
  const editorRef = useRef();
  const windowSize = useWindowSize();
  let model: any;

  useEffect(() => {
    if (editorRef !== undefined && editorRef.current !== undefined) {
      (editorRef.current as any).layout();
    }
  }, [windowSize]);

  useEffect(() => {
    return function cleanup() {
      if (model) {
        model.dispose();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEditorDidMount(_: any, editor: any) {
    editorRef.current = editor;
    const modelUriString = "inmemory://openrpc-playground.json";
    const modelUri = monaco.Uri.parse(modelUriString);
    model = monaco.editor.createModel(props.value || "", "json", modelUri);
    editor.setModel(model);
    addDiagnostics(modelUri.toString(), schema, monaco);
    if (props.editorDidMount) {
      props.editorDidMount(_, editor);
    }
  }

  const handleChange = (ev: any, value: any) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <MonacoEditor
      height="93vh"
      value={props.value}
      editorDidMount={handleEditorDidMount}
      language="json"
      onChange={handleChange}
    />
  );
};

export default OpenRPCEditor;
