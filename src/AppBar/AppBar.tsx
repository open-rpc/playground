import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  Paper,
  Theme,
  WithStyles,
  withStyles,
  Hidden,
  Tooltip,
} from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import EditIcon from "@material-ui/icons/Edit";
import { IUISchema } from "../UISchema";
import SearchBar from "../SearchBar/SearchBar";
import ExampleDocumentsDropdown, { IExample } from "../ExampleDocumentsDropdown/ExampleDocumentsDropdown";

const styles = (theme: Theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
  appBar: {
  },
});

interface IProps extends WithStyles<typeof styles> {
  uiSchema?: IUISchema;
  examples?: IExample[];
  searchBarUrl?: string | undefined;
  onChangeUrl?: any;
  onDarkModeChange?: any;
  onSplitViewChange?: (split: boolean) => any;
  onExampleDocumentsDropdownChange?: (example: IExample) => any;
}

class ApplicationBar extends Component<IProps> {
  public render() {
    const {
      uiSchema,
      classes,
      onSplitViewChange,
      onDarkModeChange,
      examples,
      onExampleDocumentsDropdownChange,
    } = this.props;
    return (
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Grid alignItems="center" container>
            <Grid item xs={6} sm={6} md={3} direction="row" container>
              {this.props.uiSchema && this.props.uiSchema.appBar && this.props.uiSchema.appBar["ui:logoUrl"] &&
                <Grid>
                  <img
                    alt="playground-title"
                    height="30"
                    src={this.props.uiSchema.appBar["ui:logoUrl"]} />
                </Grid>
              }
              <Grid style={{ overflow: "hidden" }}>
                <Typography className={classes.title} variant="h6">
                  {uiSchema && uiSchema.appBar["ui:title"]}
                </Typography>
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item container justify="center" alignItems="center" sm={6} >
                <Grid item sm={9}>
                  {this.props.uiSchema && this.props.uiSchema.appBar && this.props.uiSchema.appBar["ui:input"] &&
                    <Paper style={{
                      background: "rgba(0, 0, 0, 0.1)",
                      padding: "0px 10px 0px 10px",
                      width: "100%",
                    }} elevation={0}>
                      <SearchBar
                        searchBarUrl={this.props.searchBarUrl}
                        onChangeUrl={this.props.onChangeUrl}
                        uiSchema={uiSchema}
                      />
                    </Paper>
                  }
                </Grid>
                {this.props.uiSchema && this.props.uiSchema.appBar &&
                 this.props.uiSchema.appBar["ui:examplesDropdown"] &&
                  <ExampleDocumentsDropdown examples={examples} onChange={onExampleDocumentsDropdownChange} />
                }
              </Grid>
            </Hidden>
            <Grid item xs={6} sm={6} md={3} container justify="flex-end" alignItems="center">
              {uiSchema && uiSchema.appBar["ui:splitView"] ?
                <Tooltip title={"Full Screen"}>
                  <IconButton onClick={() => {
                    if (onSplitViewChange) {
                      onSplitViewChange(false);
                    }
                  }}>
                    <FullscreenIcon />
                  </IconButton>
                </Tooltip>
                :
                <Tooltip title={"Edit"}>
                  <IconButton onClick={() => {
                    if (onSplitViewChange) {
                      onSplitViewChange(true);
                    }
                  }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              }
              <Tooltip title="Toggle Dark Theme">
                <IconButton>
                  {uiSchema && uiSchema.appBar["ui:darkMode"] ?
                    <Brightness3Icon onClick={() => onDarkModeChange(false)} />
                    :
                    <WbSunnyIcon onClick={() => onDarkModeChange(true)} />
                  }
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar >
    );
  }
}
export default withStyles(styles)(ApplicationBar);
