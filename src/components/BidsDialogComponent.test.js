import React from 'react';
import ReactDOM from 'react-dom';
import BidsDialogComponent from './BidsDialogComponent';
import { shallow } from 'enzyme';

import { initialState } from "./../index";

const init = () => {

    return {
        merchant: {},
        classes: {},
        sortBids: jest.fn(),
        event: {
            preventDefault: jest.fn()
        }
    }
}
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BidsDialogComponent />, div);
});

jest.mock('react-dom');

it('should shallow mount and match matchsnapshot BidsDialogComponent', () => {
    const { merchant } = init();
    const BidsDialogComponentShallow = shallow(<BidsDialogComponent merchant={merchant} />);

    expect(BidsDialogComponentShallow).toMatchSnapshot();
});

it('should shallow mount with no merchant bids', () => {
    const { merchant, classes } = init();
    merchant.bids = initialState.merchants[0].bids;
    const BidsDialogComponentShallow = shallow(<BidsDialogComponent merchant={merchant} classes={classes} />);

    expect(BidsDialogComponentShallow).toMatchSnapshot();
});

it('should mount with merchant bids', () => {
    const { merchant, classes } = init();
    merchant.bids = initialState.merchants[0].bids;

    const BidsDialogComponentShallow = shallow(
        <BidsDialogComponent merchant={merchant} classes={classes} />
    );

    expect(BidsDialogComponentShallow.find('BidsDialogComponentList').dive()).toMatchSnapshot();
});

it('should invoke handleClickBidsOpen', () => {
    const { merchant, classes, sortBids, event } = init();
    merchant.bids = initialState.merchants[0].bids;

    const BidsDialogComponentShallow = shallow(
        <BidsDialogComponent merchant={merchant} classes={classes} sortBids={sortBids} />
    );

    BidsDialogComponentShallow.instance().handleClickBidsOpen(event);
    expect(BidsDialogComponentShallow.instance().state).toEqual({ "openBidsDialog": true, "order": "asc", "orderBy": "amount", "sortBidLabel": "amount" });
});

it('should invoke handleClickBidsClose', () => {
    const { merchant, classes, sortBids } = init();
    merchant.bids = initialState.merchants[0].bids;

    const BidsDialogComponentShallow = shallow(
        <BidsDialogComponent merchant={merchant} classes={classes} />
    );

    BidsDialogComponentShallow.instance().handleClickBidsClose();
    expect(BidsDialogComponentShallow.instance().state).toEqual({ "openBidsDialog": false, "order": "asc", "orderBy": "amount", "sortBidLabel": "amount" });
});
