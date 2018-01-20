import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

const DeleteMerchantDetailsModal = ({ state, handleDeleteModalData, handleCloseModal }) => {
    const { openDeleteModal } = state;

    return (
        <Dialog open={openDeleteModal} onClose={handleCloseModal}>
            <DialogTitle>Delete Merchant Details</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this merchant ?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleDeleteModalData}>
                    OK
                </Button>
                <Button color="default" onClick={handleCloseModal}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteMerchantDetailsModal;