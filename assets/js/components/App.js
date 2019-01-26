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
					this.setState({ books: res.data })
				}	
			})
	}

	componentWillUnmount(){
		this._isMounted = false
	}

	render() {
		return (
			<div>
				<strong className="list-group">
					React Component
				</strong>
			</div>
		)
	}
}



if (document.getElementById('app')){
	const element = document.getElementById('app')
	const props = Object.assign({}, element.dataset)
	ReactDOM.render(<CatalogList />, element)
}