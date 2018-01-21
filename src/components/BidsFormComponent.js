import React, { Component } from "react";

import PropTypes from 'prop-types';
import TextField from "material-ui/TextField";
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import AddCircle from 'material-ui-icons/AddCircle';
import {
    DialogContentText,
} from 'material-ui/Dialog';

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

const generate = (bidsList, classes, handleBidsFormChange, handleBidsRowChange, actionType) => {
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
            {(bidsList.length - 1 === key) && <IconButton
                className={classes.button}
                aria-label="Create Bid"
                onClick={handleBidsRowChange.bind(null, bid, 'add')}
            >
                <AddCircle />
            </IconButton>}
            {(bidsList.length - 1 > 0) && <IconButton
                className={classes.button}
                aria-label="Delete Bid"
                onClick={handleBidsRowChange.bind(null, bid, 'delete', key)}
            >
                <DeleteIcon color="error" />
            </IconButton>}
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
    handleBidsRowChange = (bid, actionName, nthBid, evt) => {
        if (actionName === 'delete' && this.state.noOfBids >= 1) {
            this.setState(prevState => {
                this.props.handleBidsChange({
                    noOfBids: this.state.noOfBids - 1,
                    changedPropKey: nthBid
                });
                return {
                    noOfBids: this.state.noOfBids - 1
                }
            });
        } else {
            this.setState(prevState => {
                this.props.handleBidsChange({
                    noOfBids: this.state.noOfBids + 1
                });
                return {
                    noOfBids: this.state.noOfBids + 1
                }
            });
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
        const { classes, bids, actionType } = this.props;
        return (
            <div>
                <br />
                <DialogContentText className={classes.textField}>Enter your bids </DialogContentText>
                {generate(bids, classes, this.handleBidsFormChange, this.handleBidsRowChange, actionType)}
            </div >
        );
    }
}

export default withStyles(styles)(BidsFormComponent);
