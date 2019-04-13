import React from 'react';
import ReactDOM from 'react-dom';
require('./components/Edit.js');
import 'phoenix_html';
import CatalogList from './components/App';

if (document.getElementById('app')) {
  const element = document.getElementById('app');
  ReactDOM.render(<CatalogList />, element);
}
