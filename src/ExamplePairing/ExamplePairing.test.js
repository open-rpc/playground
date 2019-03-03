import React from 'react';
import ReactDOM from 'react-dom';
import ExamplePairing from './ExamplePairing';
import examples from '@open-rpc/examples';
import refParser from 'json-schema-ref-parser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExamplePairing />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with no example', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExamplePairing />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with empty example', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExamplePairing example={{}}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders examples', async () => {
  const div = document.createElement('div');
  const simpleMath = await refParser.dereference(examples.simpleMath)
  ReactDOM.render(<ExamplePairing example={simpleMath.methods[0].examples[0]} />, div);
  expect(div.innerHTML.includes('2')).toBe(true);
  expect(div.innerHTML.includes('4')).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});