import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import BidsDialogComponent from "./../Bid/BidsDialogComponent";

const MerchantTableComponent = ({ classes, merchants, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, toggleEditModal, toggleDeleteModal, sortBids, displayBids }) => (
    <Table className={classes.table}>
        <TableHead className={classes.headerStyle}>
            <TableRow>
                <TableCell>
                    <Typography type="body2" className={classes.columnTitle}>
                        Merchant Name
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        ID
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        Avatar
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        Email
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        Phone
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        HasPremium
                    </Typography>
                </TableCell>
                <TableCell numeric>
                    <Typography type="body2" className={classes.columnTitle}>
                        Bids
                    </Typography>
                </TableCell>
                <TableCell className={classes.actionsTitle}>
                    <Typography type="body2" className={classes.columnTitle}>
                        Actions
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
