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
      setTotalPages(res.data.page_count)
    })
  }, [show, pageNumber])

  const setList = show => {
    if (show === 'all') return `/api/books`
    if (show === 'page')
      return `/api/books?page_size=${pageSize}&page_number=${pageNumber}`
  }

  // const getNewPage = () => {}

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

  return (
    <div>
      <UserControls
        filterBooks={filterBooks}
        totalBooks={totalBooks}
        show={show}
        setShow={setShow}
      />
      {show === 'page' && (
        <Pagination
          totalPages={totalPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
      <p className="right">Total: {totalBooks}</p>
      <BookList filteredBooks={filteredBooks} />
    </div>
  )
}

const UserControls = ({ filterBooks, show, setShow }) => (
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
    </div>
  </div>
)

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

const Pagination = ({ pageNumber, totalPages, setPageNumber }) => (
  <ul className="pagination">
    <li
      className={pageNumber === 1 ? 'disabled' : 'waves-effect'}
      onClick={() => (pageNumber === 1 ? null : setPageNumber(pageNumber - 1))}
    >
      <a>
        <i className="material-icons">chevron_left</i>
      </a>
    </li>
    {[...Array(totalPages).keys()].map(page => (
      <li
        className={`waves-effect ${
          page + 1 === pageNumber ? 'active deep-orange accent-3' : null
        }`}
        key={page}
        onClick={() => setPageNumber(page + 1)}
      >
        <a>{page + 1}</a>
      </li>
    ))}
    <li
      className={pageNumber === totalPages ? 'disabled' : 'waves-effect'}
      onClick={() =>
        pageNumber === totalPages ? null : setPageNumber(pageNumber + 1)
      }
    >
      <a>
        <i className="material-icons">chevron_right</i>
      </a>
    </li>
  </ul>
)

export default Catalog
