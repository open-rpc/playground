import React, { Component, ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  InputBase,
  Theme,
  WithStyles,
  withStyles,
  Hidden,
} from "@material-ui/core";
import { IUISchema } from "../UISchema";

const styles = (theme: Theme) => ({
  title: {
    marginLeft: theme.spacing.unit,
  },
});

interface IProps extends WithStyles<typeof styles> {
  uiSchema?: IUISchema;
  onChangeUrl?: any;
  onSplitViewChange?: any;
}

class ApplicationBar extends Component<IProps> {
  public render() {
    const { uiSchema, classes } = this.props;
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid justify="space-evenly" alignItems="center" container spacing={24}>
            <Grid item xs={6} sm={3} direction="row" justify="flex-start" container>
              {this.props.uiSchema && this.props.uiSchema.appBar && this.props.uiSchema.appBar["ui:logoUrl"] &&
                <Grid>
                  <img
                    alt="playground-title"
                    height="30"
                    src={this.props.uiSchema.appBar["ui:logoUrl"]} />
                </Grid>
              }
              <Grid>
                <Typography className={classes.title} variant="h6">
                  {uiSchema && uiSchema.appBar["ui:title"]}
                </Typography>
              </Grid>
            </Grid>
            <Hidden only="xs">
              <Grid item sm={7}>
                <Paper style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  padding: "0px 10px 0px 10px",
                  width: "100%",
                }} elevation={0}>
                  <InputBase
                    style={{ width: "100%" }}
                    onChange={this.props.onChangeUrl}
                    placeholder={this.props.uiSchema && this.props.uiSchema.appBar["ui:inputPlaceholder"]}
                  />
                </Paper>
              </Grid>
            </Hidden>
            <Grid item xs={6} sm={2} alignItems="flex-end" container>
              <FormControlLabel
                style={{ marginLeft: "30px", height: "30px" }}
                control={
                  <Checkbox
                    checked={this.props.uiSchema && !!this.props.uiSchema.appBar["ui:splitView"]}
                    onChange={this.props.onSplitViewChange}
                    value="splitView"
                    color="primary"
                  />
                }
                label="Split View"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withStyles(styles)(ApplicationBar);
