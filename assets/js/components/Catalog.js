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
      <UserControls filterBooks={filterBooks} />
      <BookList filteredBooks={filteredBooks} />
      <Pagination />
    </div>
  )
}

const BookList = ({ filteredBooks }) => (
  <ul className="collapsible popout collection col s8">
    {filteredBooks.map(book => (
      <li key={book._id}>
        <div className="collapsible-header collection-item truncate">
          <strong>{book.title}</strong>
          {book.volume && ', ' + book.volume}
        </div>
        <div className="collapsible-body">
          {book.title} by <em>{book.author}</em>, {book.page_count}
          <small> pgs.</small>, {book.date_published}
          <div className="">
            <a
              href={`/${book.id}`}
              class="waves-effect waves-light btn-small right-align teal accent-3   blue-text text-darken-4"
            >
              View<i class="material-icons right">send</i>
            </a>
            <a
              href={`/${book.id}/edit`}
              class="waves-effect waves-light btn-small right-align grey darken-1"
            >
              Edit<i class="material-icons right">create</i>
            </a>
            <a class="waves-effect waves-light btn-small right-align red accent-3">
              Delete<i class="material-icons right">close</i>
            </a>
          </div>
        </div>
      </li>
    ))}
  </ul>
)

const UserControls = ({ filterBooks }) => (
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
      <label htmlFor="last_name">Search by Name, Author, etc...</label>
    </div>
    <div class="input-field col s12">
      <select>
        <option value="1">Show All</option>
        <option value="2">Show Pages</option>
      </select>
      <label>Materialize Select</label>
    </div>
  </div>
)

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
