import React, { Component } from "react";

import PropTypes from 'prop-types';
import TextField from "material-ui/TextField";
import { withStyles } from 'material-ui/styles';
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

const Constants = {
    ENTER_BIDS: 'Enter your bids'
};

/**
 * @description: Component for each bid row.
 */
const RowBid = ({ bidsList, bid, currentRowKey, classes, handleBidsFormChange, handleBidsRowChange }) => (
    <div>
        <TextField
            margin="normal"
            id="amount"
            label="Amount"
            type="number"
            name="amount"
            value={bid.amount || ''}
            onChange={handleBidsFormChange.bind(null, currentRowKey)}
            className={classes.textInput}
        />
        <TextField
            margin="normal"
            id="created"
            label="Created"
            type="text"
            name="created"
            placeholder="mm-dd-yyyy"
            value={bid.created}
            onChange={handleBidsFormChange.bind(null, currentRowKey)}
            className={classes.textInput}
        />
        <TextField
            margin="normal"
            id="car-title"
            label="Car Title"
            type="text"
            value={bid.carTitle}
            name="carTitle"
            onChange={handleBidsFormChange.bind(null, currentRowKey)}
            className={classes.textInput}
        />
        <TextField
            margin="normal"
            id="id"
            label="Id"
            type="text"
            value={bid.id}
            name="id"
            onChange={handleBidsFormChange.bind(null, currentRowKey)}
            className={classes.textInput}
        />
        {(bidsList.length - 1 === currentRowKey) && <IconButton
            className={classes.button}
            aria-label="Create Bid"
            onClick={handleBidsRowChange.bind(null, bid, 'add')}
        >
            <AddCircle />
        </IconButton>}
        {(bidsList.length - 1 > 0) && <IconButton
            className={classes.button}
            aria-label="Delete Bid"
            onClick={handleBidsRowChange.bind(null, bid, 'delete', currentRowKey)}
        >
            <DeleteIcon color="error" />
        </IconButton>}
    </div>
);

const generate = (bidsList, classes, handleBidsFormChange, handleBidsRowChange) => {
    return bidsList.map((bid, key) =>
        <RowBid bidsList={bidsList} bid={bid} key={key} currentRowKey={key} classes={classes} handleBidsFormChange={handleBidsFormChange} handleBidsRowChange={handleBidsRowChange} />
    );
}

/**
 * @description: A Form Component for Editing/Creating Bids.
 */
class BidsFormComponent extends Component {
    state = {
        noOfBids: this.props.bids ? this.props.bids.length : 0
    }
    handleBidsRowChange = (bid, actionName, nthBid) => {
        if (actionName === 'delete' && this.state.noOfBids >= 1) {
            this.setState(() => {
                this.props.handleBidsChange({
                    noOfBids: this.state.noOfBids - 1,
                    changedPropKey: nthBid
                });
                return {
                    noOfBids: this.state.noOfBids - 1
                }
            });
        } else {
            this.setState(() => {
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
                <DialogContentText className={classes.textField}>{Constants.ENTER_BIDS}</DialogContentText>
                {generate(bids, classes, this.handleBidsFormChange, this.handleBidsRowChange, actionType)}
            </div >
        );
    }
}

RowBid.propTypes = {
    bidsList: PropTypes.array,
    bid: PropTypes.shape({
        id: PropTypes.string,
        carTitle: PropTypes.string,
        amount: PropTypes.number,
        created: PropTypes.string
    }),
    classes: PropTypes.object,
    handleBidsFormChange: PropTypes.func,
    handleBidsRowChange: PropTypes.func,
    currentRowKey: PropTypes.number

}

BidsFormComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    bids: PropTypes.array,
    handleBidsChange: PropTypes.func,
    actionType: PropTypes.string
};

export default withStyles(styles)(BidsFormComponent);

