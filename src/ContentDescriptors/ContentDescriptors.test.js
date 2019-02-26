import React from 'react';
import ReactDOM from 'react-dom';
import ContentDescriptors from './ContentDescriptors';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentDescriptors />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with no schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentDescriptors />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with empty schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentDescriptors schema={{}}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a name', () => {
  const div = document.createElement('div');
  const schema = {
    components: {
      contentDescriptors: {
        foo: {
          name: 'foo'
        }
      }
    }
  };
  ReactDOM.render(<ContentDescriptors schema={schema}/>, div);
  expect(div.innerHTML.includes('foo')).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});