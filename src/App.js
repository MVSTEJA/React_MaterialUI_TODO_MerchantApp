import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from "material-ui/Button";

import './App.css';
import withRoot from './withRoot';
import Header from './components/Header';
import MerchantTable from "./components/MerchantTable";

const styles = theme => {
  return ({
    root: {
      textAlign: 'center',
      width: '100%',
    },
    flex: {
      flex: 1,
      padding: theme.spacing.unit * 2,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  })
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header classes={classes} />
        <MerchantTable />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));
