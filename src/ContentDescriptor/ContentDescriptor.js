import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import JSONSchema from '../JSONSchema/JSONSchema';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactMarkdown from 'react-markdown';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    alignSelf: 'end'
  },
});
class ContentDescriptor extends Component {
  render() {
    const { contentDescriptor, classes, hideIcon, hideRequired, uiSchema } = this.props;
    if (!contentDescriptor) { return null; }
    let entries = Object.entries(contentDescriptor);
    if (entries.length === 0) { return null; }
    return (
      <ExpansionPanel style={{ width: '100%' }} defaultExpanded={uiSchema && uiSchema.params['ui:defaultExpanded']} expanded={contentDescriptor.name ? null : true}>
        <ExpansionPanelSummary expandIcon={(!contentDescriptor.name || hideIcon) ? null : <ExpandMoreIcon />} style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
            <Typography className={classes.heading}>{contentDescriptor.name}</Typography>
            <Typography className={classes.secondaryHeading}>{contentDescriptor.summary}</Typography>
            {hideRequired ? null : <Typography className={classes.secondaryHeading}>{contentDescriptor.required ? 'true' : 'false'}</Typography>}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'block' }}>
          <div>
            {contentDescriptor.description && <ReactMarkdown source={contentDescriptor.description} />}
            {contentDescriptor.schema &&
              <>
                <Typography variant="body1" color="primary" className={classes.schema}>schema</Typography>
                <JSONSchema schema={contentDescriptor.schema} />
              </>
            }
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
export default withStyles(styles)(ContentDescriptor)