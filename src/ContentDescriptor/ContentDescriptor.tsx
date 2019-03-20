import React, { Component } from "react";
import { Typography, withStyles, Theme, WithStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import JSONSchema from "../JSONSchema/JSONSchema";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from "react-markdown";
import { types } from "@open-rpc/meta-schema";

const styles = (theme: Theme) => ({
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  root: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    width: "100%",
  },
  secondaryHeading: {
    alignSelf: "end",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },
});

interface IProps extends WithStyles<typeof styles> {
  contentDescriptor?: types.ContentDescriptorObject;
  hideIcon?: boolean;
  hideRequired?: boolean;
  uiSchema?: any;
}

class ContentDescriptor extends Component<IProps> {
  public render() {
    const { contentDescriptor, classes, hideIcon, hideRequired, uiSchema } = this.props;
    if (!contentDescriptor) { return null; }
    const entries = Object.entries(contentDescriptor);
    if (entries.length === 0) { return null; }
    return (
      <ExpansionPanel
        style={{ width: "100%" }}
        defaultExpanded={uiSchema && uiSchema.params["ui:defaultExpanded"]}
        expanded={contentDescriptor.name ? undefined : true}>
        <ExpansionPanelSummary
          expandIcon={(!contentDescriptor.name || hideIcon) ? null : <ExpandMoreIcon />}
          style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%" }}>
            <Typography className={classes.heading}>{contentDescriptor.name}</Typography>
            <Typography className={classes.secondaryHeading}>{contentDescriptor.summary}</Typography>
            {hideRequired ? null : <Typography className={classes.secondaryHeading}>
              {contentDescriptor.required ? "true" : "false"}
            </Typography>}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: "block" }}>
          <div>
            {contentDescriptor.description && <ReactMarkdown source={contentDescriptor.description} />}
            {contentDescriptor.schema &&
              <>
                <Typography variant="body1" color="primary">schema</Typography>
                <JSONSchema schema={contentDescriptor.schema} />
              </>
            }
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
export default withStyles(styles)(ContentDescriptor);
