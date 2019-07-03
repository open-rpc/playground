import { useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import schema from "@open-rpc/meta-schema";

const useMonacoModel = (
  defaultValue: string | undefined | null,
  editor: monaco.editor.IStandaloneCodeEditor,
) => {
  const [model, setModel] = useState();
  const [position, setPosition] = useState([4, 13, 4, 13]);
  useEffect(() => {
    if (editor) {
      const modelUri = monaco.Uri.parse(`inmemory:/${Math.random()}/model/userSpec.json`);
      const m = monaco.editor.createModel(defaultValue || "", "json", modelUri);
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        enableSchemaRequest: true,
        schemas: [
          {
            fileMatch: ["*"],
            schema,
            uri: modelUri.toString(),
          },
        ],
        validate: true,
      });
      m.updateOptions({ tabSize: 2 });
      setModel(m);
      editor.setModel(m);
      const [selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn] = position;
      editor.setSelection(
        new monaco.Selection(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn),
      );
      editor.focus();
    }

    return () => {
      if (model) {
        model.dispose();
      }
    };
  }, [editor]);
  return [model, setPosition];
};

export default useMonacoModel;
