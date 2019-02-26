import React from 'react';
import ReactDOM from 'react-dom';
import JSONSchemaFields from './JSONSchemaFields';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JSONSchemaFields />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with no schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JSONSchemaFields />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders empty with empty schema', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JSONSchemaFields schema={{}}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it('renders with a schema', () => {
  const div = document.createElement('div');
  const schema = {
    "properties": {
      "name": {
        "type": "string"
      },
      "tag": {
        "type": "string"
      }
    }
  };
  ReactDOM.render(<JSONSchemaFields schema={schema}/>, div);
  expect(div.innerHTML.includes('name')).toBe(true);
  expect(div.innerHTML.includes('string')).toBe(true);

  expect(div.innerHTML.includes('tag')).toBe(true);
  expect(div.innerHTML.includes('string')).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders with a schema required', () => {
  const div = document.createElement('div');
  const schema = {
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string"
      }
    }
  };
  ReactDOM.render(<JSONSchemaFields schema={schema}/>, div);
  expect(div.innerHTML.includes('Required')).toBe(true);
  expect(div.innerHTML.includes('true')).toBe(true);

  ReactDOM.unmountComponentAtNode(div);
});

it('renders with a schema without required', () => {
  const div = document.createElement('div');
  const schema = {
    "properties": {
      "name": {
        "type": "string"
      }
    }
  };
  ReactDOM.render(<JSONSchemaFields schema={schema}/>, div);
  expect(div.innerHTML.includes('Required')).toBe(true);
  expect(div.innerHTML.includes('false')).toBe(true);

  ReactDOM.unmountComponentAtNode(div);
});