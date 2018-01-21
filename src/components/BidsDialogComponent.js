import React from 'react';

import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

const BidsDialogComponentList = ({ classes, displayBids, orderBy, sortBidLabel, order, handleHeaderSort }) => (
    <div className={classes.demo}>
        <Table className={classes.table}>
            <TableHead className={classes.headerStyle}>
                <TableRow>
                    <TableCell className={classes.columnTitle}>Bid Id</TableCell>
                    <TableCell numeric className={classes.columnTitle}>Car Title</TableCell>
                    <TableCell
                        numeric
                        className={classes.columnTitle}
                        sortDirection={orderBy === 'amount' ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === 'amount' ? true : false}
                            direction={order}
                            onClick={handleHeaderSort.bind(null, 'amount', order)}
                        >
                            Amount
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
                            onClick={handleHeaderSort.bind(null, 'created', order)}
                        >
                            Created
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
        this.setState(prevState => ({
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
            return <div>No Bids</div>
        }

    }
};
