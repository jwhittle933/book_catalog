import React, { useState, useEffect } from 'react';
import { FormSearch } from 'grommet-icons';
import Axios from 'axios';

//TODO: Implement fuzzy matching search feature
// and sort functionality by title, author, date, etc.
// Axios api call for all books based on sort category,
// set state with returned data, and populate list

// Add edit/delete functionality to each list item

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [fuzzyMatch, setFuzzyMatch] = useState([]);

  useEffect(() => {
    Axios.get('/api/books').then(res => {
      setBooks(res.data.books);
      setFilteredBooks(res.data.books);
    });
  }, []);

  const match = (book, search) => {
    const keys = Object.keys(book);
    const values = Object.values(book);
    const isMatch = false;
    const match = value.forEach(value => {
      value === search ? (isMatch = true) : null;
    });
  };

  const filterBooks = search => {
    const searchField = new RegExp(search, 'i');
    const filtered = books.filter(book => {
      return (
        searchField.test(book.author) ||
        searchField.test(book.date_published) ||
        searchField.test(book.ed) ||
        searchField.test(book.isbn) ||
        searchField.test(book.page_count) ||
        searchField.test(book.title) ||
        searchField.test(book.subtitle)
      );
    });
    if (search !== '') return setFilteredBooks(filtered);
    if (search === '') return books;
  };

  return (
    <div className="z-depth-3">
      <div className="collection with-header">
        <h2 className="collection-header">Books</h2>
        <div className="container">
          <div className="row">
            <div className="col s1 valign-wrapper">
              <FormSearch
                size="large"
                color="black"
                onClick={() => setFilteredBooks(books)}
              />
            </div>
            <div className="col s11">
              <input
                id="last_name"
                type="text"
                className="validate"
                placeholder="Search"
                onKeyDown={e => {
                  console.log('Keydown');
                  filterBooks(e.target.value);
                }}
              />
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
    </div>
  );
};

export default Catalog;
