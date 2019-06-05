import React, { Component, ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  Paper,
  InputBase,
  Theme,
  WithStyles,
  withStyles,
  Hidden,
} from "@material-ui/core";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { IUISchema } from "../UISchema";
import SearchBar from "../SearchBar/SearchBar";

const styles = (theme: Theme) => ({
  title: {
    marginLeft: theme.spacing.unit,
  },
  appBar: {
  },
});

interface IProps extends WithStyles<typeof styles> {
  uiSchema?: IUISchema;
  onChangeUrl?: any;
  onDarkModeChange?: any;
  onSplitViewChange?: any;
}

class ApplicationBar extends Component<IProps> {
  public render() {
    const { uiSchema, classes, onSplitViewChange, onDarkModeChange } = this.props;
    return (
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Grid  alignItems="center" container spacing={24}>
            <Grid item xs={6} sm={3} direction="row" container>
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
                  <SearchBar onChangeUrl={this.props.onChangeUrl} />
                </Paper>
              </Grid>
            </Hidden>
            <Grid item xs={6} sm={2} container justify="flex-end">
              <IconButton>
                {uiSchema && uiSchema.appBar["ui:splitView"] ?
                  <FullscreenIcon onClick={() => onSplitViewChange(false)} />
                  :
                  <VerticalSplitIcon onClick={() => onSplitViewChange(true)} />
                }
              </IconButton>
              <IconButton>
                {uiSchema && uiSchema.appBar["ui:darkMode"] ?
                  <Brightness3Icon onClick={() => onDarkModeChange(false)} />
                  :
                  <WbSunnyIcon onClick={() => onDarkModeChange(true)} />
                }
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withStyles(styles)(ApplicationBar);
