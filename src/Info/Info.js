import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';


const styles = theme => ({
  description: {
    padding: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`
  },
  chip: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Info extends Component {
  render() {
    const { schema, classes } = this.props;
    if (!schema || !schema.info) { return null; }
    const info = schema.info;
    return (
      <>
        {info.title && <Typography variant="h2" gutterBottom>{info.title}</Typography>}
        {info.version && <Chip label={info.version}/>}
        {info.license && info.license.name && info.license.url && <Chip className={classes.chip} component="a" clickable color="primary" href={info.license.url} label={info.license.name} />}
        {info.description && <ReactMarkdown source={info.description}/>}
        {info.termsOfService && <Button className={classes.button} variant="contained" href={info.termsOfService}>Terms Of Service</Button>}
        {info.contact && info.contact.url && info.contact.name && <Button className={classes.button} variant="contained" href={info.contact.url}>Contact {info.contact.name}</Button>}
        {info.contact && info.contact.email && <Button className={classes.button} variant="contained" href={`mailto:${info.contact.email}`}>Email {info.contact.name}</Button>}
      </>
    );
  }
}

export default withStyles(styles)(Info);