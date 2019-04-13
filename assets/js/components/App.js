import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

class OldCatalogList extends React.Component {
  //TODO: Implement fuzzy matching search feature
  // and sort functionality by title, author, date, etc.
  // Axios api call for all books based on sort category,
  // set state with returned data, and populate list

  // Add edit/delete functionality to each list item

  _isMounted = false;
  state = {
    books: [],
    fuzzyMatch: []
  };

  componentDidMount() {
    this._isMounted = true;
    Axios.get('/api/books').then(res => {
      if (this._isMounted) {
        this.setState({ books: res.data.books });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  filterData() {
    //retrieve filtered list of books
  }

  render() {
    return (
      <div className="z-depth-3">
        <div className="collection with-header">
          <h2 className="collection-header">Books</h2>
          {this.state.books.map(book => {
            return (
              <a
                href={`/${book.id}`}
                className="collection-item truncate blue-grey-text"
                key={book.id}
              >
                <strong>{book.title}</strong> by <em>{book.author}</em>,{' '}
                {book.page_count} <small>pgs.</small>, {book.date_published}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

//TODO: Implement fuzzy matching search feature
// and sort functionality by title, author, date, etc.
// Axios api call for all books based on sort category,
// set state with returned data, and populate list

// Add edit/delete functionality to each list item

const CatalogList = () => {
  const [books, setBooks] = useState([]);
  const [fuzzyMatch, setFuzzyMatch] = useState([]);

  useEffect(() => {
    Axios.get('/api/books').then(res => {
      console.log(res.data);
      setBooks(res.data);
    });
  }, []);

  return (
    <div className="z-depth-3">
      <div className="collection with-header">
        <h2 className="collection-header">Books</h2>
        {books.length > 0 &&
          books.map(book => (
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

if (document.getElementById('app')) {
  const element = document.getElementById('app');
  ReactDOM.render(<OldCatalogList />, element);
}
