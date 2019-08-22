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
import useMonaco from "./hooks/useMonaco";
import useMonacoModel from "./hooks/useMonacoModel";
import useParsedSchema from "./hooks/useParsedSchema";
import useDefaultEditorValue from "./hooks/useDefaultEditorValue";
import useMonacoVimMode from "./hooks/useMonacoVimMode";
import useMonacoReplaceMetaSchema from "./hooks/useMonacoReplaceMetaSchema";
import InspectorPlugin from "./plugins/InspectorPlugin";
import UISchemaStore from "./stores/UISchemaStore";
import searchBarStore from "./stores/searchBarStore";

const App: React.FC = () => {
  const [defaultValue, setDefaultValue] = useDefaultEditorValue();
  const [markers, setMarkers] = useState<monaco.editor.IMarker[]>([] as monaco.editor.IMarker[]);
  const [searchUrl, { results, error }, setSearchUrl] = searchBarStore();
  const [notification, setNotification] = useState<ISnackBarNotification | undefined>();
  const [UISchema, setUISchemaBySection]: [IUISchema, any] = UISchemaStore();
  const [monacoTheme, setMonacoTheme] = useState();

  useEffect(() => {
    if (editor) {
      monaco.editor.setTheme(UISchema.appBar["ui:darkMode"] ? "vs-dark" : "vs");
    }
    setReactJsonOptions({
      ...reactJsonOptions,
      theme: UISchema.appBar["ui:darkMode"] ? "summerfruit" : "summerfruit:inverted",
    });
  }, [UISchema.appBar["ui:darkMode"]]);

  useInterval(() => {
    setMarkers(monaco.editor.getModelMarkers({}));
  }, 5000);

  useEffect(() => {
    if (results && editor) {
      editor.setValue(results);
    }
    if (results) {
      validateAndSetSchema(results);
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

  const [parsedSchema, schema, validateAndSetSchema] = useParsedSchema(null);
  useEffect(() => {
    validateAndSetSchema(defaultValue);
  }, [defaultValue]);
  const [reactJsonOptions, setReactJsonOptions] = useState({
    theme: "summerfruit:inverted",
    collapseStringsAfterLength: 25,
    displayDataTypes: false,
    displayObjectSize: false,
    indentWidth: 2,
    name: false,
  });
  const monacoEl = useRef(null);
  const handleMonacoEditorOnChange = (event: monaco.editor.IModelContentChangedEvent, value: string) => {
    validateAndSetSchema(value);
    const changes = event.changes[0].range;
    setPosition([changes.startLineNumber, changes.startColumn, changes.startLineNumber, changes.startColumn]);
  };
  const [editor, updateDimensions] = useMonaco(
    monacoEl,
    UISchema.appBar["ui:darkMode"],
    _.debounce(handleMonacoEditorOnChange, 500),
    [UISchema],
  );
  const [metaSchema] = useMonacoReplaceMetaSchema(editor);
  const [model, setPosition] = useMonacoModel(
    parsedSchema ? JSON.stringify(schema, null, 2) : defaultValue,
    editor,
    metaSchema,
  );
  const [vimMode] = useMonacoVimMode(editor);

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
          setUISchemaBySection({
            value,
            key: "ui:darkMode",
            section: "appBar",
          });
        }}
        onChangeUrl={setSearchUrl} />
      <PlaygroundSplitPane
        split={UISchema.appBar["ui:splitView"]}
        onChange={updateDimensions as any}
        left={
          <>
            <JSONValidationErrorList markers={markers} />
            <div key={"editor"} style={{ height: "100%" }} ref={monacoEl} />
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
