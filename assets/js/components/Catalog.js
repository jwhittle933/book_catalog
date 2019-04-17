import React, { useState, useEffect } from 'react'
import { FormSearch } from 'grommet-icons'
import Axios from 'axios'

const Catalog = () => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [fuzzyMatch, setFuzzyMatch] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    Axios.get(
      `/api/books?page_size=${pageSize}&page_number=${pageNumber}`,
    ).then(res => {
      console.log(res.data)
      setBooks(res.data)
      setFilteredBooks(res.data)
    })
  }, [pageNumber])

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
    if (search === '') return books
  }
  return (
    <div className="z-depth-3">
      <div className="collection with-header">
        <div className="container">
          <div className="row">
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
        </div>
        {filteredBooks.map(book => (
          <a
            href={`/${book.id}`}
            className="collection-item truncate blue-grey-text"
            key={book.id}
          >
            <strong>{book.title}</strong> by <em>{book.author}</em>,{' '}
            {book.page_count} <small>pgs.</small>, {book.date_published}
          </a>
        ))}
      </div>
      <div className="row container">
        <div
          className="col s3 btn blue"
          onClick={() =>
            pageNumber === 1 ? null : setPageNumber(pageNumber - 1)
          }
        >
          Previous
        </div>
        <div className="col s2 center-align">{pageNumber}</div>
        <div className="col s2 center-align">{pageSize}</div>
        <div
          className="col s3 btn blue"
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </div>
      </div>
    </div>
  )
}

export default Catalog
