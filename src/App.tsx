import React, { useState, useRef, useEffect } from "react";
import JSONValidationErrorList from "./JSONValidationErrorList";
import * as monaco from "monaco-editor";
import _ from "lodash";
import { Documentation } from "@open-rpc/docs-react";
import useInterval from "@use-it/interval";
import "./App.css";
import AppBar from "./AppBar/AppBar";
import { OpenRPC } from "@open-rpc/meta-schema";
import { mergeUISchema, IUISchema } from "./UISchema";
import { SnackBar, ISnackBarNotification, NotificationType } from "./SnackBar/SnackBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "./themes/openrpcTheme";
import { CssBaseline } from "@material-ui/core";
import PlaygroundSplitPane from "./PlaygroundSplitPane";
import useParsedSchema from "./hooks/useParsedSchema";
import useDefaultEditorValue from "./hooks/useDefaultEditorValue";
import InspectorPlugin from "./plugins/InspectorPlugin";
import UISchemaStore from "./stores/UISchemaStore";
import searchBarStore from "./stores/searchBarStore";
import examples from "./examplesList";
import OpenRPCEditor from "./OpenRPCEditor";
import useMonacoReplaceMetaSchema from "./hooks/useMonacoReplaceMetaSchema";
import useMonacoVimMode from "./hooks/useMonacoVimMode";

const App: React.FC = () => {
  const [defaultValue, setDefaultValue] = useDefaultEditorValue();
  const [markers, setMarkers] = useState<monaco.editor.IMarker[]>([] as monaco.editor.IMarker[]);
  const [searchUrl, { results, error }, setSearchUrl] = searchBarStore();
  const [notification, setNotification] = useState<ISnackBarNotification | undefined>();
  const [UISchema, setUISchemaBySection]: [IUISchema, any] = UISchemaStore();
  const [editor, setEditor] = useState();
  useMonacoReplaceMetaSchema(editor);
  useMonacoVimMode(editor);

  const handleEditorDidMount = (__: any, ed: any) => {
    setEditor(ed);
  };

  useEffect(() => {
    const defaultExample = examples.find((e) => e.name === "petstore");
    if (!defaultValue && !searchUrl && defaultExample) {
      setSearchUrl(defaultExample.url);
    }
  }, [defaultValue]);

  useEffect(() => {
    setReactJsonOptions({
      ...reactJsonOptions,
      theme: UISchema.appBar["ui:darkMode"] ? "summerfruit" : "summerfruit:inverted",
    });
  }, [UISchema.appBar["ui:darkMode"]]);

  useInterval(() => {
    const modelUriString = "inmemory://openrpc-playground.json";
    const modelUri = monaco.Uri.parse(modelUriString);
    const mk = monaco.editor.getModelMarkers({
      resource: modelUri,
    });
    setMarkers(mk);
  }, 5000);

  useEffect(() => {
    if (results && editor) {
      editor.setValue(results);
    }
    if (results) {
      setParsedSchema(results);
    }
  }, [results]);

  useEffect(() => {
    if (error) {
      setNotification({
        type: NotificationType.error,
        message: error,
      });
    }
  }, [error]);

  const [parsedSchema, setParsedSchema] = useParsedSchema(defaultValue ? JSON.parse(defaultValue) : null);
  useEffect(() => {
    setParsedSchema(defaultValue);
  }, [defaultValue]);
  const [reactJsonOptions, setReactJsonOptions] = useState({
    theme: "summerfruit:inverted",
    collapseStringsAfterLength: 25,
    displayDataTypes: false,
    displayObjectSize: false,
    indentWidth: 2,
    name: false,
  });
  return (
    <MuiThemeProvider theme={UISchema.appBar["ui:darkMode"] ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar
        searchBarUrl={searchUrl}
        uiSchema={UISchema}
        onSplitViewChange={(value) => {
          setUISchemaBySection({
            value,
            key: "ui:splitView",
            section: "appBar",
          });
        }}
        onDarkModeChange={(value: boolean) => {
          monaco.editor.setTheme(value ? "vs-dark" : "vs");
          setUISchemaBySection({
            value,
            key: "ui:darkMode",
            section: "appBar",
          });
        }}
        onChangeUrl={setSearchUrl} />
      <PlaygroundSplitPane
        split={UISchema.appBar["ui:splitView"]}
        left={
          <>
            <JSONValidationErrorList markers={markers} />
            <OpenRPCEditor
              editorDidMount={handleEditorDidMount}
              onChange={(val) => {
                setParsedSchema(val);
              }}
              value={defaultValue || ""}
            />
          </>
        }
        right={
          <Documentation
            schema={parsedSchema as any}
            uiSchema={UISchema}
            reactJsonOptions={reactJsonOptions}
            methodPlugins={
              UISchema.methods["ui:methodPlugins"]
                ? [InspectorPlugin]
                : undefined
            }
          />
        }
      />
      <SnackBar
        close={() => setNotification({} as ISnackBarNotification)}
        notification={notification as ISnackBarNotification} />
    </MuiThemeProvider>
  );
};
export default App;
