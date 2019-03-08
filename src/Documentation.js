import React from 'react';
import Info from './Info/Info';
import Servers from './Servers/Servers';
import Methods from './Methods/Methods';
import ContentDescriptors from './ContentDescriptors/ContentDescriptors';

export default class Documentation extends React.Component {
  render() {
    return (
      <>
          <Info schema={this.props.schema} uiSchema={this.props.uiSchema}/>
          <Servers schema={this.props.schema} uiSchema={this.props.uiSchema}/>
          <Methods schema={this.props.schema} uiSchema={this.props.uiSchema} reactJsonOptions={this.props.reactJsonOptions}/>
          <ContentDescriptors schema={this.props.schema} uiSchema={this.props.uiSchema}></ContentDescriptors>
      </>
    )
  }
}