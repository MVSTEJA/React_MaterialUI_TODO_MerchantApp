import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
// import green from 'material-ui/colors/green';
import blueGrey from 'material-ui/colors/blueGrey';
import Reboot from 'material-ui/Reboot';

// A theme with custom primary and secondary color.
// It's optional.
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
        // MuiThemeProvider makes the theme available down the React tree
        // thanks to React context.
        return (
            <MuiThemeProvider theme={theme}>
                {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
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
