import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import ReactJson from 'react-json-view';

const reactJsonOptions = {
  name: false,
  indentWidth: 2,
  collapseStringsAfterLength: 15,
  displayObjectSize: false,
}

export default class ExamplePairing extends Component {
  render() {
    const { example } = this.props;
    if (!example || !example.result) {
      return null;
    }
    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {example.params && <ReactJson src={{ params: example.params.map(e => e.value) }} {...reactJsonOptions} />} 
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {example.result && <ReactJson src={{ result: example.result.value }} {...reactJsonOptions}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}