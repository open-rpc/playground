import React, { Component } from 'react';
import ExamplePairing from '../ExamplePairing/ExamplePairing';
import { Typography, List, ListItem, ListItemText, Grid, MenuItem, Menu, withStyles } from '@material-ui/core';

const styles = theme => ({
  header: {
   
  }
});

class ExamplePairings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0
    }
  }
  componentWillMount() {
    if (!this.props || !this.props.examples) {
      return;
    }
    this.setState({
      currentExample: this.props.examples[0]
    })
  }
  handleClickListItem = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }
  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { examples, classes, method } = this.props;
    const { anchorEl } = this.state;
    if (!examples || examples.length === 0) {
      return null;
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.header} variant="h5">Examples</Typography>
        </Grid>
        <Grid item xs={12}>
          <List component="nav">
            <ListItem button aria-haspopup="true" aria-controls="menu-menu" aria-label="Method Examples" onClick={this.handleClickListItem}>
              <ListItemText primary={examples[this.state.selectedIndex].name} secondary={examples[this.state.selectedIndex].summary} />
            </ListItem>
            <Menu
              id="menu-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {examples.map((example, index) => (
                <MenuItem
                  key={example.name}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleMenuItemClick(event, index)}
                >
                  {example.name}
                </MenuItem>
              ))}
        </Menu>
          </List>
        </Grid>
        <Grid item xs={12}>
          <ExamplePairing method={method} example={this.props.examples[this.state.selectedIndex]} reactJsonOptions={this.props.reactJsonOptions}/>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ExamplePairings);