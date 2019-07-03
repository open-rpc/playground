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

const JSONValidationErrorList: React.FC<IProps> = (props) => {
  const { classes, markers } = props;
  if (!markers || markers.length === 0) { return null; }
  return (
    <div className={classes.wrapper}>
      <ul className={classes.list}>
        {markers && markers.map((marker) => {
          return (
            <li key={marker.message}>
              {marker.startLineNumber}:{marker.startColumn} - {marker.message}
            </li>
          );
        })}
      </ul>
    </div>
  );

};

export default withStyles(styles)(JSONValidationErrorList);
