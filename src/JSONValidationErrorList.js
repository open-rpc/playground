import React from 'react';

export default class JSONValidationErrorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    if (!this.props.markers || this.props.markers.length === 0) return null;
    return (
      <ul style={{listStyle: 'none', color: 'red'}}>
        {this.props.markers && this.props.markers.map((marker) => {
           return (
             <li key={marker.message}>
               {marker.startLineNumber}:{marker.startColumn} - {marker.message}
             </li>
           );
        })}
      </ul>
    );
  }
}
