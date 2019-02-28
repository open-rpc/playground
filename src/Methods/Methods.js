import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactMarkdown from 'react-markdown';
import Params from '../Params/Params';
import ContentDescriptor from '../ContentDescriptor/ContentDescriptor';

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
  },
  result: {
    marginLeft: theme.spacing.unit * 3,
  }
});

class Methods extends Component {
  render() {
    const { schema, classes, uiSchema } = this.props;
    if (!schema || !schema.methods || !schema.methods.length > 0) { return null; }
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>Methods</Typography>
        {schema.methods.map((method) => (
          <ExpansionPanel key={method.name} defaultExpanded={uiSchema && uiSchema.methods['ui:defaultExpanded']}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{method.name}</Typography>
              <Typography className={classes.secondaryHeading}>{method.summary}</Typography>
            </ExpansionPanelSummary>
            {method.description &&
              <ExpansionPanelDetails>
                <ReactMarkdown source={method.description} />
              </ExpansionPanelDetails>
            }
            {method.params &&
              <ExpansionPanelDetails>
              <Params params={method.params} uiSchema={uiSchema}/>
              </ExpansionPanelDetails>
            }
            {method.result &&
              <ExpansionPanelDetails>
                <Typography className={classes.result} variant="h5">Result</Typography>
              </ExpansionPanelDetails>
            }
            {method.result && method.result.schema && 
              <ExpansionPanelDetails>
              <ContentDescriptor contentDescriptor={method.result} hideRequired={true} uiSchema={uiSchema}/>
              </ExpansionPanelDetails>
            }
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Methods);