import React, { useState, useRef, useEffect } from "react";
import JSONValidationErrorList from "./JSONValidationErrorList";
import * as monaco from "monaco-editor";
import _ from "lodash";
import Documentation from "@open-rpc/docs-react";
import useInterval from "@use-it/interval";
import "./App.css";
import AppBar from "./AppBar/AppBar";
import { OpenRPC } from "@open-rpc/meta-schema";
import { IUISchema } from "./UISchema";
import { SnackBar, ISnackBarNotification, NotificationType } from "./SnackBar/SnackBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "./themes/openrpcTheme";
import { CssBaseline } from "@material-ui/core";
import PlaygroundSplitPane from "./PlaygroundSplitPane";
import useMonaco from "./hooks/useMonaco";
import useMonacoModel from "./hooks/useMonacoModel";
import useParsedSchema from "./hooks/useParsedSchema";
import useUISchema from "./hooks/useUISchema";
import useDefaultEditorValue from "./hooks/useDefaultEditorValue";
import useSearchBar from "./hooks/useSearchBar";
import useMonacoVimMode from "./hooks/useMonacoVimMode";
import useMonacoReplaceMetaSchema from "./hooks/useMonacoReplaceMetaSchema";
import useQueryParams from "./hooks/useQueryParams";

const App: React.FC = () => {
  const [query] = useQueryParams();
  const [defaultValue, setDefaultValue] = useDefaultEditorValue();
  const [markers, setMarkers] = useState<monaco.editor.IMarker[]>([] as monaco.editor.IMarker[]);
  const [searchUrl, { results, error }, setSearchUrl] = useSearchBar(query.schemaUrl);
  const [notification, setNotification] = useState<ISnackBarNotification | undefined>();

  useInterval(() => {
    setMarkers(monaco.editor.getModelMarkers({}));
  }, 5000);

  useEffect(() => {
    if (results) {
      editor.setValue(results);
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
  const [reactJsonOptions, setReactJsonOptions] = useState({
    theme: "summerfruit:inverted",
    collapseStringsAfterLength: 25,
    displayDataTypes: false,
    displayObjectSize: false,
    indentWidth: 2,
    name: false,
  });
  const [UISchema, setUISchemaBySection] = useUISchema({
    appBar: {
      "ui:input": true,
      "ui:inputPlaceholder": "Enter OpenRPC Document Url or rpc.discover Endpoint",
      /* tslint:disable */
      "ui:logoUrl": "https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png",
      /* tslint:enable */
      "ui:splitView": true,
      "ui:darkMode": false,
      "ui:title": "OpenRPC Playground",
    },
    methods: {
      "ui:defaultExpanded": false,
    },
    params: {
      "ui:defaultExpanded": false,
    },
  });
  const monacoEl = useRef(null);
  const handleMonacoEditorOnChange = (event: monaco.editor.IModelContentChangedEvent, value: string) => {
    setParsedSchema(value);
    const changes = event.changes[0].range;
    setPosition([changes.startLineNumber, changes.startColumn, changes.endLineNumber, changes.endColumn]);
  };
  const [editor, updateDimensions] = useMonaco(
    monacoEl,
    undefined,
    _.debounce(handleMonacoEditorOnChange, 500),
    [UISchema],
  );
  const [metaSchema] = useMonacoReplaceMetaSchema(editor);
  const [model, setPosition] = useMonacoModel(
    parsedSchema ? JSON.stringify(parsedSchema, null, 2) : defaultValue,
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
        onChangeUrl={_.debounce(setSearchUrl, 500)} />
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
            schema={parsedSchema as OpenRPC}
            uiSchema={UISchema}
            reactJsonOptions={reactJsonOptions}
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
