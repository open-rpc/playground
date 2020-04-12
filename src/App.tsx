import React, { useState, useEffect, Dispatch } from "react";
import JSONValidationErrorList from "./JSONValidationErrorList";
import * as monaco from "monaco-editor";
import { Documentation } from "@open-rpc/docs-react";
import "./App.css";
import AppBar from "./AppBar/AppBar";
import { IUISchema } from "./UISchema";
import { SnackBar, ISnackBarNotification, NotificationType } from "./SnackBar/SnackBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "./themes/openrpcTheme";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { CssBaseline, Container, Tab, Typography, IconButton, Tooltip, Tabs } from "@material-ui/core";
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
import { IExample } from "./ExampleDocumentsDropdown/ExampleDocumentsDropdown";
import Inspector from "@open-rpc/inspector";
import useInspectorActionStore from "./stores/inspectorActionStore";

const App: React.FC = () => {
  const [defaultValue] = useDefaultEditorValue();
  const [markers, setMarkers] = useState<monaco.editor.IMarker[]>([] as monaco.editor.IMarker[]);
  const [searchUrl, { results, error }, setSearchUrl] = searchBarStore();
  const [notification, setNotification] = useState<ISnackBarNotification | undefined>();
  const [UISchema, setUISchemaBySection]: [IUISchema, any] = UISchemaStore();
  const [editor, setEditor]: [any, Dispatch<{}>] = useState();
  const [horizontalSplit, privateSetHorizontalSplit] = useState(false);
  const [parsedSchema, setParsedSchema] = useParsedSchema(
    defaultValue ? JSON.parse(defaultValue) : null,
  );
  const setHorizontalSplit = (val: boolean) => {
    if (editor) {
      setTimeout(() => {
        editor.layout();
      }, 0);
    }
    privateSetHorizontalSplit(val);
  };
  const [inspectorContents] = useInspectorActionStore();
  useMonacoReplaceMetaSchema(editor);
  useMonacoVimMode(editor);

  const handleEditorDidMount = (__: any, ed: any) => {
    setEditor(ed);
  };

  useEffect(() => {
    monaco.editor.setTheme(UISchema.appBar["ui:darkMode"] ? "vs-dark" : "vs");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const defaultExample = examples.find((e) => e.name === "petstore");
    if (!defaultValue && !searchUrl && defaultExample) {
      setSearchUrl(defaultExample.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    setReactJsonOptions({
      ...reactJsonOptions,
      theme: UISchema.appBar["ui:darkMode"] ? "summerfruit" : "summerfruit:inverted",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UISchema.appBar["ui:darkMode"]]);

  useEffect(() => {
    if (results && editor) {
      editor.setValue(results);
    }
    if (results) {
      setParsedSchema(results!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  useEffect(() => {
    if (error) {
      setNotification({
        type: NotificationType.error,
        message: error,
      });
    }
  }, [error]);

  useEffect(() => {
    setParsedSchema(defaultValue || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  const [reactJsonOptions, setReactJsonOptions] = useState({
    theme: "summerfruit:inverted",
    collapseStringsAfterLength: 25,
    displayDataTypes: false,
    displayObjectSize: false,
    indentWidth: 2,
    name: false,
  });
  const currentTheme = UISchema.appBar["ui:darkMode"] ? darkTheme : lightTheme;
  useEffect(() => {
    if (inspectorContents) {
      setHorizontalSplit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspectorContents]);
  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      <AppBar
        searchBarUrl={searchUrl}
        uiSchema={UISchema}
        examples={examples as IExample[]}
        onExampleDocumentsDropdownChange={(example: IExample) => setSearchUrl(example.url)}
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
        onChangeUrl={setSearchUrl}
      />
      <PlaygroundSplitPane
        direction="horizontal"
        splitLeft={true}
        split={horizontalSplit}
        leftStyle={{
          width: "100%",
          height: "100%",
        }}
        right={
          <>
            <Inspector hideToggleTheme={true} url={
              searchUrl && searchUrl.includes(".json") ? null : searchUrl
            }
              request={inspectorContents && inspectorContents.request}
              openrpcDocument={parsedSchema}
            />
          </>
        }
        onChange={() => editor && editor.layout()}
        left={
          <PlaygroundSplitPane
            onlyRenderSplit={true}
            split={UISchema.appBar["ui:splitView"]}
            leftStyle={{
              paddingTop: "58px",
              height: "94%",
              width: "100%",
            }}
            rightStyle={{
              height: "94%",
              width: "100%",
              overflowY: "auto",
              marginTop: "58px",
              paddingBottom: "58px",
            }}
            onChange={() => editor && editor.layout()}
            left={
              <>
                <JSONValidationErrorList markers={markers} />
                <OpenRPCEditor
                  editorDidMount={handleEditorDidMount}
                  onMarkerChange={(mks) => {
                    setMarkers(mks);
                  }}
                  onChange={(val) => {
                    setParsedSchema(val);
                  }}
                  value={defaultValue || ""}
                />
              </>
            }
            right={
              <>
                <Container>
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
                </Container>
                <Tabs
                  variant="scrollable"
                  indicatorColor="primary"
                  value={0}
                  style={{ position: "absolute", bottom: "0", right: "25px", zIndex: 1, marginBottom: "0px" }}
                >
                  <Tab
                    onClick={() => setHorizontalSplit(!horizontalSplit)}
                    style={{
                      background: currentTheme.palette.background.default,
                      width: "165px",
                      paddingRight: "30px",
                      border: `1px solid ${currentTheme.palette.text.hint}`,
                    }}
                    label={
                      <div>
                        <Typography
                          variant="body1"><span role="img" aria-label="inspector">🕵️‍♂️</span>️ Inspector</Typography>
                        <Tooltip title="Toggle Inspector">
                          <IconButton style={{ position: "absolute", right: "5px", top: "20%" }} size="small">
                            {horizontalSplit
                              ? <ExpandMore />
                              : <ExpandLess />
                            }
                          </IconButton>
                        </Tooltip>
                      </div>
                    }>
                  </Tab>
                </Tabs>
              </>
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
