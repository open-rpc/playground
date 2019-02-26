import React from 'react';
import ReactDOM from 'react-dom';
import JSONSchema from './JSONSchema';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JSONSchema />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with no schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JSONSchema />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with empty schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JSONSchema schema={{}}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});
