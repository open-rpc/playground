import React from 'react';
import Info from './Info/Info';
import Servers from './Servers/Servers';
import Methods from './Methods/Methods';

export default class Documentation extends React.Component {
  render() {
    return (
      <>
          <Info schema={this.props.schema} />
          <Servers schema={this.props.schema} />
          <Methods schema={this.props.schema} />
      </>
    )
  }
}