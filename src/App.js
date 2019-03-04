import React from 'react';
import JSONValidationErrorList from './JSONValidationErrorList';
import MonacoJSONEditor from './MonacoJSONEditor';
import refParser from 'json-schema-ref-parser';
import * as monaco from 'monaco-editor';
import Documentation from './Documentation';
import InputBase from '@material-ui/core/InputBase';
import _ from 'lodash';
import './App.css'
import { AppBar, Toolbar, Typography, Grid, Paper, FormControlLabel, Checkbox } from '@material-ui/core';
import fetchUrlSchemaFile from './fetchUrlSchemaFile';
import fetchSchemaFromRpcDiscover from './fetchSchemaFromRpcDiscover';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
const fetchSchemaRpcDebounced = AwesomeDebouncePromise(fetchSchemaFromRpcDiscover, 500);
const fetchUrlSchemaFileDebounced = AwesomeDebouncePromise(fetchUrlSchemaFile, 500);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      parsedSchema: {},
      splitView: true,
      uiSchema: {
        appBar: {
          "ui:logoUrl": "https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png",
          "ui:title": "OpenRPC Playground"
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
    this.setMarkers = _.debounce(this.setMarkers.bind(this), 300);
  }
  handleUrlChange = async event => {
    const jsonOrRPC = event.target.value
    let newSchema = null;
    if (jsonOrRPC.match(/\.json$/)) {
      try {
        newSchema = await fetchUrlSchemaFileDebounced(jsonOrRPC);
      } catch (e) {
        // show user error fetching schema file
        return;
      }
    } else {
      try {
        newSchema = await fetchSchemaRpcDebounced(jsonOrRPC);
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
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked  })
  }

  async componentDidMount() {
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
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container>
              <img alt="open-rpc" height="30" width="30" src={this.state.uiSchema.appBar['ui:logoUrl']} />
              <Grid item xs={2}>
                <Typography variant="h6">{this.state.uiSchema.appBar['ui:title']}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{width: '100%', background: 'rgba(0, 0, 0, 0.1)', padding: '0px 10px 0px 10px'}} elevation={0}>
                  <InputBase
                    style={{width: '100%'}}
                    onChange={this.handleUrlChange}
                    placeholder="Enter OpenRPC Document Url or rpc.discover Endpoint"
                  />
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  style={{marginLeft: '30px', height: '30px'}}
                  control={
                    <Checkbox
                      checked={this.state.splitView}
                      onChange={this.handleChange('splitView')}
                      value="splitView"
                      color="primary"
                    />
                  }
                  label="Split View"
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div style={{ height: "100%", display: 'flex', flexDirection: 'row' }}>
          {this.state.splitView &&
            <div style={{ display: 'flex', flexDirection: 'column', height: "100%", width: '100%' }} >
              <JSONValidationErrorList markers={this.state.markers} />
              <MonacoJSONEditor defaultValue={this.state.defaultValue} onChange={this.setMarkers.bind(this)} />
            </div>
          }
          <div className='docs'>
            <Documentation schema={this.state.parsedSchema} uiSchema={this.state.uiSchema} />
          </div>
        </div>
      </>
    );
  }
}
