import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import ReactJson from 'react-json-view';
import ReactMarkdown from 'react-markdown';
import _ from 'lodash';

export default class ExamplePairing extends Component {
  render() {
    const { example, method } = this.props;
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
                jsonrpc: "2.0",
                method: method && method.name,
                params: example.params.map(e => e.value),
                id: 1
              }} {...this.props.reactJsonOptions} />} 
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {example.result && <ReactJson src={{
                jsonrpc: "2.0",
                result: example.result.value,
                id: 1
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}