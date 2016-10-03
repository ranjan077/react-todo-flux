import React from 'react';
import $ from 'jquery';
import ReactDom from 'react-dom';
import Todo from './todo/todo.js';
require('./todo-container.scss');
class TodoApp extends React.Component {
	constructor() {
		super();
		this.state ={
			todos: [
				{
					id: 1,
					text: 'Buy some milks'
				},
				{
					id: 2,
					text: 'Buy some chacolates'
				}
			]
		}
	}
	addTodo(e) {
		let tdod ={} 
		tdod.text = $(this.refs.todoinput).val();
		tdod.id = Date.now();
		tdod.text = tdod.text.trim();
		if(tdod.text) {
			this.setState(function(prevState) {
				return prevState.todos.push(tdod);
			})
		}
		
	}
	editTodo(oldTodo) {
		let newTodos  = this.state.todos.map(function(todo){
			if(todo.id === oldTodo.props.index) {
				todo.text = oldTodo.refs[oldTodo.props.index + 'todo-input'].value;
			}
			return todo;
		})
		this.setState({
			todos: newTodos
		});
	}
	deleteTodo(index) {
		let newTodos = this.state.todos.filter(function(todo) {
			if (todo.id !== index) {
				return todo;
			}
		})
		this.setState({
			todos: newTodos
		});
	}
	render () {
		return (
				<div className='todo-container'>
					<input type='text' ref='todoinput'/>
					<input type='button' value='Add' onClick={this.addTodo.bind(this)} className='add-todo-btn'/>
					<div className="todos">
						{
							this.state.todos.map((todo) =>  <Todo text={todo.text} key={todo.id} index={todo.id} tododelete = {this.deleteTodo.bind(this)}
							edittodo={this.editTodo.bind(this)}/>)
						}
					</div>
				</div>
			)

	}
}
var todoAppDom = document.getElementById('todoApp');
ReactDom.render(<TodoApp/>, todoAppDom);
