import React from 'react';

class Todo extends React.Component {
	render() {
		return (
				<div className='todo'>
					<span>{this.props.text}</span> <input type='button' value='Delete' onClick={this.props.tododelete.bind(null,this.props.index)}/>
				</div>
			)
	}
}

export default Todo;