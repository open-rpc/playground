import React from 'react';
import * as monaco from 'monaco-editor';
import JSONValidationErrorList from './JSONValidationErrorList';
import MonacoJSONEditor from './MonacoJSONEditor';
import ReactMarkdown from 'react-markdown/with-html';
import infoTemplate from '@open-rpc/generator-docs/templates/info.template.md.js';
import serverTemplate from '@open-rpc/generator-docs/templates/server.template.md.js';
import methodTemplate from '@open-rpc/generator-docs/templates/method.template.md.js';
import refParser from 'json-schema-ref-parser';
import schemaToMarkdown from 'json-schema-to-markdown-table';
import './App.css'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      parsedSchema: {}
    }
    this.refreshEditorData = this.refreshEditorData.bind(this);
    this.checkMarkers = this.refeshMarkers.bind(this);
  }
  async componentDidMount() {
    setTimeout(this.refreshEditorData, 300);
  }

  refeshMarkers() {
    setTimeout(() => {
      const markers = monaco.editor.getModelMarkers();
      this.setState({
        markers
      })
    }, 1000)
  }
  async refreshEditorData() {
    let parsedSchema
    try {
      parsedSchema = await refParser.dereference(JSON.parse(monaco.editor.getModels()[0].getValue()));
    } catch (e) {

    }

    if (!parsedSchema) {
      this.refeshMarkers();
      return;
    }

    this.setState({
      ...this.state,
      parsedSchema: parsedSchema || this.state.parsedSchema
    });

    this.refeshMarkers();
  }
  setMarkers() {
    this.refreshEditorData();
  }
  render() {
    return (
      <div style={{ height: "100%", display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: "100%", width: '100%' }} >
          <JSONValidationErrorList markers={this.state.markers}/>
          <MonacoJSONEditor onChange={this.setMarkers.bind(this)}/>
        </div>
        <div className='docs'>
          {this.state.parsedSchema.info && <ReactMarkdown escapeHtml={false} source={infoTemplate({info: this.state.parsedSchema.info})} />}
          {this.state.parsedSchema.servers && <ReactMarkdown escapeHtml={false} source={serverTemplate({servers: this.state.parsedSchema.servers})} />}
          {this.state.parsedSchema.methods && this.state.parsedSchema.methods.length > 0 && <ReactMarkdown source={'## Methods \n\n'} />}
          {this.state.parsedSchema.methods && <ReactMarkdown escapeHtml={false} source={this.state.parsedSchema.methods.map((m) => methodTemplate({method: m, schemaToMarkdown})).join('')} />}
        </div>
      </div>
    );
  }
}
