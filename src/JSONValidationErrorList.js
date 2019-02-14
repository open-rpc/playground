import React from 'react';
import { render } from 'react-dom';

export default class JSONValidationErrorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    if (!this.props.markers || this.props.markers.length === 0) return null;
    return (
      <ul id="errorList">
        {this.props.markers && this.props.markers.length > 0 && "Error List"}
        {this.props.markers && this.props.markers.map((marker) => {
           return (
             <li key={marker.message}>{marker.message} @ {marker.starLineNumber}:{marker.startColumn}</li>
           )
        })}
      </ul>
    );
  }
}
