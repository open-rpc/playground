import { useState, useEffect } from "react";
import * as monaco from "monaco-editor";
const { initVimMode } = require("monaco-vim"); //tslint:disable-line

// Vim Mode:
// Press Chord Ctrl-K, Ctrl-V => the action will run if it is enabled
const useMonacoVimMode = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const [vimMode, setVimMode] = useState();

  useEffect(() => {
    if (!editor) { return; }

    editor.addAction({
      id: "vim-mode",
      label: "Vim Mode",
      keybindings: [
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V), //tslint:disable-line
      ],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: () => {
        if (vimMode) {
          vimMode.dispose();
        }
        setVimMode(initVimMode(editor));
      },
    });

    return () => {
      if (vimMode) {
        vimMode.dispose();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return [editor, vimMode];
};

export default useMonacoVimMode;
