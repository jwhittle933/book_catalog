import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'

class CatalogList extends React.Component {
	// TODO: Axios to api/books to fetch all books from database and populate
	// 		index with tiles

	_isMounted = false

	state = {
		books: []
	}

	componentDidMount(){
		this._isMounted = true
		Axios
			.get('/api/books')
			.then( res => {
				if (this._isMounted){
					this.setState({ books: res.data.books })
				}	
			})
	}

	componentWillUnmount(){
		this._isMounted = false
	}

	render() {
		return (
			<div className="collection">
				{
					this.state.books.map( book => <a href="#!" key={book.id} id={book.id} className="collection-item">{book.title}, by {book.author}, {book.edition}, {book.date_published}</a> )
				}
			</div>
		)
	}
}



if (document.getElementById('app')){
	const element = document.getElementById('app')
	ReactDOM.render(<CatalogList />, element)
}