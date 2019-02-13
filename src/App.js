import React, { Suspense } from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import fetch from 'isomorphic-fetch';
import JSONValidationErrorList from './JSONValidationErrorList';
import MonacoJSONEditor from './MonacoJSONEditor';
import infoMarkdown from '@open-rpc/generator-docs/src/info';
import methodsMarkdown from '@open-rpc/generator-docs/src/methods';
import serversMarkdown from '@open-rpc/generator-docs/src/servers';
import ReactMarkdown from 'react-markdown';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      parsedSchema: {}
    }
    this.refreshEditorData = this.refreshEditorData.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(this.refreshEditorData, 1000);
  }
  refreshEditorData() {
    const markers = window.monaco.editor.getModelMarkers();
    let parsedSchema
    try {
      parsedSchema = JSON.parse(window.monaco.editor.getModels()[0].getValue())
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
  setMarkers(markers) {
    this.refreshEditorData();
  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>
          <MonacoJSONEditor onChangeMarkers={this.setMarkers.bind(this)}/>
          <JSONValidationErrorList markers={this.state.markers}/>
        </div>
        <div className='docs' style={{marginLeft: '30px', marginTop: '30px'}}>
          <h6>OpenRPC Playground</h6>
          {this.state.parsedSchema.info && <ReactMarkdown source={infoMarkdown(this.state.parsedSchema.info)} />}
          {this.state.parsedSchema.servers && <ReactMarkdown source={serversMarkdown(this.state.parsedSchema.servers)} />}
          {this.state.parsedSchema.methods && <ReactMarkdown source={methodsMarkdown(this.state.parsedSchema)} />}
        </div>
     </div>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
