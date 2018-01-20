import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from "material-ui/Button";
import { connect } from 'react-redux';

import { deleteMerchant, selectMerchant, editMerchantSubmit, editMerchant, addMerchantSubmit, modifyBids, sortBids } from './../actions/merchantActions';
import EditMerchantDetailsModal from "./EditMerchantDetailsModal";
import DeleteMerchantDetailsModal from "./DeleteMerchantDetailsModal";
import MerchantTableComponent from "./MerchantTableComponent";

import { initialState } from "./../index";
const styles = theme => ({
    root: {
        width: '96%',
        margin: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: '50%',
    },
    button: {
        margin: theme.spacing.unit,
    },
    actionsTitle: {
        textAlign: 'center'
    }
});

class MerchantTable extends React.Component {
    state = {
        openEditModal: false,
        openDeleteModal: false,
        page: 0,
        rowsPerPage: 5,
        error: {
            editForm: {
                Id: false,
                IdMessage: ""
            }
        }
    };

    handleCloseModal = () => {
        this.setState({
            openEditModal: false,
            openDeleteModal: false,
        });
    };

    handleEditFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.editMerchant(name, value);
    }
    handleEditFormSubmit = (actionType, evt) => {
        evt.preventDefault();
        const { merchantFormData, merchants } = this.props;
        if (actionType === "edit") {
            const duplicateMerchant = merchants.filter(merchant => merchant.id !== this.state.merchantRowData.id && merchant.id === merchantFormData.id)

            if (duplicateMerchant.length > 0) {
                this.setState({
                    error: {
                        editForm: {
                            Id: true,
                            IdMessage: "duplicate merchant exists"
                        }
                    }
                })
                return;
            }
            this.props.editMerchantSubmit(this.state.merchantRowData);
        } else {
            const duplicateMerchant = merchants.filter(merchant => merchant.id === merchantFormData.id)

            if (duplicateMerchant.length > 0) {
                this.setState({
                    error: {
                        editForm: {
                            Id: true,
                            IdMessage: "duplicate merchant exists"
                        }
                    }
                })
                return;
            }
            this.props.addMerchantSubmit();
        }

        this.handleCloseModal();

    }
    toggleEditModal = (data, evt) => {
        const actionType = data ? 'edit' : 'create';
        const merchantFormData = data ? data : initialState.merchantFormData;

        this.setState({
            openEditModal: true,
            actionType,
            merchantRowData: merchantFormData
        });
        this.props.selectMerchant(merchantFormData);
        this.handleBidsChange(merchantFormData.bids || []);
    };
    toggleDeleteModal = (data, evt) => {
        this.setState({
            openDeleteModal: true,
        })
        this.props.selectMerchant(data);
    };
    handleDeleteModalData = (evt) => {
        this.props.deleteMerchant();
        this.handleCloseModal();
    };
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleBidsChange = (bids) => {
        this.props.modifyBids(bids);
    }

    render() {
        const { classes, merchants } = this.props;
        const { page, rowsPerPage } = this.state;

        return (
            <Paper className={classes.root}>
                <label htmlFor="raised-button-file">
                    Click here to create Merchant
                    <Button raised className={classes.button} onClick={this.toggleEditModal.bind(null, null)}>
                        Create Merchant
                    </Button>
                </label>
                <EditMerchantDetailsModal
                    props={this.props}
                    state={this.state}
                    handleEditFormSubmit={this.handleEditFormSubmit}
                    handleCloseModal={this.handleCloseModal}
                    handleEditFormChange={this.handleEditFormChange}
                    handleBidsChange={this.handleBidsChange}
                />
                <DeleteMerchantDetailsModal
                    state={this.state}
                    handleDeleteModalData={this.handleDeleteModalData}
                    handleCloseModal={this.handleCloseModal} />
                <MerchantTableComponent
                    classes={classes}
                    merchants={merchants}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    toggleEditModal={this.toggleEditModal}
                    toggleDeleteModal={this.toggleDeleteModal}
                    sortBids={this.props.sortBids}
                />
            </Paper>
        );
    }
}

MerchantTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    merchants: state.merchants,
    merchantFormData: state.merchantFormData,
    displayBids: state.displayBids
});

const mapDispatchToProps = dispatch => ({
    addMerchantSubmit: () => dispatch(addMerchantSubmit()),
    deleteMerchant: () => dispatch(deleteMerchant()),
    editMerchantSubmit: (prevMerchantData) => dispatch(editMerchantSubmit(prevMerchantData)),
    editMerchant: (name, value) => dispatch(editMerchant(name, value)),
    selectMerchant: (name, value) => dispatch(selectMerchant(name, value)),
    modifyBids: bids => dispatch(modifyBids(bids)),
    sortBids: bids => dispatch(sortBids(bids))
});
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MerchantTable));
