import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'

class CatalogList extends React.Component {
	//TODO: Implement fuzzy matching search feature
	// and sort functionality by title, author, date, etc.

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

	delete(){

	}

	render() {
		return (
			<div className="">
				<div className="collection with-header">
					<p className="collection-header">
						<h4>Books</h4>
					</p>
					{
						this.state.books.map( book => {
							return (
								<a href={`/${book.id}`} className="collection-item truncate" key={book.id}>
									<strong>{book.title}</strong> by {book.author}, ed. {book.edition}, {book.page_count} pages, {book.date_published}
								</a>
							)
						} )
					}
				</div>
			</div>
		)
	}
}



if (document.getElementById('app')){
	const element = document.getElementById('app')
	ReactDOM.render(<CatalogList />, element)
}