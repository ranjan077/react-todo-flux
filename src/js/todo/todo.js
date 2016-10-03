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

	shouldComponentUpdate (nextProps, nextState) {
	    return nextState.editable !== this.state.editable;
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
		if(this.state.editable) {
			selectedTodoDom.removeClass('editable');
			this.setState({
				editable: false
			});
		}
	}

	componentDidUpdate(){
	 	if(this.state.editable) {
	 		this.refs[this.props.index + 'todo-input'].focus(); 
	 	}
    }

    save() {
    	this.props.edittodo(this);
    	this.makeReadOnly();
    }
    
	render() {
		let editSaveBtn;
		if(!this.state.editable) {
			editSaveBtn = <input type='button' value='Edit'  onClick={this.displayEditField.bind(this)}/>;
		}
		else {
			editSaveBtn = <input type='button' value='Save'  onClick={this.save.bind(this)}/>
		}
		return (
			<div className='todo'>
				<div className='todo-input-wrapper' ref={this.props.index + 'todo-input-warapper' }>
					<input className='todo-input'  ref={this.props.index + 'todo-input' } readOnly={ this.state.editable ? '' : 'readOnly' } type='text' defaultValue={this.props.text} ></input>
				</div>
				<div className='todo-actions-wrapper'>
					{editSaveBtn}
					<input type='button' value='Delete' onClick={this.props.tododelete.bind(null,this.props.index)}/>
				</div>
			</div>
		)
	}
}

export default Todo;