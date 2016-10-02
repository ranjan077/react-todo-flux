import React from 'react';
import $ from 'jquery';
require('./todo.scss');
class Todo extends React.Component {
	constructor() {
		super();
		this.state = {
			editable: false
		}
	}
	displayEditField() {
		let selectedTodoDom = $(this.refs[this.props.index + 'todo-input-warapper']);
		selectedTodoDom.addClass('editable');
		this.setState({
			editable: true
		})
		
		
	}
	makeReadOnly() {
		let selectedTodoDom = $(this.refs[this.props.index + 'todo-input-warapper']);
		selectedTodoDom.removeClass('editable');
		this.setState({
			editable: false
		});
	}
	 componentDidUpdate(){
	 	if($(this.refs[this.props.index + 'todo-input-warapper']).hasClass('editable')) {
	 		this.refs[this.props.index + 'todo-input'].focus(); 
	 	}
    }
	render() {
		return (
				<div className='todo'>
					<div className='todo-input-wrapper' ref={this.props.index + 'todo-input-warapper' }>
						<input className='todo-input'  ref={this.props.index + 'todo-input' } readOnly={ this.state.editable ? '' : 'readOnly' } type='text' defaultValue={this.props.text} onBlur={this.makeReadOnly.bind(this)}></input>
					</div>
					<div className='todo-actions-wrapper'>
						<input type='button' value='Edit'  onClick={this.displayEditField.bind(this)}/>
						<input type='button' value='Delete' onClick={this.props.tododelete.bind(null,this.props.index)}/>
					</div>
				</div>
			)
	}
}

export default Todo;