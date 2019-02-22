import React from 'react';
import ReactDOM from 'react-dom';
import Servers from './Servers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Servers />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with no schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Servers />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with empty schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Servers schema={{}}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with empty schema servers', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Servers schema={{ servers: [] }}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders schema servers', () => {
  const div = document.createElement('div');
  const schema = {
    servers: [
      {
        "name": "Pet Store",
        "url": "http://petstore.openrpc.io/api",
        "description": "foobar"
      }
    ]
  }
  ReactDOM.render(<Servers schema={schema}/>, div);
  expect(div.innerHTML.includes("Pet Store")).toBe(true);
  expect(div.innerHTML.includes('href="http://petstore.openrpc.io/api"')).toBe(true);
  expect(div.innerHTML.includes("foobar")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});