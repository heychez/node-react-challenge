module.exports = function () {
    var todos = [];

    return {
        addTodo: async (todo) => {
            todo.id = todos.length;
            todos.push(todo);
            return todo;
        },
        getTodoById: async (id) => {
            return todos.find(todo => todo.id === Number(id));
        },
        updateTodoById: async (id, data) => {
            var idx = todos.findIndex(todo => todo.id === Number(id));
            if (idx === -1) throw new Error('Todo not found');

            todos[idx] = {
                ...todos[idx],
                ...data
            }
            return todos[idx];
        },
        deleteTodoById: async (id) => {
            var idx = todos.findIndex(todo => todo.id === Number(id));
            if (idx === -1) throw new Error('Todo not found');
            todos.splice(idx, 1);
        },
        getTodos: async () => {
            return todos;
        }
    };
}