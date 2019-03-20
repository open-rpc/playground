import React from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core";

const styles = (theme: Theme) => ({
  list: {
    color: theme.palette.secondary.main,
    height: "100%",
    listStyle: "none",
    overflow: "scroll",
  },
  wrapper: {
    maxHeight: "200px",
  },
});

interface IProps extends WithStyles<typeof styles> {
  markers: any[];
}

class JSONValidationErrorList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const { classes } = this.props;
    if (!this.props.markers || this.props.markers.length === 0) { return null; }
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
