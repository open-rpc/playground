import React from "react";
import Inspector from "@open-rpc/inspector";
import { Grid } from "@material-ui/core";
import { IMethodPluginProps } from "@open-rpc/docs-react/build/Methods/Methods";
import searchBarStore from "../stores/searchBarStore";
import { ExamplePairingObject, ExampleObject } from "@open-rpc/meta-schema";

const InspectorPlugin: React.FC<IMethodPluginProps> = (props) => {
  const [searchUrl] = searchBarStore();
  const method = props.openrpcMethodObject;
  const examplePosition = 0;
  let example;
  let exampleParams;
  if (method && method.examples && method.examples[examplePosition]) {
    example = method.examples[examplePosition] as ExamplePairingObject;
    exampleParams = (example.params as ExampleObject[]).map((p) => p.value);
  }
  return (
    <Grid style={{ height: "300px", width: "100%", overflowY: "auto" }}>
      <Inspector
        request={{ method: method.name, params: exampleParams || [] }}
        url={searchUrl && searchUrl.includes(".json") ? null : searchUrl}
        openrpcMethodObject={method}
        hideToggleTheme={true}
      />
    </Grid>
  );
};

export default InspectorPlugin;
