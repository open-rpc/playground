import React, { Component } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from "react-markdown";
import Params from "../Params/Params";
import ContentDescriptor from "../ContentDescriptor/ContentDescriptor";
import ExamplePairings from "../ExamplePairings/ExamplePairings";
import Errors from "../Errors/Errors";
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
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },
});

interface IProps extends WithStyles<typeof styles> {
  schema?: types.OpenRPC;
  uiSchema?: any;
  reactJsonOptions?: object;
}

class Methods extends Component<IProps> {
  public render() {
    const { schema, classes, uiSchema } = this.props;
    if (!schema) {
      return null;
    }
    const methods: types.MethodObject[] = schema.methods;
    const methodsExist = methods && methods.length > 0;
    if (!schema || !schema.methods || !methodsExist) { return null; }
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>Methods</Typography>
        {schema.methods.map((method, i) => (
          <ExpansionPanel key={i + method.name} defaultExpanded={uiSchema && uiSchema.methods["ui:defaultExpanded"]}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography key={method.name} className={classes.heading}>{method.name}</Typography>
              <Typography key={method.summary} className={classes.secondaryHeading}>{method.summary}</Typography>
            </ExpansionPanelSummary>
            {method.description &&
              <ExpansionPanelDetails key="description">
                <ReactMarkdown source={method.description} />
              </ExpansionPanelDetails>
            }
            {method.params && method.params.length > 0 &&
              <ExpansionPanelDetails key="result-title">
                <Typography variant="h5">Params</Typography>
              </ExpansionPanelDetails>
            }
            {method.params &&
              <ExpansionPanelDetails key="params">
                <Params params={method.params as types.ContentDescriptorObject[]} uiSchema={uiSchema}/>
              </ExpansionPanelDetails>
            }
            {method.result &&
              <ExpansionPanelDetails key="result-title">
                <Typography variant="h5">Result</Typography>
              </ExpansionPanelDetails>
            }
            {method.result && (method.result as types.ContentDescriptorObject).schema &&
              <ExpansionPanelDetails key="result">
              <ContentDescriptor
                contentDescriptor={method.result as types.ContentDescriptorObject}
                hideRequired={true} uiSchema={uiSchema} />
              </ExpansionPanelDetails>
            }
            {method.errors && method.errors.length > 0 &&
              <ExpansionPanelDetails key="result">
                <Errors errors={method.errors as types.ErrorObject[]} reactJsonOptions={this.props.reactJsonOptions}/>
              </ExpansionPanelDetails>
            }
            {method.examples && method.examples.length > 0 &&
              <ExpansionPanelDetails key="examples">
              <ExamplePairings
                examples={method.examples as types.ExamplePairingObject[]}
                method={method}
                reactJsonOptions={this.props.reactJsonOptions} />
              </ExpansionPanelDetails>
            }
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Methods);
