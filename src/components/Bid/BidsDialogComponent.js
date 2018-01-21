import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

const Constants = {
    BID_ID: 'Bid Id',
    CAR_TITLE: 'Car Title',
    AMOUNT: 'Amount',
    CREATED: 'Created',
    NO_BIDS: 'No Bids'
}
/**
 * @description: A Component for BidsDialog List. 
 */
const BidsDialogComponentList = ({ classes, displayBids, orderBy, order, handleHeaderSort }) => (
    <div className={classes.demo}>
        <Table className={classes.table}>
            <TableHead className={classes.headerStyle}>
                <TableRow>
                    <TableCell className={classes.columnTitle}>{Constants.BID_ID}</TableCell>
                    <TableCell numeric className={classes.columnTitle}>{Constants.CAR_TITLE}</TableCell>
                    <TableCell
                        numeric
                        className={classes.columnTitle}
                        sortDirection={orderBy === 'amount' ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === 'amount' ? true : false}
                            direction={order}
                            className={classes.columnTitle}
                            onClick={handleHeaderSort.bind(null, 'amount', order)}
                        >
                            {Constants.AMOUNT}
                        </TableSortLabel>
                    </TableCell>
                    <TableCell
                        numeric
                        className={classes.columnTitle}
                        sortDirection={orderBy === 'created' ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === 'created' ? true : false}
                            direction={order}
                            className={classes.columnTitle}
                            onClick={handleHeaderSort.bind(null, 'created', order)}
                        >
                            {Constants.CREATED}
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    displayBids.map((bid, key) =>
                        <TableRow key={key}>
                            <TableCell
                            >{bid.id}</TableCell>
                            <TableCell
                            >{bid.carTitle}</TableCell>
                            <TableCell
                            >{bid.amount}</TableCell>
                            <TableCell
                            >{bid.created}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </div >
);

BidsDialogComponentList.propTypes = {
    classes: PropTypes.object.isRequired,
    displayBids: PropTypes.array,
    orderBy: PropTypes.string,
    order: PropTypes.string,
    handleHeaderSort: PropTypes.func
};

export default class BidsDialogComponent extends React.Component {
    state = {
        openBidsDialog: false,
        order: 'asc',
        orderBy: 'amount',
        sortBidLabel: 'amount'
    }

    handleClickBidsOpen = (evt) => {
        evt.preventDefault();
        this.setState({
            openBidsDialog: true
        })
        const { sortBidLabel, order } = this.state;
        this.props.sortBids(this.props.merchant.bids, {
            sortBidLabel,
            order
        });
    }
    handleClickBidsClose = () => {
        this.setState({
            openBidsDialog: false
        })
    }
    handleHeaderSort = (sortBidLabel, order) => {
        const newOrder = order === 'asc' ? 'desc' : 'asc'
        this.props.sortBids(this.props.merchant.bids, {
            sortBidLabel,
            order: newOrder
        });
        this.setState(() => ({
            order: newOrder,
            sortBidLabel,
            orderBy: sortBidLabel
        }))
    }
    render() {
        const { classes, merchant } = this.props;
        if (merchant.bids && merchant.bids.length > 0) {
            return (
                <div>
                    <a href="" className={classes.anchorStyle} onClick={this.handleClickBidsOpen}>
                        <Typography className={classes.anchorStyle}>
                            {`${merchant.bids.length} Bids`}
                        </Typography>
                    </a>
                    <Dialog onClose={this.handleClickBidsClose} open={this.state.openBidsDialog} aria-labelledby="simple-dialog-title">
                        <DialogTitle id="simple-dialog-title">{`Bids by ${merchant.firstName} ${merchant.lastName}`}</DialogTitle>
                        <BidsDialogComponentList
                            classes={classes}
                            displayBids={this.props.displayBids || this.props.merchant.bids}
                            orderBy={this.state.orderBy}
                            order={this.state.order}
                            sortBidLabel={this.props.sortBidLabel || this.state.sortBidLabel}
                            handleHeaderSort={this.handleHeaderSort}
                        />
                    </Dialog>
                </div >
            )
        } else {
            return <div>{Constants.NO_BIDS}</div>
        }

    }
}

BidsDialogComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    sortBids: PropTypes.func,
    displayBids: PropTypes.array,
    sortBidLabel: PropTypes.string,
    merchant: PropTypes.shape({
        bids: PropTypes.array
    })
};