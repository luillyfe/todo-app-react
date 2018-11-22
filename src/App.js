import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./List";
import { createStore, app } from "./ReduxHandmade";

const generateId = () =>
  Math.random().toString(36) + new Date().getSeconds().toString(36);

const store = createStore(app);

class App extends Component {
  state = {
    todos: [],
    goals: []
  };

  addNewItem = item => {
    let newItem = {
      id: generateId(),
      name: item.name
    };
    if (item.label === "todos") {
      newItem = { ...newItem, complete: false };
    }
    this.setState(prevState => ({
      ...prevState,
      [item.label]: prevState[item.label].concat([newItem])
    }));
  };

  removeItem = item => {
    this.setState(prevState => ({
      ...prevState,
      [item.label]: prevState[item.label].filter(todo => todo.id !== item.id)
    }));
  };

  handleToggle = id => {
    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.map(
        todo => (todo.id === id ? { ...todo, complete: !todo.complete } : todo)
      )
    }));
  };

  render() {
    const { todos, goals } = store.getState();
    return (
      <div className="container">
        <List items={todos} title="todos" />
        <hr />
        <List items={goals} title="goals" />
      </div>
    );
  }
}

export default App;
