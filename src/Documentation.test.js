import React from 'react';
import ReactDOM from 'react-dom';
import Documentation from './Documentation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Documentation schema={{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

[
  {
    name: 'info',
    checkTag: 'H1',
    initialValue: {}
  },
  {
    name: 'servers',
    checkTag: 'H2',
    initialValue: []
  },
  {
    name: 'methods',
    checkTag: 'H2',
    initialValue: [{}]
  }
].forEach(({name, checkTag, initialValue}) => {
  it(`renders ${name} markdown without crashing`, () => {
    const div = document.createElement('div');
    ReactDOM.render(<Documentation schema={{[name]: initialValue}}/>, div);
    expect(div.firstChild.tagName).toBe(checkTag);
    ReactDOM.unmountComponentAtNode(div);
  });
})
