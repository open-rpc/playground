import React, { Component } from "react";
import ExamplePairing from "../ExamplePairing/ExamplePairing";
import { Typography, List, ListItem, ListItemText, Grid, MenuItem, Menu, withStyles } from "@material-ui/core";
import { types } from "@open-rpc/meta-schema";

interface IProps {
  method?: types.MethodObject;
  examples?: types.ExamplePairingObject[];
  reactJsonOptions?: any;
}

interface IState {
  anchorEl: Element | null;
  selectedIndex: number;
  currentExample?: types.ExamplePairingObject;
}

class ExamplePairings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0,
    };
  }
  public componentWillMount() {
    if (!this.props || !this.props.examples) {
      return;
    }
    this.setState({
      currentExample: this.props.examples[0],
    });
  }
  public handleClickListItem = (event: React.MouseEvent) => {
    this.setState({
      anchorEl: event.currentTarget as Element,
    });
  }
  public handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  }
  public handleClose = () => {
    this.setState({ anchorEl: null });
  }
  public render() {
    const { examples, method } = this.props;
    const { anchorEl } = this.state;
    if (!examples || examples.length === 0) {
      return null;
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Examples</Typography>
        </Grid>
        <Grid item xs={12}>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="menu-menu"
              aria-label="Method Examples"
              onClick={this.handleClickListItem}>
              <ListItemText
                primary={examples[this.state.selectedIndex].name}
                secondary={examples[this.state.selectedIndex].summary} />
            </ListItem>
            <Menu
              id="menu-menu"
              anchorEl={anchorEl as HTMLElement}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {examples.map((example, index) => (
                <MenuItem
                  key={example.name}
                  selected={index === this.state.selectedIndex}
                  onClick={(event) => this.handleMenuItemClick(event, index)}
                >
                  {example.name}
                </MenuItem>
              ))}
        </Menu>
          </List>
        </Grid>
        <Grid item xs={12}>
          {this.props.examples &&
            <ExamplePairing
              method={method}
              examplePosition={this.state.selectedIndex}
              reactJsonOptions={this.props.reactJsonOptions} />}
        </Grid>
      </Grid>
    );
  }
}

export default ExamplePairings;
