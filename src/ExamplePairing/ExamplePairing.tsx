import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent } from "@material-ui/core";
import ReactJson from "react-json-view";
import ReactMarkdown from "react-markdown";
import { types } from "@open-rpc/meta-schema";
import _ from "lodash";
import { ExamplePairingObject } from "@open-rpc/meta-schema/build/src/types";

interface IProps {
  examplePosition?: number;
  method?: types.MethodObject;
  reactJsonOptions?: object;
}

export default class ExamplePairing extends Component<IProps, {}> {
  public render() {
    const { examplePosition, method } = this.props;
    if (_.isUndefined(examplePosition)) {
      return null;
    }
    let example;
    if (method && method.examples && method.examples[examplePosition]) {
      example = method.examples[examplePosition] as types.ExamplePairingObject;
    }
    if (!example || _.isEmpty(example)) {
      return null;
    }
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ReactMarkdown source={example.description} />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {example.params && <ReactJson src={{
                id: 1,
                jsonrpc: "2.0",
                method: method && method.name,
                params: (example.params as types.ExampleObject[]).map(((p) => p.value)),
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {example.result && <ReactJson src={{
                id: 1,
                jsonrpc: "2.0",
                result: (example.result as types.ExampleObject).value,
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
