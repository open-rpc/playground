import React from 'react';
import JSONValidationErrorList from './JSONValidationErrorList';
import MonacoJSONEditor from './MonacoJSONEditor';
import refParser from 'json-schema-ref-parser';
import * as monaco from 'monaco-editor';
import Documentation from './Documentation';
import { debounce } from 'lodash';
import './App.css'
import fetchUrlSchemaFile from './fetchUrlSchemaFile';
import fetchSchemaFromRpcDiscover from './fetchSchemaFromRpcDiscover';
import AppBar from './AppBar/AppBar';
import qs from 'qs'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      parsedSchema: {},
      splitView: true,
      reactJsonOptions: {
        name: false,
        indentWidth: 2,
        collapseStringsAfterLength: 15,
        displayObjectSize: false,
        displayDataTypes: false
      },
      uiSchema: {
        appBar: {
          "ui:title": "OpenRPC Playground",
          "ui:logoUrl": "https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png",
          "ui:inputPlaceholder": "Enter OpenRPC Document Url or rpc.discover Endpoint"
        },
        methods: {
          "ui:defaultExpanded": false
        },
        params: {
          "ui:defaultExpanded": false
        }
      }
    }
    this.refreshEditorData = this.refreshEditorData.bind(this);
    this.setMarkers = debounce(this.setMarkers.bind(this), 300);
    this.debouncedHandleUrlChange = debounce(this._handleUrlChange.bind(this), 300);
  }
  _handleUrlChange = async jsonOrRPC => {
    let newSchema;
    if (jsonOrRPC.match(/\.json$/)) {
      try {
        newSchema = await fetchUrlSchemaFile(jsonOrRPC);
      } catch (e) {
        // show user error fetching schema file
        return;
      }
    } else {
      try {
        const rpcResult = await fetchSchemaFromRpcDiscover(jsonOrRPC);
        newSchema = rpcResult.result;
      } catch (e) {
        return;
        // show user error fetching rpc.discover
      }
    }
    monaco.editor.getModels()[0].setValue(JSON.stringify(newSchema, undefined, ' '));
    this.refreshEditorData();
    this.setState({
      ...this.state,
      defaultValue: newSchema
    })
  }

  handleUrlChange = (event) => this.debouncedHandleUrlChange(event.target.value)

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked  })
  }

  async componentDidMount() {
    let urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    if (urlParams['schemaUrl']) {
      this._handleUrlChange(urlParams['schemaUrl'])
    }
    setTimeout(this.refreshEditorData, 1000);
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
      <>
        <AppBar uiSchema={this.state.uiSchema} splitView={this.state.splitView} onSplitViewChange={this.handleChange('splitView')} onChangeUrl={this.handleUrlChange}/>
        <div style={{ height: "100%", display: 'flex', flexDirection: 'row' }}>
          { this.state.splitView &&
            <div style={{ display: 'flex', flexDirection: 'column', height: "100%", width: '100%' }} >
              <JSONValidationErrorList markers={this.state.markers} />
              <MonacoJSONEditor defaultValue={this.state.defaultValue} onChange={this.setMarkers.bind(this)} />
            </div>
          }
          <div className='docs'>
            <Documentation schema={this.state.parsedSchema} uiSchema={this.state.uiSchema} reactJsonOptions={this.state.reactJsonOptions}/>
          </div>
        </div>
      </>
    );
  }
}
