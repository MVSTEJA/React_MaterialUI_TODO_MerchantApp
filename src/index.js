import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

export const initialState = {
  merchants: [],
  merchantFormData: {
    firstName: '', lastName: '', avatarUrl: '', email: '', phone: '', id: '', hasPremium: false, bids: [], displayBids: [],
  },
  bidData: {
    id: '',
    carTitle: '',
    amount: null,
    created: ''
  }

}
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
