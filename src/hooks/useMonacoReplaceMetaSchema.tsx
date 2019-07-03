import React, { useState, useEffect } from "react";
import * as monaco from "monaco-editor";
const { initVimMode } = require("monaco-vim"); //tslint:disable-line
import schema from "@open-rpc/meta-schema";

// Vim Mode:
// Press Chord Ctrl-K, Ctrl-V => the action will run if it is enabled
const useMonacoReplaceMetaSchema = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const [metaSchema, setMetaSchema] = useState(schema);

  useEffect(() => {
    if (!editor) { return; }

    // reset editor to empty schema

    /* tslint:disable */
    // replace schema:
    // Press Chord Ctrl-K, Ctrl-R => the action will run if it is enabled

    editor.addAction({
      // An unique identifier of the contributed action.
      id: "replace-meta-schema",

      // A label of the action that will be presented to the user.
      label: "Replace Meta Schema",

      // An optional array of keybindings for the action.
      keybindings: [
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_R),
      ],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: (ed) => {
        const result = window.prompt("Paste schema to replace current meta schema", "{}");
        if (result) {
          const metaSchema = JSON.parse(result);
          setMetaSchema(metaSchema);
        }
      },
    });
  }, [editor]);

  return [metaSchema];
};

export default useMonacoReplaceMetaSchema;
