import React from 'react';
import ReactDOM from 'react-dom';
import Params from './Params';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Params />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with no schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Params />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with empty params', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Params params={[]}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});


it('renders params', () => {
  const div = document.createElement('div');
  const params = [
    {
      "name": "tags",
      "description": "tags to filter by",
      "schema": {
        "type": "string"
      }
    }
  ]
  ReactDOM.render(<Params params={params}/>, div);
  expect(div.innerHTML.includes("tags")).toBe(true);
  expect(div.innerHTML.includes('tags to filter by')).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});