import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Button from "material-ui/Button";
import PersonAdd from 'material-ui-icons/PersonAdd';
import Paper from 'material-ui/Paper';

import BidsDialogComponent from "./../Bid/BidsDialogComponent";

const Constants = {
    MERCHANT_NAME: "Merchant Name",
    ID: 'ID',
    AVATAR: 'Avatar',
    EMAIL: 'Email',
    PHONE: 'Phone',
    HASPREMIUM: 'Has Premium?',
    ACTIONS: 'Actions',
    BIDS: 'Bids',
    CREATE_MERCHANT_INFO: `Click on 'Create' button to add a new merchant to table.`,
    CREATE_MERCHANT: 'Create'
};

export const CreateMerchantInfoSection = ({ classes, toggleEditModal }) => (
    <Paper className={classes.createMerchantSection} >
        <label className={classes.createMerchantSectionLabel} htmlFor="raised-button-file">
            <Typography>
                {Constants.CREATE_MERCHANT_INFO}
            </Typography>
        </label>
        <Button dense raised className={classes.button} onClick={toggleEditModal.bind(null, null)}>
            <Typography>{Constants.CREATE_MERCHANT}</Typography>
            <PersonAdd className={classes.buttonIcon} />
        </Button>
    </Paper >
);

CreateMerchantInfoSection.propTypes = {
    classes: PropTypes.object.isRequired,
    toggleEditModal: PropTypes.func
}
/**
 * @description: Merchant Table Layout Component.
 *  
 */
const MerchantTableComponent = ({ classes, merchants, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, toggleEditModal, toggleDeleteModal, sortBids, displayBids }) => (
    <Table className={classes.table}>
        <TableHead className={classes.headerStyle}>
            <TableRow>
                <TableCell>
                    <Typography type="body2" className={classes.columnTitle}>
                        {Constants.MERCHANT_NAME}
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        {Constants.ID}
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        {Constants.AVATAR}
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        {Constants.EMAIL}
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        {Constants.PHONE}
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        {Constants.HASPREMIUM}
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        {Constants.BIDS}
                    </Typography>
                </TableCell>
                <TableCell className={classes.actionsTitle}>
                    <Typography type="body2" className={classes.columnTitle}>
                        {Constants.ACTIONS}
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {merchants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(merchant => {
                return (
                    <TableRow key={merchant.id}>
                        <TableCell>{(merchant.firstName || merchant.lastName) && `${merchant.firstName} ${merchant.lastName}`}</TableCell>
                        <TableCell numeric>{merchant.id}</TableCell>
                        <TableCell numeric>
                            <Avatar className={classes.avatar}>{merchant.avatarUrl[0]}</Avatar>
                        </TableCell>
                        <TableCell numeric>{merchant.email}</TableCell>
                        <TableCell numeric>{merchant.phone}</TableCell>
                        <TableCell numeric>{merchant.hasPremium ? 'Yes' : 'No'}</TableCell>
                        <TableCell numeric>
                            <BidsDialogComponent classes={classes} merchant={merchant} sortBids={sortBids} displayBids={displayBids} />
                        </TableCell>
                        <TableCell numeric>
                            <IconButton
                                className={classes.button}
                                aria-label="Edit"
                                onClick={toggleEditModal.bind(null, merchant)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                className={classes.button}
                                aria-label="Delete"
                                onClick={toggleDeleteModal.bind(null, merchant)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TablePagination
                    colSpan={6}
                    count={merchants.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableRow>
        </TableFooter>
    </Table>
);

MerchantTableComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    merchants: PropTypes.array,
    page: PropTypes.number,
    handleChangePage: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func,
    toggleDeleteModal: PropTypes.func,
    toggleEditModal: PropTypes.func,
    rowsPerPage: PropTypes.number,
    sortBids: PropTypes.func,
    displayBids: PropTypes.array,
};

export default MerchantTableComponent;
