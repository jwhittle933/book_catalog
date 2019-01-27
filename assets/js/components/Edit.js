import React from 'react'
import ReactDOM from 'react-dom'

class Edit extends React.Component {
	state = {}

	componentDidMount(){
		this.setState({...this.props})
	}

	render(){
		return (
			<div className="form-group">
				<form method="" action="/delete">
					
				</form>
			</div>
		)
	}
}


if (document.getElementById('edit')){
	const element = document.getElementById('edit')
	const props = Object.assign({}, element.dataset)
	ReactDOM.render(<Edit {...props} />, document.getElementById('edit'))
}