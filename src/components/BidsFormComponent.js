import React, { Component } from "react";

import PropTypes from 'prop-types';
import TextField from "material-ui/TextField";
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';

const styles = theme => {
    return ({
        root: {
            textAlign: 'center',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        button: {
            margin: theme.spacing.unit,
        },
        textInput: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 75,
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },
        menu: {
            width: 75
        }
    })
};

const generate = (bidsList, classes, handleBidsFormChange) => {
    return bidsList.map((bid, key) =>
        <div key={key}>
            <TextField
                margin="normal"
                id="amount"
                label="Amount"
                type="number"
                name="amount"
                value={bid.amount}
                onChange={handleBidsFormChange.bind(null, key)}
                className={classes.textInput}
            />
            <TextField
                margin="normal"
                id="created"
                label="Created"
                type="text"
                name="created"
                value={bid.created}
                onChange={handleBidsFormChange.bind(null, key)}
                className={classes.textInput}
            />
            <TextField
                margin="normal"
                id="car-title"
                label="Car Title"
                type="text"
                value={bid.carTitle}
                name="carTitle"
                onChange={handleBidsFormChange.bind(null, key)}
                className={classes.textInput}
            />
            <TextField
                margin="normal"
                id="id"
                label="Id"
                type="text"
                value={bid.id}
                name="id"
                onChange={handleBidsFormChange.bind(null, key)}
                className={classes.textInput}
            />
        </div>
    );
}

class BidsFormComponent extends Component {
    state = {
        noOfBids: this.props.bids ? this.props.bids.length : 0
    }
    handleBidsChange = (evt) => {
        const { value } = evt.target;
        if (value !== this.state.noOfBids) {

            this.setState(prevState => {
                this.props.handleBidsChange({
                    noOfBids: value
                });
                return {
                    noOfBids: value,
                }
            })
        }
    }
    handleBidsFormChange = (nthBid, evt) => {
        const { name, value } = evt.target;

        this.props.handleBidsChange({
            noOfBids: this.state.noOfBids,
            propName: name,
            propValue: value,
            changedPropKey: nthBid
        });
    }
    render() {
        const { classes, displayBids } = this.props;
        return (
            <div>
                <TextField
                    id="select-currency"
                    select
                    label="Select"
                    className={classes.textField}
                    onChange={this.handleBidsChange}
                    value={this.state.noOfBids}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select number of bids"
                    margin="dense"
                >
                    {[0, 1, 2, 3, 4, 5].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                {generate(displayBids, classes, this.handleBidsFormChange)}
            </div >
        );
    }
}

export default withStyles(styles)(BidsFormComponent);
