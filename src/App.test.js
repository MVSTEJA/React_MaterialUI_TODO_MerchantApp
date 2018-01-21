import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { Provider } from 'react-redux';

import { initialState } from "./index";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

jest.mock('react-dom');

const init = () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore(initialState);

  store.dispatch = jest.fn();
  return {
    store
  }
}

it('should match snap-shot generated via enzyme', () => {
  const AppShallow = shallow(<App />);

  expect(AppShallow).toMatchSnapshot();
});

it('should matchsnapshot of App', () => {
  const { store } = init();
  const MountedApp = mount(<Provider store={store} >
    <App />
  </Provider>
  );

  expect(MountedApp).toMatchSnapshot();
});
