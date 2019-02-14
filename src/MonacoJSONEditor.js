import React, { useState, useEffect } from 'react';
import Hotkeys from 'react-hot-keys';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import { initVimMode } from 'monaco-vim';
import empty from 'json-schema-empty';
import * as monaco from 'monaco-editor';

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
    this.monaco = React.createRef();
  }
  async componentDidMount() {
    const schema = await fetchUrlSchemaFile('https://raw.githubusercontent.com/open-rpc/meta-schema/master/schema.json');
    const emptySchema = JSON.stringify(empty(schema), undefined, '\t');

    this.editorInstance = monaco.editor.create(this.monaco.current, {
	    value: emptySchema,
	    language: 'json',
      theme: 'vs-dark',
      options: {
        tabsize: 2,
        formatontype: true,
        formatonpaste: true,
        autoindent: true
      }
    });
    const modelUri = window.monaco.Uri.parse("inmemory://model/userSpec.json");
    const model = monaco.editor.createModel(emptySchema, "json", modelUri);
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
    this.editorInstance.onDidChangeModelContent(() => this.props.onChange(), 1000);
  }
  editorDidMount(editor, monaco) {
    this.setEditor(editor, monaco);
  }
  onChange(newValue, e) {
    this.props.onChangeMarkers(window.monaco.editor.getModelMarkers())
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
      <Hotkeys keyName="ctrl+alt+v" onKeyDown={this.onVimKeybind.bind(this)}>
        <div style={{height: '100%'}} ref={this.monaco} />
        <div id="vim-status-bar"></div>
      </Hotkeys>
    );
  }
}
