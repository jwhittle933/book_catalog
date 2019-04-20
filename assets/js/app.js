import React from 'react'
import ReactDOM from 'react-dom'
import 'phoenix_html'
import './materialize.js'
// import './socket.js'
import CatalogList from './components/Catalog'

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible')
  var instances = M.Collapsible.init(elems, { accordion: true }) // eslint-disable-line
})

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select')
  var instances = M.FormSelect.init(elems, {}) // eslint-disable-line
})

if (document.getElementById('app')) {
  const element = document.getElementById('app')
  ReactDOM.render(<CatalogList />, element)
}

// if (document.getElementById('edit')) {
//   const element = document.getElementById('edit');
//   const props = Object.assign({}, element.dataset);
//   ReactDOM.render(<Edit {...props} />, document.getElementById('edit'));
// }
