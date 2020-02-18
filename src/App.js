import React,  {Component} from 'react';
// import from 'react-dom';
import logo from './logo.svg';
import './App.css';

var todos = [];

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

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.text) return;
    
    todos.push({
      text: this.state.text
    })
    this.setState({
      text: ''
    })
    document.dispatchEvent(new Event('FETCH_TODOS'));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
                <input onChange={e => this.setState({text: e.target.value})} value={this.state.text} type="text" className="form-control" placeholder="New todo" aria-label="Recipient's username" aria-describedby="button-addon2" />
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

  componentDidMount(){
    this.fetchTodos();

    document.addEventListener('FETCH_TODOS',  (e) => {
      this.fetchTodos();
    }, false);
  }

  componentWillUnmount() {
    document.removeEventListener('FETCH_TODOS', false);
  }
  
  fetchTodos = () => {
    console.log('FETCH_TODOS');
    this.setState({
      todos: todos
    });
  }

  deleteTodo = (e, idx) => {
    todos.splice(idx, 1);
    this.fetchTodos();
  }

  render() {
    return (
      <div>
        <div className="list-group">
          {this.state.todos.map((todo, idx) => (
            <div key={idx}  className="list-group-item list-group-item-action todo-item">
              <div className="todo-item-text">{todo.text}</div>
              <button onClick={e => this.deleteTodo(e, idx)} type="button" className="btn btn-danger btn-sm" title="Delete"><i className="fas fa-trash-alt"></i></button>
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
      <TodoHeader title="TODO"></TodoHeader>
      <TodoForm></TodoForm>
      <TodoList></TodoList>
    </div>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;