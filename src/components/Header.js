import React from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import logo from './../logo.png';

export default ({ classes }) => (
    <AppBar position="static">
        <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
            </Typography>
            <Button color="contrast">Login</Button>
        </Toolbar>
    </AppBar>
)