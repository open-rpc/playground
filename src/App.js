import React from 'react';
import JSONValidationErrorList from './JSONValidationErrorList';
import MonacoJSONEditor from './MonacoJSONEditor';
import refParser from 'json-schema-ref-parser';
import * as monaco from 'monaco-editor';
import Documentation from './Documentation';
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
          <Documentation schema={this.state.parsedSchema}/>
        </div>
      </div>
    );
  }
}
