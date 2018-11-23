import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./List";
import {
  addTodoAction,
  addGoalAction,
  removeGoalAction,
  removeTodoAction,
  toggleTodoAction
} from "./Reducers";

class App extends Component {
  componentDidMount() {
    this.props.store.subscribe(() => this.forceUpdate());
  };

  render() {
    const { todos, goals } = this.props.store.getState();
    return (
      <div className="container">
        <List
          title="todos"
          items={todos}
          store={this.props.store}
          addItem={addTodoAction}
          removeItem={removeTodoAction}
          toggleItem={toggleTodoAction}
        />
        <hr />
        <List
          title="goals"
          items={goals}
          store={this.props.store}
          addItem={addGoalAction}
          removeItem={removeGoalAction}
        />
      </div>
    );
  }
}

export default App;
