import React, { useState, useEffect } from 'react';
import Hotkeys from 'react-hot-keys';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import { initVimMode } from 'monaco-vim';


const fetchUrlSchemaFile = async (schema) => {
  try {
    const response = await fetch(schema);
    return await response.json();
  } catch(e) {
    throw new Error(`Unable to download openrpc.json file located at the url: ${schema}`);
  }
};

export default class MonacoJSONEditor extends React.Component {
  constructor(props) {
    super(props);
    console.log('props=', props);
    this.state = {
      code: [
        '{',
        '\t',
        '}'
      ].join('\n')
    }
    this.monaco = React.createRef();
  }
  async setEditor(editor, monaco) {
    const schema = await fetchUrlSchemaFile('https://raw.githubusercontent.com/open-rpc/meta-schema/master/schema.json');

    const modelUri = window.monaco.Uri.parse("inmemory://model/userSpec.json");
    const model = monaco.editor.createModel(this.state.code, "json", modelUri);
    editor.setModel(model);
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
    editor.setSelection(new monaco.Selection(2,2,2,2));

    editor.focus();
    this.editor = editor;
  }
  editorDidMount(editor, monaco) {
    this.setEditor(editor, monaco);
  }
  onChange(newValue, e) {
    this.props.onChangeMarkers(window.monaco.editor.getModelMarkers())
  }
  onVimKeybind(e) {
    console.log('vim mode', this.vimMode);
    if (this.vimMode) {
      this.vimMode.dispose();
      this.statusNode.innerHTML = '';
      this.vimMode = null;
      return;
    }
    this.statusNode = document.getElementById('vim-status-bar');
    this.vimMode = initVimMode(this.editor, this.statusNode);
    return;
  }
  render() {
    const code = this.state.code;
    const options = {
      tabSize: 2,
      formatOnType: true, 
      formatOnPaste: true,
      autoIndent: true,
      glyphMargin: true
    };
    return (
      <>
        <Hotkeys 
          keyName="ctrl+alt+v"
          onKeyDown={this.onVimKeybind.bind(this)}>
          <MonacoEditor
            width={window.innerWidth / 2}
            height={window.innerHeight * .8}
            language="json"
            theme="vs-dark"
            ref={this.monaco}
            defaulValue={code}
            options={options}
            onChange={this.onChange.bind(this)}
            editorDidMount={this.editorDidMount.bind(this)}
          />
        </Hotkeys>
        <div id="vim-status-bar"></div>
      </>
    );
  }
}