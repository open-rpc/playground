import React from 'react';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  list: {
    listStyle: 'none',
    color: theme.palette.secondary.main,
    height: '100%',
    overflow: 'scroll'
  },
  wrapper: {
    maxHeight: '200px'
  }
})

class JSONValidationErrorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { classes } = this.props;
    if (!this.props.markers || this.props.markers.length === 0) return null;
    return (
      <div className={classes.wrapper}>
        <ul className={classes.list}>
          {this.props.markers && this.props.markers.map((marker) => {
            return (
              <li key={marker.message}>
                {marker.startLineNumber}:{marker.startColumn} - {marker.message}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}


export default withStyles(styles)(JSONValidationErrorList);