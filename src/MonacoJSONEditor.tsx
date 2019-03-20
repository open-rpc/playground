import React, { ReactNode } from "react";
/* tslint:disable */
let empty = require("json-schema-empty");
empty = empty.default;
const { initVimMode } = require("monaco-vim");
/* tslint:enable */
import * as monaco from "monaco-editor";
import fetchUrlSchemaFile from "./fetchUrlSchemaFile";
import _ from "lodash";
import { JSONSchema4 } from "json-schema";

interface IProps {
  defaultValue?: string;
  onChangeMarkers?: any;
  onChange?: any;
}

export default class MonacoJSONEditor extends React.Component<IProps> {
  private monaco: React.RefObject<HTMLDivElement>;
  private metaSchema: JSONSchema4 | null;
  private editorInstance: monaco.editor.IStandaloneCodeEditor | null;
  private vimMode: any;
  private statusNode: HTMLElement | null;
  constructor(props: IProps) {
    super(props);
    this.monaco = React.createRef();
    this.metaSchema = null;
    this.editorInstance = null;
    this.addCommands = this.addCommands.bind(this);
    this.vimMode = null;
    this.statusNode = null;
  }

  public async componentDidMount() {
    const existingModels = monaco.editor.getModels().length > 0;
    let model;

    if (!existingModels) {
      /* tslint:disable */
      const schema = await fetchUrlSchemaFile("https://raw.githubusercontent.com/open-rpc/meta-schema/b6a4e119e80db1a66cfd3a38dd6fee95bc3e9906/schema.json");
      /* tslint:enable */
      const modelUri = monaco.Uri.parse(`inmemory:/${Math.random()}/model/userSpec.json`);

      this.metaSchema = schema;
      const defaultV = _.isEmpty(this.props.defaultValue) ? null
        : JSON.stringify(this.props.defaultValue, undefined, "  ");
      const emptySchema = JSON.stringify(empty(schema), undefined, "\t");
      const localStorageSchema = window.localStorage.getItem("schema");
      const defaultValue = defaultV || localStorageSchema || emptySchema;

      model = monaco.editor.createModel(defaultValue, "json", modelUri);
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
      model.updateOptions({ tabSize: 2 });
    } else {
      model = monaco.editor.getModels()[0];
    }

    const options = {
      language: "json",
      options: {
        autoIndent: true,
        formatOnPaste: true,
        formatOnType: true,
      },
      theme: "vs-dark",
    };

    if (this.monaco && this.monaco.current) {
      this.editorInstance = monaco.editor.create(this.monaco.current, {
        ...options,
      });
      this.editorInstance.setModel(model);
      this.editorInstance.setSelection(new monaco.Selection(3, 13, 3, 13));

      this.editorInstance.focus();
      window.onresize = () => this.editorInstance && this.editorInstance.layout();
      setTimeout(() => this.editorInstance && this.editorInstance.layout(), 1000);

      this.editorInstance.onDidChangeModelContent(() => {
        const changedSchema = this.editorInstance && this.editorInstance.getValue();
        if (changedSchema) {
          window.localStorage.setItem("schema", changedSchema);
          this.props.onChange(changedSchema);
        }
      });
    }

    this.addCommands(this.editorInstance);
  }
  public addCommands(editor: monaco.editor.IStandaloneCodeEditor | null) {
    if (!editor) { return; }

    // reset editor to empty schema

    /* tslint:disable */
    editor.addAction({
      // An unique identifier of the contributed action.
      id: "empty-schema",

      // A label of the action that will be presented to the user.
      label: "Reset to Empty Schema",

      // An optional array of keybindings for the action.
      keybindings: [
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.Backspace),
      ],
      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: (ed) => {
        let emptySchema;
        try {
          emptySchema = JSON.stringify(empty(this.metaSchema), undefined, "\t");
        } catch (e) {
          if (JSON.stringify(this.metaSchema) === "{}") {
            emptySchema = "{\n\t\n}";
          } else {
            emptySchema = JSON.stringify(this.metaSchema, undefined, "\t");
          }
        }
        this.editorInstance && this.editorInstance.setValue(emptySchema);
      },
    });

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
          this.metaSchema = metaSchema;
        }
        if (result != null) {
          const modelUri = monaco.Uri.parse(`inmemory:/${Math.random()}/model/userSpec.json`);
          monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            enableSchemaRequest: true,
            schemas: [
              {
                fileMatch: ["*"],
                schema: this.metaSchema,
                uri: modelUri.toString(),
              },
            ],
            validate: true,
          });
        }
      },
    });

    // Vim Mode:
    // Press Chord Ctrl-K, Ctrl-V => the action will run if it is enabled

    editor.addAction({
      // An unique identifier of the contributed action.
      id: "vim-mode",

      // A label of the action that will be presented to the user.
      label: "Vim Mode",

      // An optional array of keybindings for the action.
      keybindings: [
        // chord
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V),
      ],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: (ed) => {
        this.onVimKeybind();
      },
    });
    /* tslint:enable */
  }
  public onChange() {
    if (this.props.onChangeMarkers) {
      this.props.onChangeMarkers(monaco.editor.getModelMarkers({}));
    }
  }
  public componentWillUnmount() {
    if (this.editorInstance) {
      this.editorInstance.dispose();
    }
  }
  public onVimKeybind() {
    if (this.vimMode) {
      this.vimMode.dispose();
      if (this.statusNode) {
        this.statusNode.innerHTML = "";
      }
      this.vimMode = null;
      return;
    }
    this.statusNode = document.getElementById("vim-status-bar");
    this.vimMode = initVimMode(this.editorInstance, this.statusNode);
    return;
  }
  public render() {
    return (
      <>
        <div style={{ height: "100%" }} ref={this.monaco} />
        <div id="vim-status-bar" style={{ position: "fixed", bottom: "0", background: "white", opacity: 0.5 }}></div>
      </>
    );
  }
}
