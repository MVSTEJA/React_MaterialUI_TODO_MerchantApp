import React from 'react';
import BidsFormComponent from './BidsFormComponent';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { initialState } from "./../index";

const init = () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(initialState);

    store.dispatch = jest.fn();
    return {
        merchants: initialState.merchants,
        classes: {},
        store: store,
        event: {
            preventDefault: jest.fn(),
            target: {
                type: 'text',
                name: 'test',
                value: 'test'
            }
        },
        handleBidsChange: jest.fn()
    }
}

jest.mock('react-dom');

it('should shallow mount and match matchsnapshot MerchantTable', () => {
    const { merchants } = init();
    const BidsFormComponentShallow = shallow(<BidsFormComponent merchants={merchants} />);

    expect(BidsFormComponentShallow).toMatchSnapshot();
});

it('should mount with bids', () => {
    const { merchants, store } = init();

    const BidsFormComponentShallow = shallow(<BidsFormComponent merchants={merchants} bids={merchants[0].bids} store={store} />);

    expect(BidsFormComponentShallow.dive()).toMatchSnapshot();
});

it('should invoke handleBidsChange, delete flow ', () => {
    const { merchants, store, event, handleBidsChange } = init();

    const BidsFormComponentShallow = shallow(<BidsFormComponent merchants={merchants} bids={merchants[0].bids} store={store} handleBidsChange={handleBidsChange} />);

    BidsFormComponentShallow.dive().instance().handleBidsRowChange(merchants[0].bids[0], 'delete', 0, event)
    expect(handleBidsChange.mock.calls.length).toEqual(1);
});

it('should invoke handleBidsChange, Edit flow ', () => {
    const { merchants, store, event, handleBidsChange } = init();

    const BidsFormComponentShallow = shallow(<BidsFormComponent merchants={merchants} bids={merchants[0].bids} store={store} handleBidsChange={handleBidsChange} />);

    BidsFormComponentShallow.dive().instance().handleBidsRowChange(merchants[0].bids[0], 'edit', 0, event)
    expect(handleBidsChange.mock.calls.length).toEqual(1);
});

it('should invoke handleBidsFormChange ', () => {
    const { merchants, store, event, handleBidsChange } = init();

    const BidsFormComponentShallow = shallow(<BidsFormComponent merchants={merchants} bids={merchants[0].bids} store={store} handleBidsChange={handleBidsChange} />);

    BidsFormComponentShallow.dive().instance().handleBidsFormChange(0, event);
    expect(handleBidsChange.mock.calls.length).toEqual(1);
});