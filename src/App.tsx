import React from "react";
import JSONValidationErrorList from "./JSONValidationErrorList";
import MonacoJSONEditor from "./MonacoJSONEditor";
import refParser from "json-schema-ref-parser";
import * as monaco from "monaco-editor";
import Documentation from "@open-rpc/docs-react";
import { debounce, isEmpty } from "lodash";
import "./App.css";
import fetchUrlSchemaFile from "./fetchUrlSchemaFile";
import fetchSchemaFromRpcDiscover from "./fetchSchemaFromRpcDiscover";
import AppBar from "./AppBar/AppBar";
import * as qs from "qs";
import { OpenRPC } from "@open-rpc/meta-schema";
import { IUISchema } from "./UISchema";
import { SnackBar, ISnackBarNotification, NotificationType } from "./SnackBar/SnackBar";
import SplitPane from "react-split-pane";

interface IState {
  markers: any[];
  notification: ISnackBarNotification;
  defaultValue: string;
  parsedSchema: OpenRPC;
  reactJsonOptions: any;
  uiSchema: IUISchema;
}

export default class App extends React.Component<{}, IState> {
  private debouncedHandleUrlChange: any;
  private editorInstance?: monaco.editor.IStandaloneCodeEditor;

  constructor(props: {}) {
    super(props);
    this.state = {
      defaultValue: "",
      markers: [],
      notification: {} as ISnackBarNotification,
      parsedSchema: {} as OpenRPC,
      reactJsonOptions: {
        collapseStringsAfterLength: 25,
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
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  public setNotification = (notification: ISnackBarNotification) => {
    this.setState({ notification });
  }
  public setErrorNotification = (message: string) => {
    this.setNotification({ message, type: NotificationType.error });
  }

  public handleSnackbarClose() {
    this.setState({ notification: {} as ISnackBarNotification });
  }

  public dHandleUrlChange = async (jsonOrRPC: string) => {
    let newSchema;
    if (isEmpty(jsonOrRPC)) { return; }
    if (jsonOrRPC.match(/\.json$/)) {
      try {
        newSchema = await fetchUrlSchemaFile(jsonOrRPC);
      } catch (e) {
        const msg = `Error fetching schema for: ${jsonOrRPC}`;
        console.error(msg, e);
        this.setErrorNotification(msg);
        return;
      }
    } else {
      try {
        const rpcResult = await fetchSchemaFromRpcDiscover(jsonOrRPC);
        newSchema = rpcResult.result;
      } catch (e) {
        const msg = `Error fetching rpc.discover for: ${jsonOrRPC}`;
        console.error(msg, e);
        this.setErrorNotification(msg);
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
    const urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
      depth: 100,
      decoder(str) {
        if (/^(\d+|\d*\.\d+)$/.test(str)) {
          return parseFloat(str);
        }

        if (str === "false") {
          return false;
        }
        if (str === "true") {
          return true;
        }
        return decodeURIComponent(str);
      },
    });
    if (urlParams.schemaUrl) {
      this.dHandleUrlChange(urlParams.schemaUrl);
    }
    if (urlParams.schema) {
      monaco.editor.getModels()[0].setValue(JSON.stringify(urlParams.schema, undefined, " "));
    }
    if (urlParams.uiSchema) {
      this.setState({
        uiSchema: {
          ...this.state.uiSchema,
          ...urlParams.uiSchema,
        },
      });
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
      parsedSchema = await refParser.dereference(JSON.parse(monaco.editor.getModels()[0].getValue())) as OpenRPC;
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
        {this.getPlayground()}
        <SnackBar close={this.handleSnackbarClose} notification={this.state.notification} />
      </>
    );
  }

  private getSplitPane() {
    return (
      <SplitPane
        split="vertical"
        minSize={100}
        maxSize={-100}
        defaultSize={window.innerWidth / 2}
        onChange={(size) => this.editorInstance && this.editorInstance.layout()}>
        <div key={1} style={{ display: "flex", flexDirection: "column", height: "100%" }} >
          <JSONValidationErrorList markers={this.state.markers} />
          <MonacoJSONEditor
            onCreate={(editorInstance: monaco.editor.IStandaloneCodeEditor) => this.editorInstance = editorInstance}
            defaultValue={this.state.defaultValue}
            onChange={this.setMarkers.bind(this)} />
        </div>
        <div className="docs" key={2}>
          <Documentation
            schema={this.state.parsedSchema as OpenRPC}
            uiSchema={this.state.uiSchema}
            reactJsonOptions={this.state.reactJsonOptions}
          />
        </div>
      </SplitPane>
    );
  }

  private getPlayground = () => {
    if (!this.state.uiSchema.appBar["ui:splitView"]) {
      return (
        <div className="docs" key={2}>
          <Documentation
            schema={this.state.parsedSchema as OpenRPC}
            uiSchema={this.state.uiSchema}
            reactJsonOptions={this.state.reactJsonOptions}
          />
        </div>
      );
    } else {
      return this.getSplitPane();
    }
  }

}
