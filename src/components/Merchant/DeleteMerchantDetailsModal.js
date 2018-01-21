import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';

const Constants = {
    DELETE_MERCHANT_DETAILS: "Delete Merchant Details",
    DELETE_CONFIRMATION: 'Are you sure you want to delete this merchant?',
    OK: 'Ok',
    CANCEL: 'Cancel'
}

/**
 * @description: DeleteMerchantDetails Modal Component.
 *  
 */
const DeleteMerchantDetailsModal = ({ state, handleDeleteModalData, handleCloseModal }) => {
    const { openDeleteModal } = state;

    return (
        <Dialog open={openDeleteModal} onClose={handleCloseModal}>
            <DialogTitle>{Constants.DELETE_MERCHANT_DETAILS}</DialogTitle>
            <DialogContent>
                <DialogContentText>{Constants.DELETE_CONFIRMATION}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleDeleteModalData}>
                    {Constants.OK}
                </Button>
                <Button color="default" onClick={handleCloseModal}>
                    {Constants.CANCEL}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteMerchantDetailsModal.propTypes = {
    state: PropTypes.object,
    handleDeleteModalData: PropTypes.func,
    handleCloseModal: PropTypes.func
}

export default DeleteMerchantDetailsModal;
