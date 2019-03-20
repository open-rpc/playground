import React from "react";
import JSONValidationErrorList from "./JSONValidationErrorList";
import MonacoJSONEditor from "./MonacoJSONEditor";
import refParser from "json-schema-ref-parser";
import * as monaco from "monaco-editor";
import Documentation from "./Documentation";
import { debounce } from "lodash";
import "./App.css";
import fetchUrlSchemaFile from "./fetchUrlSchemaFile";
import fetchSchemaFromRpcDiscover from "./fetchSchemaFromRpcDiscover";
import AppBar from "./AppBar/AppBar";
import * as qs from "qs";
import { types } from "@open-rpc/meta-schema";
import { IUISchema } from "./uiSchema";

interface IState {
  markers: any[];
  defaultValue: string;
  parsedSchema: types.OpenRPC;
  reactJsonOptions: any;
  uiSchema: IUISchema;
}

export default class App extends React.Component<{}, IState> {
  private debouncedHandleUrlChange: any;

  constructor(props: {}) {
    super(props);
    this.state = {
      defaultValue: "",
      markers: [],
      parsedSchema: {} as types.OpenRPC,
      reactJsonOptions: {
        collapseStringsAfterLength: 15,
        displayDataTypes: false,
        displayObjectSize: false,
        indentWidth: 2,
        name: false,
      },
      uiSchema: {
        appBar: {
          "ui:inputPlaceholder": "Enter OpenRPC Document Url or rpc.discover Endpoint",
          /* tslint:disable */
          "ui:logoUrl": "https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png",
          /* tslint:enable */
          "ui:splitView": true,
          "ui:title": "OpenRPC Playground",
        },
        methods: {
          "ui:defaultExpanded": false,
        },
        params: {
          "ui:defaultExpanded": false,
        },
      },
    };
    this.refreshEditorData = this.refreshEditorData.bind(this);
    this.setMarkers = debounce(this.setMarkers.bind(this), 300);
    this.debouncedHandleUrlChange = debounce(this.dHandleUrlChange.bind(this), 300);
  }
  public dHandleUrlChange = async (jsonOrRPC: string) => {
    let newSchema;
    if (jsonOrRPC.match(/\.json$/)) {
      try {
        newSchema = await fetchUrlSchemaFile(jsonOrRPC);
      } catch (e) {
        console.error(`error fetching schema for: ${jsonOrRPC}`, e);
        return;
      }
    } else {
      try {
        const rpcResult = await fetchSchemaFromRpcDiscover(jsonOrRPC);
        newSchema = rpcResult.result;
      } catch (e) {
        console.error(`error fetching rpc.discover for: ${jsonOrRPC}`, e);
        return;
      }
    }
    monaco.editor.getModels()[0].setValue(JSON.stringify(newSchema, undefined, " "));
    this.refreshEditorData();
    this.setState({
      ...this.state,
      defaultValue: newSchema,
    });
  }

  public handleUrlChange = (event: any) => this.debouncedHandleUrlChange(event.target.value);

  public handleUISchemaAppBarChange = (name: string) => (event: any) => {
    this.setState({
      ...this.state,
      uiSchema: {
        ...this.state.uiSchema,
        appBar: {
          ...this.state.uiSchema.appBar,
          [name]: event.target.checked,
        },
      },
    });
  }

  public async componentDidMount() {
    const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    if (urlParams.schemaUrl) {
      this.dHandleUrlChange(urlParams.schemaUrl);
    }
    setTimeout(this.refreshEditorData, 300);
    setTimeout(this.refreshEditorData, 2000);
  }

  public refeshMarkers() {
    setTimeout(() => {
      const markers = monaco.editor.getModelMarkers({});
      this.setState({
        markers,
      });
    }, 1000);
  }
  public async refreshEditorData() {
    let parsedSchema;
    try {
      parsedSchema = await refParser.dereference(JSON.parse(monaco.editor.getModels()[0].getValue())) as types.OpenRPC;
    } catch (e) {
      console.error("error parsing schema", e);
    }

    if (!parsedSchema) {
      this.refeshMarkers();
      return;
    }

    this.setState({
      ...this.state,
      parsedSchema: parsedSchema || this.state.parsedSchema,
    });

    this.refeshMarkers();
  }
  public setMarkers() {
    this.refreshEditorData();
  }
  public render() {
    return (
      <>
        <AppBar
          uiSchema={this.state.uiSchema}
          onSplitViewChange={this.handleUISchemaAppBarChange("ui:splitView")}
          onChangeUrl={this.handleUrlChange} />
        <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
          { this.state.uiSchema.appBar["ui:splitView"] &&
            <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }} >
              <JSONValidationErrorList markers={this.state.markers} />
              <MonacoJSONEditor
                defaultValue={this.state.defaultValue}
                onChange={this.setMarkers.bind(this)} />
            </div>
          }
          <div className="docs">
            <Documentation
              schema={this.state.parsedSchema}
              uiSchema={this.state.uiSchema}
              reactJsonOptions={this.state.reactJsonOptions} />
          </div>
        </div>
      </>
    );
  }
}
