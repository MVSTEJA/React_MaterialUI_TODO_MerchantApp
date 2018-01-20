import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should match snap-shot generated via enzyme', () => {
  const AppShallow = shallow(<App />);

  console.log(AppShallow.debug())
  expect(AppShallow).toMatchSnapshot();
});
