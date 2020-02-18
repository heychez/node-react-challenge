import React, { Component } from 'react';
import './App.css';

function TodoHeader(props) {
  return (
    <header className="todo-header">
      <h1>{props.title}</h1>
      <hr />
    </header>
  )
}

class TodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  createTodo = (e) => {
    e.preventDefault();
    if (!this.state.text) return;

    fetch('http://localhost:3100/todos', {
      method: 'POST',
      body: JSON.stringify({
        text: this.state.text,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          text: ''
        })
        document.dispatchEvent(new Event('FETCH_TODOS'));
      }).catch(console.log)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createTodo}>
          <div className="input-group mb-3">
            <input onChange={e => this.setState({ text: e.target.value })} value={this.state.text} type="text" className="form-control" placeholder="New todo" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit" >Add</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    this.fetchTodos();

    document.addEventListener('FETCH_TODOS', (e) => {
      this.fetchTodos();
    }, false);
  }

  componentWillUnmount() {
    document.removeEventListener('FETCH_TODOS', false);
  }

  fetchTodos = () => {
    fetch('http://localhost:3100/todos')
      .then(res => res.json())
      .then(data => {
        this.setState({
          todos: data
        });
      }).catch(console.log)
  }

  deleteTodo = (e, id) => {
    fetch('http://localhost:3100/todos/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        this.fetchTodos();
      }).catch(console.log)
  }

  updateTodo = (e, id) => {
    fetch('http://localhost:3100/todos/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        text: e.target.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.fetchTodos();
      }).catch(console.log)
  }

  checkTodo = (e, id) => {
    fetch('http://localhost:3100/todos/' + id + '/check', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        this.fetchTodos();
      }).catch(console.log)
  }

  handleChange = (e, id) => {
    let todos = this.state.todos;
    let idx = todos.findIndex(todo => todo.id === id);
    if (idx === -1) return;

    todos[idx].text = e.target.value;
    this.setState({
      todos: todos
    })
  }

  handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      this.updateTodo(e, id);
    }
  }


  render() {
    return (
      <div>
        <div className="list-group">
          {this.state.todos.map((todo) => (
            <div key={todo.id} className="list-group-item list-group-item-action todo-item">
              <div className={`todo-item-text ${todo.checked ? 'done' : ''}`}>
                <input onChange={e => this.handleChange(e, todo.id)} onKeyPress={e => this.handleKeyPress(e, todo.id)} value={todo.text} type="text" className={`form-control`} placeholder="Text" />
              </div>
              <button onClick={e => this.checkTodo(e, todo.id)} type="button" className="btn btn-success btn-sm todo-action" title="Check"><i className="fas fa-check"></i></button>
              <button onClick={e => this.deleteTodo(e, todo.id)} type="button" className="btn btn-danger btn-sm todo-action" title="Delete"><i className="fas fa-trash-alt"></i></button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App container">
      <TodoHeader title="Todo List"></TodoHeader>
      <TodoForm></TodoForm>
      <TodoList></TodoList>
    </div>
  )
}

export default App;