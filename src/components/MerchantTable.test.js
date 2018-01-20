import React from 'react';
import ReactDOM from 'react-dom';
import MerchantTable from './MerchantTable';
import { mount, shallow } from 'enzyme';
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
        stateObj: {
            openEditModal: false,
            openDeleteModal: false,
            page: 0,
            rowsPerPage: 5,
            error: {
                editForm: {
                    Id: false,
                    IdMessage: ""
                }
            },
            merchantRowData: {}
        },
        event: {
            preventDefault: jest.fn(),
            target: {
                type: 'text',
                name: 'test',
                value: 'test'
            }
        },
        merchantFormData: initialState.merchantFormData
    }
}
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MerchantTable />, div);
});

jest.mock('react-dom');

it('should shallow mount and match matchsnapshot MerchantTable', () => {
    const { merchants } = init();
    const MerchantTableShallow = shallow(<MerchantTable merchants={merchants} />);

    expect(MerchantTableShallow).toMatchSnapshot();
});

it('should shallow mount with no merchants bids', () => {
    const { merchants, store } = init();
    const MerchantTableMounted = mount(<MerchantTable merchants={merchants} store={store} />);

    expect(MerchantTableMounted).toMatchSnapshot();
});

it('should mount with merchants bids', () => {
    const { merchants, store } = init();

    const MerchantTableMounted = shallow(<MerchantTable merchants={merchants} store={store} />);

    expect(MerchantTableMounted.dive().dive()).toMatchSnapshot();
});

it('should invoke handleCloseModal', () => {
    const { merchants, store, stateObj } = init();

    const MerchantTableMounted = shallow(<MerchantTable merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().handleCloseModal();
    expect(MerchantTableMounted.dive().dive().instance().state).toEqual(stateObj);
});

it('should invoke handleEditFormChange', () => {
    const { merchants, store, event, } = init();
    const MerchantTableMounted = shallow(<MerchantTable merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().handleEditFormChange(event);
    expect(store.dispatch.mock.calls.length).toEqual(1);
});

it('should enter add condition of handleEditFormSubmit', () => {
    const { merchants, store, event, merchantFormData
} = init();
    merchantFormData.id = 'testID';
    const MerchantTableMounted = shallow(<MerchantTable merchantFormData={merchantFormData} merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().handleEditFormSubmit('edit', event);
    expect(store.dispatch.mock.calls.length).toEqual(1);
});

it('should enter add condition of handleEditFormSubmit', () => {
    const { merchants, store, event, merchantFormData
} = init();
    merchantFormData.id = 'testID';
    const MerchantTableMounted = shallow(<MerchantTable merchantFormData={merchantFormData} merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().handleEditFormSubmit('add', event);
    expect(store.dispatch.mock.calls.length).toEqual(1);
});

it('should toggleEditModal', () => {
    const { merchants, store, event, merchantFormData
} = init();
    merchantFormData.id = 'testID';
    const MerchantTableMounted = shallow(<MerchantTable merchantFormData={merchantFormData} merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().toggleEditModal('edit', event);
    expect(store.dispatch.mock.calls.length).toEqual(2);
});

it('should toggleDeleteModal', () => {
    const { merchants, store, event, merchantFormData
} = init();
    merchantFormData.id = 'testID';
    const MerchantTableMounted = shallow(<MerchantTable merchantFormData={merchantFormData} merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().toggleDeleteModal('edit', event);
    expect(store.dispatch.mock.calls.length).toEqual(1);
});

it('should handleDeleteModalData', () => {
    const { merchants, store, event, merchantFormData
} = init();
    merchantFormData.id = 'testID';
    const MerchantTableMounted = shallow(<MerchantTable merchantFormData={merchantFormData} merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().handleDeleteModalData(event);
    expect(store.dispatch.mock.calls.length).toEqual(1);
});

it('should handleChangePage', () => {
    const { merchants, store, event, merchantFormData, stateObj
} = init();
    merchantFormData.id = 'testID';
    const MerchantTableMounted = shallow(<MerchantTable merchantFormData={merchantFormData} merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().handleChangePage(event);
    expect(MerchantTableMounted.dive().dive().instance().state).toEqual(stateObj);
});

it('should handleChangeRowsPerPage', () => {
    const { merchants, store, event, merchantFormData, stateObj
} = init();
    merchantFormData.id = 'testID';
    const MerchantTableMounted = shallow(<MerchantTable merchantFormData={merchantFormData} merchants={merchants} store={store} />);

    MerchantTableMounted.dive().dive().instance().handleChangeRowsPerPage(event);
    expect(MerchantTableMounted.dive().dive().instance().state).toEqual(stateObj);
});
