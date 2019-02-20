import React from 'react';
import ReactDOM from 'react-dom';
import MonacoJSONEditor from './MonacoJSONEditor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MonacoJSONEditor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
