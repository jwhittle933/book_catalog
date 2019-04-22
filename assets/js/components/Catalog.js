import React, { useState, useEffect } from 'react'
import { FormSearch } from 'grommet-icons'
import Axios from 'axios'

const Catalog = () => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [totalBooks, setTotalBooks] = useState(0)
  const [show, setShow] = useState('all')
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    Axios.get(setList(show)).then(res => {
      setBooks(res.data.books)
      setFilteredBooks(res.data.books)
      setTotalBooks(res.data.total_books)
      console.log(res.data.total_books)
    })
  }, [show])

  const setList = show => {
    if (show === 'all') return `/api/books`
    if (show === 'page')
      return `/api/books?page_size=${pageSize}&page_number=${pageNumber}`
  }

  const getNewPage = () => {}

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
    <div>
      <UserControls
        filterBooks={filterBooks}
        totalBooks={totalBooks}
        show={show}
        setShow={setShow}
      />
      <BookList filteredBooks={filteredBooks} />
    </div>
  )
}

const BookList = ({ filteredBooks }) => (
  <ul className="collapsible popout collection">
    {filteredBooks.map(book => (
      <li key={book.id}>
        <div className="collapsible-header collection-item truncate">
          <strong>{book.title}</strong>
          {book.volume && ', ' + book.volume}
        </div>
        <div className="collapsible-body">
          {book.title} by <em>{book.author}</em>, {book.page_count}
          <small> pgs.</small>, {book.date_published}
          <div>
            <a
              href={`/${book.id}`}
              className="waves-effect waves-light btn-small right-align teal accent-3   blue-text text-darken-4"
            >
              View<i className="material-icons right">send</i>
            </a>
          </div>
        </div>
      </li>
    ))}
  </ul>
)

const UserControls = ({ filterBooks, totalBooks, show, setShow }) => (
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
    <div className="input-field col s12">
      <select defaultValue={show} onChange={e => setShow(e.target.value)}>
        <option value="all">Show All</option>
        <option value="page">Show Pages</option>
      </select>
      Total: {totalBooks}
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
