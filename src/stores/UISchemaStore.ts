import { createStore } from "reusable";
import useUISchema from "../hooks/useUISchema";
import queryParamsStore from "./queryParamsStore";
import { mergeUISchema } from "../UISchema";

export default createStore(() => {
  const [query] = queryParamsStore();

  const defaultUISchema = {
    appBar: {
      "ui:input": true,
      "ui:inputPlaceholder": "Enter OpenRPC Document Url or rpc.discover Endpoint",
      /* tslint:disable */
      "ui:logoUrl": "https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png",
      /* tslint:enable */
      "ui:splitView": true,
      "ui:darkMode": false,
      "ui:title": "Playground",
      "ui:examplesDropdown": true,
    },
    methods: {
      "ui:defaultExpanded": false,
      "ui:methodPlugins": true,
    },
    params: {
      "ui:defaultExpanded": false,
    },
  };
  return useUISchema(mergeUISchema(defaultUISchema, query.uiSchema));
});
