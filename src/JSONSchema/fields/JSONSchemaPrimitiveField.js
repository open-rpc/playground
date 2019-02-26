import React, { Component } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableHead, Table, withStyles } from '@material-ui/core';


const styles = theme => ({
  root: {
    background: theme.palette.grey[50],
    width: '330px'
  },
  cell: {
  }
})

class PrimitiveField extends Component {
  render() {
    const { schema, classes } = this.props;
    return (
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.cell} align="left">Type</TableCell>
            <TableCell className={classes.cell} align="right">{schema.type}</TableCell>
          </TableRow>
          {schema.pattern &&
            <>
              <TableRow>
                <TableCell className={classes.cell} align="left">Pattern</TableCell>
                <TableCell className={classes.cell} align="right">{schema.pattern}</TableCell>
              </TableRow>
            </>
          }
          {schema.enum &&
            <>
              <TableRow>
                <TableCell className={classes.cell} align="left">Enum</TableCell>
                <TableCell className={classes.cell} align="right">{schema.enum.join('  ')}</TableCell>
              </TableRow>
            </>
          }
        </TableBody>
      </Table>

    )
  }
}

export default withStyles(styles)(PrimitiveField);