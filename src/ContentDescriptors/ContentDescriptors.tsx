import React, { Component } from "react";
import ContentDescriptor from "../ContentDescriptor/ContentDescriptor";
import { Typography } from "@material-ui/core";
import { types } from "@open-rpc/meta-schema";
import { ContentDescriptorObject } from "@open-rpc/meta-schema/build/src/types";

interface IProps {
  schema?: types.OpenRPC;
  uiSchema?: any;
}

export default class ContentDescriptors extends Component<IProps> {
  public render() {
    const { schema } = this.props;
    if (!schema || !schema.components  || !schema.components.contentDescriptors) { return null; }
    const entries = Object.entries(schema.components.contentDescriptors);
    if (entries.length === 0) { return null; }
    return (
      <>
        <Typography variant="h3" gutterBottom>ContentDescriptors</Typography>
        {entries.map(([key, val]) => {
          return <ContentDescriptor
            key={key}
            contentDescriptor={val as ContentDescriptorObject}
            uiSchema={this.props.uiSchema}
            hideRequired={true} />;
        })}
      </>
    );
  }
}
