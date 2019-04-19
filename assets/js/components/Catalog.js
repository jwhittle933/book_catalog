import React, { useState, useEffect } from 'react'
import { FormSearch } from 'grommet-icons'
import Axios from 'axios'

const Catalog = () => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  // const [totalPages, setTotalPages] = useState(0)
  // const [fuzzyMatch, setFuzzyMatch] = useState([])
  // const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    Axios.get(`/api/books`).then(res => {
      setBooks(res.data)
      setFilteredBooks(res.data)
    })
  }, [])

  const filterBooks = search => {
    const searchField = new RegExp(search, 'i')
    const filtered = books.filter(book => {
      return (
        searchField.test(book.author) ||
        searchField.test(book.date_published) ||
        searchField.test(book.ed) ||
        searchField.test(book.isbn) ||
        searchField.test(book.page_count) ||
        searchField.test(book.title) ||
        searchField.test(book.subtitle)
      )
    })
    if (search !== '') return setFilteredBooks(filtered)
    if (search === '') return setFilteredBooks(books)
  }

  // const fetchNextPage = () => {
  //   if (pageNumber + 1 === totalPages) return
  //   return setPageNumber(pageNumber + 1)
  // }

  // const fetchPrevPage = () => {
  //   if (pageNumber === 1) return
  //   return setPageNumber(pageNumber - 1)
  // }

  return (
    <div className="z-depth-3">
      <div className="row container">
        <div className="col s1 valign-wrapper">
          <FormSearch size="large" color="black" />
        </div>
        <div className="col s11 input-field inline">
          <input
            id="last_name"
            type="text"
            className="validate"
            onKeyDown={e => filterBooks(e.target.value)}
          />
          <label htmlFor="last_name">Search in Books</label>
        </div>
      </div>
      <ul className="collapsible popout collection col s8">
        {filteredBooks.map(book => (
          <li>
            <div className="collapsible-header collection-item truncate">
              <strong>{book.title}</strong>
            </div>
            <div className="collapsible-body">
              {book.title}&nbsp; by <em>{book.author}</em>, {book.page_count}{' '}
              <small>pgs.</small>, {book.date_published}
            </div>
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  )
}

const Search = filterBooks => (
  <div className="row container">
    <div className="col s1 valign-wrapper">
      <FormSearch size="large" color="black" />
    </div>
    <div className="col s11 input-field inline">
      <input
        id="last_name"
        type="text"
        className="validate"
        onKeyDown={e => filterBooks(e.target.value)}
      />
      <label htmlFor="last_name">Search in Books</label>
    </div>
  </div>
)

// const PageOpts = () => ()

const Pagination = () => (
  <ul className="pagination">
    <li className="waves-effect m2">
      <a href="#!">
        <i className="material-icons">chevron_left</i>
      </a>
    </li>
    <li className="waves-effect m2">1</li>
    <li className="waves-effect m2">2</li>
    <li className="waves-effect m2">
      <a href="#!">
        <i className="material-icons m2">chevron_right</i>
      </a>
    </li>
  </ul>
)

export default Catalog
