import React, { useState, useEffect } from 'react';
import Axios from 'axios';

//TODO: Implement fuzzy matching search feature
// and sort functionality by title, author, date, etc.
// Axios api call for all books based on sort category,
// set state with returned data, and populate list

// Add edit/delete functionality to each list item

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [fuzzyMatch, setFuzzyMatch] = useState([]);

  useEffect(() => {
    console.log('Mounted');
    Axios.get('/api/books').then(res => {
      console.log(res.data);
      setBooks(res.data.books);
    });
  }, []);

  return (
    <div className="z-depth-3">
      <div className="collection with-header">
        <h2 className="collection-header">Books</h2>
        {books.map(book => (
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
