import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from "material-ui/TextField";
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Input, { InputLabel } from 'material-ui/Input';

import BidsFormComponent from "./../Bid/BidsFormComponent";

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
            width: 150,
        },
        checkBox: {
            margin: 4,
            paddingLeft: 0,
        }
    })
};

const EditMerchantDetailsModal = ({ props, state, handleEditFormSubmit, handleEditFormChange, handleCloseModal, handleBidsChange, classes }) => {
    const { merchantFormData } = props;
    const { firstName, lastName, email, phone, id, hasPremium, avatarUrl, bids } = merchantFormData;
    const { openEditModal, actionType, error } = state;

    return (
        <Dialog open={openEditModal} onClose={handleCloseModal}>
            <form className={classes.container} onSubmit={handleEditFormSubmit.bind(null, actionType)} noValidate autoComplete="off">
                <DialogTitle>Edit Merchant Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit Merchant Details such as Email, First Name, Last Name and Phone Number</DialogContentText>
                    <TextField
                        margin="normal"
                        id="fist-name"
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleEditFormChange}
                        className={classes.textInput}
                    />
                    <TextField
                        margin="normal"
                        id="last-name"
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleEditFormChange}
                        className={classes.textInput}
                    />
                    <TextField
                        margin="normal"
                        id="email"
                        label="Email Address"
                        type="email"
                        value={email}
                        name="email"
                        onChange={handleEditFormChange}
                        className={classes.textInput}
                    />
                    <TextField
                        margin="normal"
                        id="phone-number"
                        label="Phone Number"
                        type="text"
                        value={phone}
                        name="phone"
                        onChange={handleEditFormChange}
                        className={classes.textInput}
                    />
                    <TextField
                        margin="normal"
                        id="avatar-url"
                        label="Avatar Url"
                        type="text"
                        value={avatarUrl}
                        name="avatarUrl"
                        onChange={handleEditFormChange}
                        className={classes.textInput}
                    />
                    <FormControl className={classes.textInput} error={error.editForm.Id} aria-describedby="name-error-text">
                        <InputLabel htmlFor="name-error">Id</InputLabel>
                        <Input id="name-error" type="text" name="id" value={id} onChange={handleEditFormChange} />
                        {error.editForm.Id && <FormHelperText id="name-error-text">{error.editForm.IdMessage}</FormHelperText>}
                    </FormControl>
                    <FormControlLabel
                        className={classes.checkBox}
                        control={
                            <Checkbox
                                checked={hasPremium}
                                onChange={handleEditFormChange}
                                name="hasPremium"
                                value="hasPremium"
                            />
                        }
                        label="Has Premium ?"
                    />
                    <BidsFormComponent handleBidsChange={handleBidsChange} actionType={actionType} bids={bids} />
                </DialogContent>
                <DialogActions>
                    <label htmlFor="raised-button-file">
                        <Button raised type="submit" className={classes.button}>
                            Save
                        </Button>
                    </label>
                    <label htmlFor="raised-button-file">
                        <Button raised onClick={handleCloseModal} className={classes.button}>
                            Cancel
                        </Button>
                    </label>
                </DialogActions>
            </form>
        </Dialog>
    );
}

EditMerchantDetailsModal.propTypes = {
    classes: PropTypes.object.isRequired,
    props: PropTypes.object,
    state: PropTypes.object,
    handleEditFormChange: PropTypes.func,
    handleEditFormSubmit: PropTypes.func,
    handleBidsChange: PropTypes.func,
    handleCloseModal: PropTypes.func,
    merchantFormData: PropTypes.object
};

export default withStyles(styles)(EditMerchantDetailsModal);
