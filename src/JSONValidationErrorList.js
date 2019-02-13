import React from 'react';
import { render } from 'react-dom';

export default class JSONValidationErrorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <ul>
      Error List
      {this.props.markers && this.props.markers.map((marker) => {
        return (
          <li key={marker.message}>{marker.message} @ {marker.starLineNumber}:{marker.startColumn}</li>
        )
      })}
     </ul>
    );
  }
}