import React from 'react';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

const BidsDialogComponentList = ({ classes, displayBids }) => (
    <div className={classes.demo}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Bid Id</TableCell>
                    <TableCell numeric>Car Title</TableCell>
                    <TableCell numeric>Amount</TableCell>
                    <TableCell numeric>Create</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    displayBids.map((bid, key) =>
                        <TableRow key={key} button>
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
    </div>
);

export default class BidsDialogComponent extends React.Component {
    state = {
        openBidsDialog: false,
    }

    handleClickBidsOpen = () => {
        this.setState({
            openBidsDialog: true
        })
        this.props.sortBids(this.props.merchant.bids);
    }
    handleClickBidsClose = () => {
        this.setState({
            openBidsDialog: false
        })
    }
    render() {
        const { classes, merchant } = this.props;
        if (merchant.bids && merchant.bids.length > 0) {
            return (
                <div>
                    <Button raised dense onClick={this.handleClickBidsOpen}>
                        Bids
                    </Button>
                    <Dialog onClose={this.handleClickBidsClose} open={this.state.openBidsDialog} aria-labelledby="simple-dialog-title">
                        <DialogTitle id="simple-dialog-title">Bids</DialogTitle>
                        <BidsDialogComponentList classes={classes} displayBids={this.props.displayBids || this.props.merchant.bids} />
                    </Dialog>
                </div >
            )
        } else {
            return <div>No Bids</div>
        }

    }
};
