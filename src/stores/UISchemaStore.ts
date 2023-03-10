import { createStore } from "reusable";
import useUISchema from "../hooks/useUISchema";
import queryParamsStore from "./queryParamsStore";
import { mergeUISchema } from "../UISchema";

export default createStore(() => {
  const [query] = queryParamsStore();

  const defaultUISchema = {
    appBar: {
      "ui:input": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_INPUT ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_INPUT.toLowerCase() === "true") : 
        true,
      "ui:inputPlaceholder": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_INPUTPLACEHOLDER ? 
        process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_INPUTPLACEHOLDER : 
        "Enter OpenRPC Document Url or rpc.discover Endpoint",
      /* tslint:disable */
      "ui:logoUrl": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_LOGOURL ? 
        process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_LOGOURL : 
        "https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png",
      /* tslint:enable */
      "ui:splitView": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_SPLITVIEW ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_SPLITVIEW.toLowerCase() === "true") : 
        true,
      "ui:darkMode": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_DARKMODE ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_DARKMODE.toLowerCase() === "true") : 
        false,
      "ui:title": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_TITLE ? 
        process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_TITLE : 
        "Playground",
      "ui:examplesDropdown": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_EXAMPLESDROPDOWN ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_EXAMPLESDROPDOWN.toLowerCase() === "true") : 
        true,
      "ui:edit": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_EDIT ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_EDIT.toLowerCase() === "true") : 
        true,
      "ui:transports": process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_TRANSPORTS ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_TRANSPORTS.toLowerCase() === "true") : 
        true,
    },
    methods: {
      "ui:defaultExpanded": process.env.REACT_APP_DEFAULT_UISCHEMA_METHODS_UI_DEFAULTEXPANDED ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_METHODS_UI_DEFAULTEXPANDED.toLowerCase() === "true") : 
        false,
      "ui:methodPlugins": process.env.REACT_APP_DEFAULT_UISCHEMA_METHODS_UI_METHODPLUGINS ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_METHODS_UI_METHODPLUGINS.toLowerCase() === "true") : 
        true,
    },
    params: {
      "ui:defaultExpanded": process.env.REACT_APP_DEFAULT_UISCHEMA_PARAMS_UI_DEFAULTEXPANDED ? 
        (process.env.REACT_APP_DEFAULT_UISCHEMA_PARAMS_UI_DEFAULTEXPANDED.toLowerCase() === "true") : 
        false,
    },
  };
  return useUISchema(mergeUISchema(defaultUISchema, query.uiSchema));
});
