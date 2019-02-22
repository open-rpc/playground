import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  table: {
    padding: theme.spacing.unit
  }
});

class Params extends Component {
  render() {
    const { params, classes } = this.props;
    if (!params || !params.length > 0) {
      return null;
    }
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Parameter Name</TableCell>
            <TableCell align="right">Summary</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Required</TableCell>
            <TableCell align="right">Schema</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {params.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.summary}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.required ? 'true' : 'false'}</TableCell>
              <TableCell align="right">{row.schema && row.schema.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}


export default withStyles(styles)(Params);