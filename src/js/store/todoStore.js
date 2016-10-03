import dispatcher from '../dispatcher/dispatcher.js'

var EventEmitter = require('events').EventEmitter;
class TodoStore extends EventEmitter {
	constructor() {
		super();
		this.todos = [
				{
					id: 1,
					text: 'Buy some milks'
				},
				{
					id: 2,
					text: 'Buy some chacolates'
				}
			];
	}
	
	getAllTodos() {
		return this.todos;
	}

	addTodo(todoText) {
		todoText = todoText.trim();
		if(todoText) {
			let todo ={}
			todo.id = Date.now();
			todo.text = todoText;
			this.todos.push(todo);
			this.emit('change');
		}
	}
	editTodo(oldTodo) {
		let newTodos  = this.todos.map(function(todo){
			if(todo.id === oldTodo.props.index) {
				todo.text = oldTodo.refs[oldTodo.props.index + 'todo-input'].value;
			}
			return todo;
		});
		this.todos = newTodos;
		this.emit('change');
	}
	deleteTodo(index) {
		let newTodos = this.todos.filter(function(todo) {
			if (todo.id !== index) {
				return todo;
			}
		});
		this.todos = newTodos;
		this.emit('change');
	}
	handleActions(action) {
		switch(action.type) {
			case 'CREATE_TODO' : this.addTodo(action.text);
			break;
			
			case'EDIT_TODO': this.editTodo(action.todo);
			break;
			
			case'DELETE_TODO': this.deleteTodo(action.index);
			break;
		}
	}
}

const totoStore = new TodoStore();
dispatcher.register(totoStore.handleActions.bind(totoStore));
export default totoStore;