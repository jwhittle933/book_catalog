import React from 'react';
import ReactDOM from 'react-dom';
import 'phoenix_html';
import CatalogList from './components/Catalog';
// import Edit from './components/Edit';

if (document.getElementById('app')) {
  const element = document.getElementById('app');
  ReactDOM.render(<CatalogList />, element);
}

// if (document.getElementById('edit')) {
//   const element = document.getElementById('edit');
//   const props = Object.assign({}, element.dataset);
//   ReactDOM.render(<Edit {...props} />, document.getElementById('edit'));
// }
