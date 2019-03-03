import React from 'react';
import empty from 'json-schema-empty';
import * as monaco from 'monaco-editor';
import { initVimMode } from 'monaco-vim';
import fetchUrlSchemaFile from './fetchUrlSchemaFile';

export default class MonacoJSONEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.monaco = React.createRef();
    this.addCommands = this.addCommands.bind(this);
  }
  async componentDidMount() {
    const schema = await fetchUrlSchemaFile('https://raw.githubusercontent.com/open-rpc/meta-schema/master/schema.json');
    this.metaSchema = schema;
    const emptySchema = JSON.stringify(empty(schema), undefined, '\t');
    const localStorageSchema = window.localStorage.getItem('schema');
    const defaultValue = localStorageSchema || emptySchema;

    this.editorInstance = monaco.editor.create(this.monaco.current, {
	    value: this.props.defaultValue || defaultValue,
	    language: 'json',
      theme: 'vs-dark',
      options: {
        formatOnType: true,
        formatOnPaste: true,
        autoIndent: true
      }
    });
    const modelUri = window.monaco.Uri.parse(`inmemory://model/${Math.random()}-userSpec.json`);
    const model = monaco.editor.createModel(defaultValue, "json", modelUri);
    model.updateOptions({tabSize: 2});
    this.editorInstance.setModel(model);
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      enableSchemaRequest: true,
      validate: true,
      schemas: [
        {
          fileMatch: ['*'],
          schema
        }
      ]
    })
    this.editorInstance.setSelection(new monaco.Selection(3,13,3,13));

    this.editorInstance.focus();
    window.onresize = () => this.editorInstance.layout();
    setTimeout(() => this.editorInstance.layout(), 1000);
    this.editorInstance.onDidChangeModelContent(() => {
      const changedSchema = this.editorInstance.getValue();
      window.localStorage.setItem('schema', changedSchema);
      this.props.onChange(changedSchema);
    });
    this.addCommands(this.editorInstance);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.state.defaultValue) {
      this.editorInstance.setValue(JSON.stringify(nextProps.defaultValue, null, '  '));
      this.setState({
        defaultValue: nextProps.defaultValue
      })
    }
  }
  addCommands(editor) {

    // reset editor to empty schema

    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'empty-schema',

      // A label of the action that will be presented to the user.
      label: 'Reset to Empty Schema',

      // An optional array of keybindings for the action.
      keybindings: [
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.Backspace)
      ],

      // A precondition for this action.
      precondition: null,

      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: null,

      contextMenuGroupId: 'navigation',

      contextMenuOrder: 1.5,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: (ed) => {
        let emptySchema;
        try {
          emptySchema = JSON.stringify(empty(this.metaSchema), undefined, '\t');
        } catch (e) {
          if (JSON.stringify(this.metaSchema) === '{}') {
            emptySchema = '{\n\t\n}';
          } else {
            emptySchema = JSON.stringify(this.metaSchema, undefined, '\t');
          }
        }
        this.editorInstance.setValue(emptySchema);
      }
    });

    // replace schema:
    // Press Chord Ctrl-K, Ctrl-R => the action will run if it is enabled

    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'replace-meta-schema',

      // A label of the action that will be presented to the user.
      label: 'Replace Meta Schema',

      // An optional array of keybindings for the action.
      keybindings: [
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_R)
      ],

      // A precondition for this action.
      precondition: null,

      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: null,

      contextMenuGroupId: 'navigation',

      contextMenuOrder: 1.5,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: (ed) => {
        const result = window.prompt("Paste schema to replace current meta schema", "{}");
        const metaSchema = JSON.parse(result)
        this.metaSchema = metaSchema;
        if (result != null) {
          monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            enableSchemaRequest: true,
            validate: true,
            schemas: [
              {
                fileMatch: ['*'],
                schema: metaSchema
              }
            ]
          })
        }
        return null;
      }
    });

    // Vim Mode:
    // Press Chord Ctrl-K, Ctrl-V => the action will run if it is enabled

    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'vim-mode',

      // A label of the action that will be presented to the user.
      label: 'Vim Mode',

      // An optional array of keybindings for the action.
      keybindings: [
        // chord
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V)
      ],

      // A precondition for this action.
      precondition: null,

      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: null,

      contextMenuGroupId: 'navigation',

      contextMenuOrder: 1.5,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: (ed) => {
        this.onVimKeybind();
        return null;
      }
    });
  }
  editorDidMount(editor, monaco) {
    this.setEditor(editor, monaco);
  }
  onChange(newValue, e) {
    this.props.onChangeMarkers(window.monaco.editor.getModelMarkers())
  }
  componentWillUnmount() {
    this.editorInstance && this.editorInstance.dispose();
  }
  onVimKeybind(e) {
    if (this.vimMode) {
      this.vimMode.dispose();
      this.statusNode.innerHTML = '';
      this.vimMode = null;
      return;
    }
    this.statusNode = document.getElementById('vim-status-bar');
    this.vimMode = initVimMode(this.editorInstance, this.statusNode);
    return;
  }
  render() {
     return (
       <>
        <div style={{height: '100%'}} ref={this.monaco} />
        <div id="vim-status-bar" style={{position: 'fixed', bottom: '0', background: 'white', opacity: '0.5'}}></div>
       </>
    );
  }
}
