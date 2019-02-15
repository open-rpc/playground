import React, { Suspense } from 'react';
import { render } from 'react-dom';
import * as monaco from 'monaco-editor';
import fetch from 'isomorphic-fetch';
import JSONValidationErrorList from './JSONValidationErrorList';
import MonacoJSONEditor from './MonacoJSONEditor';
import ReactMarkdown from 'react-markdown';
import infoTemplate from '@open-rpc/generator-docs/templates/info.template.md.js';
import serverTemplate from '@open-rpc/generator-docs/templates/server.template.md.js';
import methodTemplate from '@open-rpc/generator-docs/templates/method.template.md.js';

const fetchUrlSchemaFile = async (schema) => {
  try {
    const response = await fetch(schema);
    return await response.json();
  } catch(e) {
    throw new Error(`Unable to download openrpc.json file located at the url: ${schema}`);
  }
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      parsedSchema: {}
    }
    this.refreshEditorData = this.refreshEditorData.bind(this);
  }
  async componentDidMount() {
    this.interval = setInterval(this.refreshEditorData, 1000);
  }
  refreshEditorData() {
    const markers = monaco.editor.getModelMarkers();
    let parsedSchema
    try {
      parsedSchema = JSON.parse(monaco.editor.getModels()[0].getValue())
    } catch (e) {
    }

    this.setState({
      markers,
      parsedSchema: parsedSchema || this.state.parsedSchema
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  setMarkers() {
    this.refreshEditorData();
  }
  render() {
    return (
      <div style={{ height: "100%", display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: "100%", width: '50%' }} >
          <JSONValidationErrorList markers={this.state.markers}/>
          <MonacoJSONEditor onChange={this.setMarkers.bind(this)}/>
        </div>

        <div className='docs' style={{margin: '40px'}}>
          {this.state.parsedSchema.info && <ReactMarkdown source={infoTemplate({info: this.state.parsedSchema.info})} />}
          {this.state.parsedSchema.servers && <ReactMarkdown source={serverTemplate({servers: this.state.parsedSchema.servers})} />}
          {this.state.parsedSchema.methods && <ReactMarkdown source={this.state.parsedSchema.methods.map((m) => methodTemplate({method: m})).join('')} />}
        </div>
      </div>
    );
  }
}
