import dispatcher from '../dispatcher/dispatcher.js';
let actions = {
	createTodo: function(text) {
		let action = {
			type:'CREATE_TODO',
			text: text
		}
		dispatcher.dispatch(action);
	},
	editTodo: function(todo) {
		let action = {
			type:'EDIT_TODO',
			todo: todo
		}
		dispatcher.dispatch(action);
	},
	deleteTodo: function(index)  {
		let action = {
			type:'DELETE_TODO',
			index: index
		}
		dispatcher.dispatch(action);
	}
}

export default actions;