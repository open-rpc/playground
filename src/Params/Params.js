import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ContentDescriptor from '../ContentDescriptor/ContentDescriptor';

const styles = theme => ({
  table: {
    padding: theme.spacing.unit
  },
  tableStart: {
    paddingLeft: theme.spacing.unit * 6,
  },
  tableEnd: {
    paddingRight: `${theme.spacing.unit * 10}px !important`,
  },
  schema: {
    marginLeft: theme.spacing.unit * 4
  }
});

class Params extends Component {
  render() {
    const { params, classes, uiSchema } = this.props;
    if (!params || !params.length > 0) {
      return null;
    }
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableStart}>Parameter Name</TableCell>
            <TableCell align="right">Summary</TableCell>
            <TableCell align="right" className={classes.tableEnd}>Required</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan="6">
              {params.map(row => <ContentDescriptor contentDescriptor={row} uiSchema={uiSchema}/>) }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}


export default withStyles(styles)(Params);