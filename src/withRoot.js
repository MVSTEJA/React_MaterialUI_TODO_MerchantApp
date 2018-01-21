import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import blueGrey from 'material-ui/colors/blueGrey';
import Reboot from 'material-ui/Reboot';

const theme = createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
        },
        secondary: {
            light: blueGrey[200],
            main: blueGrey[300],
            dark: blueGrey[400],
        }
    },
});

function withRoot(Component) {
    function WithRoot(props) {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Reboot />
                    <Component {...props} />
                </div>
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
