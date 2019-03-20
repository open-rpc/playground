import React from "react";
import Info from "./Info/Info";
import Servers from "./Servers/Servers";
import Methods from "./Methods/Methods";
import ContentDescriptors from "./ContentDescriptors/ContentDescriptors";
import { types } from "@open-rpc/meta-schema";

interface IProps {
  schema?: types.OpenRPC;
  uiSchema?: any;
  reactJsonOptions?: object;
}

export default class Documentation extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { schema, uiSchema, reactJsonOptions } = this.props;
    if (!schema) {
      return null;
    }
    return (
      <>
          <Info schema={schema} />
          <Servers schema={schema} />
          <Methods schema={schema} uiSchema={uiSchema} reactJsonOptions={reactJsonOptions}/>
          <ContentDescriptors schema={schema} uiSchema={uiSchema}></ContentDescriptors>
      </>
    );
  }
}
