import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

function createData(id, firstName, lastName, avatarUrl, email, phone, hasPremium, bids) {
  return { id, firstName, lastName, avatarUrl, email, phone, hasPremium, bids };
}

const dataSet = [
  createData('0', 'test11', 'test12', 'www.google.com', 'test11@test.com', 1234567891, true, [{
    id: '1',
    carTitle: 'title',
    amount: 1,
    created: '01/01/01'
  },
  {
    id: '2',
    carTitle: 'title2',
    amount: 2,
    created: '02/02/02'
  }]),
  createData('1', 'test21', 'test22', 'www.google.com', 'test22@test.com', 1234567892, true, []),
  createData('2', 'test31', 'test32', 'www.google.com', 'test33@test.com', 1234567893, false, []),
  createData('3', 'test41', 'test42', 'www.google.com', 'test44@test.com', 1234567894, true, []),
  createData('4', 'test51', 'test52', 'www.google.com', 'test55@test.com', 1234567895, false, []),
  createData('5', 'test11', 'test12', 'www.google.com', 'test11@test.com', 1234567891, true, []),
  createData('6', 'test21', 'test22', 'www.google.com', 'test22@test.com', 1234567892, true, []),
  createData('7', 'test31', 'test32', 'www.google.com', 'test33@test.com', 1234567893, false, []),
  createData('8', 'test41', 'test42', 'www.google.com', 'test44@test.com', 1234567894, true, []),
  createData('9', 'test51', 'test52', 'www.google.com', 'test55@test.com', 1234567895, false, []),
];
export const initialState = {
  merchants: dataSet,
  merchantFormData: {
    firstName: '', lastName: '', avatarUrl: '', email: '', phone: '', id: '', hasPremium: false, bids: []
  },
  displayBids: []

}
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
