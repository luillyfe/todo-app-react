import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const List = props => (<div>There you go</div>);

class App extends Component {
  state = {
      todos: [],
      goals: []
  };

  render() {
    const { todos, goals } = this.state;
    return (
      <div className="container">
          <List items={todos}></List>
          <hr />
          <List items={goals}></List>
      </div>
    );
  }
}

export default App;
