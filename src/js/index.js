import React from 'react';
import $ from 'jquery';
import ReactDom from 'react-dom';
import Todo from './todo/todo.js';
import TodoStore from './store/todoStore.js';
import actions from './actions/todoActions.js';
require('./todo-container.scss');
class TodoApp extends React.Component {
	constructor() {
		super();
		this.state ={
			todos: TodoStore.getAllTodos()
		}
	}
	addTodo(e) {
		let text = $(this.refs.todoinput).val();
		actions.createTodo(text);
	}
	editTodo(oldTodo) {
		actions.editTodo(oldTodo);
	}
	deleteTodo(index) {
		actions.deleteTodo(index);
	}
	componentWillMount() {
		TodoStore.on('change', this.getAllTodos.bind(this))
	}
	getAllTodos() {
		this.setState({
			todos: TodoStore.getAllTodos()
		});
	}
	componentWillUnmount () {
		TodoStore.removeListener('change', this.getAllTodos);
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
