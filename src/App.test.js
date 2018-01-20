import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

jest.mock('react-dom');

it('should match snap-shot generated via enzyme', () => {
  const AppShallow = shallow(<App />);

  expect(AppShallow).toMatchSnapshot();
});
