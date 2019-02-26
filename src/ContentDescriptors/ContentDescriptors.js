import React, { Component } from 'react';
import ContentDescriptor from '../ContentDescriptor/ContentDescriptor';
import { Typography } from '@material-ui/core';

export default class ContentDescriptors extends Component {
  render() {
    const { schema } = this.props;
    if (!schema || !schema.components  || !schema.components.contentDescriptors) { return null; }
    const entries = Object.entries(schema.components.contentDescriptors);
    if (entries.length === 0) { return null; }
    return (
      <>
        <Typography variant="h3" gutterBottom>ContentDescriptors</Typography>
        {entries.map(([key, val]) => {
          return <ContentDescriptor contentDescriptor={val} uiSchema={this.props.uiSchema} hideRequired={true}/>
        })}
      </>
    );
  }
}