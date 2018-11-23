import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./List";
import {
  createStore,
  app,
  addTodoAction,
  addGoalAction,
  removeTodoAction,
  removeGoalAction,
  toggleTodoAction
} from "./ReduxHandmade";

const generateId = () =>
  Math.random().toString(36) + new Date().getSeconds().toString(36);

const store = createStore(app);

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  addItem = item => {
    let newItem = {
        id: generateId(),
        name: item.name
      },
      action;
    if (item.label === "todos") {
      newItem = { ...newItem, complete: false };
      action = addTodoAction;
    } else if (item.label === "goals") {
      action = addGoalAction;
    }
    store.dispatch(action(newItem));
  };

  removeItem = item => {
    const action = item.label === "todos" ? removeTodoAction : removeGoalAction;
    store.dispatch(action(item.id));
  };

  handleToggle = id => {
    store.dispatch(toggleTodoAction(id));
  };

  render() {
    const { todos, goals } = store.getState();
    return (
      <div className="container">
        <List
          items={todos}
          store={store}
          addItem={this.addItem}
          removeItem={this.removeItem}
          handleToggle={this.handleToggle}
          title="todos"
        />
        <hr />
        <List
          items={goals}
          store={store}
          addItem={this.addItem}
          removeItem={this.removeItem}
          title="goals"
        />
      </div>
    );
  }
}

export default App;
