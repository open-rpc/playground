import React, { Component } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import _ from "lodash";
import JSONSchema from "../JSONSchema";
import { WithStatement } from "@babel/types";
import { JSONSchema4 } from "json-schema";

const styles = (theme: Theme) => ({
  table: {
    background: theme.palette.grey[50],
  },
});

interface IProps extends WithStyles<typeof styles> {
  schema?: JSONSchema4;
}

class JSONSchemaFields extends Component<IProps> {
  public render() {
    const { schema, classes } = this.props;
    if (!schema) { return null; }
    return (
      <>
        {schema.title && <Typography variant="h5">{schema.title}</Typography>}
        {schema.description && <Typography variant="body1">{schema.description}</Typography>}
        {schema.properties &&
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right" style={{ width: "90px" }}>Pattern</TableCell>
                <TableCell align="right">Required</TableCell>
                <TableCell align="right">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schema.properties && _.map(schema.properties, (prop, name) => {
                if (prop.oneOf) {
                  return (
                    <TableRow>
                      <TableCell colSpan={1}>
                        {name}
                      </TableCell>
                      <TableCell colSpan={1}>
                        <Typography variant="body1" color="primary">one of</Typography>
                      </TableCell>
                      <TableCell colSpan={5}>
                        {prop.oneOf.map((p) => <JSONSchema schema={p} />)}
                      </TableCell>
                    </TableRow>
                  );
                }
                return (
                  <TableRow key={name}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">{prop.type}</TableCell>
                    <TableCell align="right">{prop.pattern}</TableCell>
                    <TableCell align="right">
                      {schema.required && schema.required.includes(name) ? "true" : "false"}
                    </TableCell>
                    <TableCell align="right">{prop.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        }
      </>
    );
  }
}

export default withStyles(styles)(JSONSchemaFields);
