import React, { Component } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TableHead, Table, withStyles, Theme, WithStyles } from "@material-ui/core";
import { JSONSchema4 } from "json-schema";

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.grey[50],
    width: "330px",
  },
});

interface IProps extends WithStyles<typeof styles> {
  schema?: JSONSchema4;
}

class PrimitiveField extends Component<IProps> {
  public render() {
    const { schema, classes } = this.props;
    if (!schema) {
      return null;
    }
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
            <TableCell align="left">Type</TableCell>
            <TableCell align="right">{schema.type}</TableCell>
          </TableRow>
          {schema.pattern &&
            <>
              <TableRow>
                <TableCell align="left">Pattern</TableCell>
                <TableCell align="right">{schema.pattern}</TableCell>
              </TableRow>
            </>
          }
          {schema.enum &&
            <>
              <TableRow>
                <TableCell align="left">Enum</TableCell>
                <TableCell align="right">{schema.enum.join("  ")}</TableCell>
              </TableRow>
            </>
          }
        </TableBody>
      </Table>

    );
  }
}

export default withStyles(styles)(PrimitiveField);
