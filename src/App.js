import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./List";
import {
  addTodoAction,
  addGoalAction,
  removeGoalAction,
  removeTodoAction,
  toggleTodoAction,
  receiveDataAction
} from "./Reducers";
import { API } from "./Api";

class Todos extends Component {
  addItem = name => {
    const item = {
      complete: false,
      name
    };
    this.props.store.dispatch(addTodoAction(item));
  };

  removeItem = ({ id }) => {
    this.props.store.dispatch(removeTodoAction(id));
  };

  toggleItem = id => {
    this.props.store.dispatch(toggleTodoAction(id));
  };

  render() {
    const { todos } = this.props;
    return (
      <List
        title="todos"
        items={todos}
        addItem={this.addItem}
        removeItem={this.removeItem}
        toggleItem={this.toggleItem}
      />
    );
  }
}

class Goals extends Component {
  addItem = name => {
    const item = {
      name
    };
    this.props.store.dispatch(addGoalAction(item));
  };

  removeItem = ({ id }) => {
    this.props.store.dispatch(removeGoalAction(id));
  };

  render() {
    const { goals } = this.props;
    return (
      <List
        title="goals"
        items={goals}
        addItem={this.addItem}
        removeItem={this.removeItem}
        toggleItem={() => null}
      />
    );
  }
}

class App extends Component {
  componentDidMount() {
    const { store } = this.props;
    Promise.all([API.fetchTodos(), API.fetchGoals()])
      .then(([todos, goals]) => {
        store.dispatch(receiveDataAction(todos, goals));
      })
      .catch(console.log);

    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const { todos, goals } = this.props.store.getState();
    return (
      <div className="container">
        <Todos todos={todos} store={this.props.store} />
        <hr />
        <Goals goals={goals} store={this.props.store} />
      </div>
    );
  }
}

export default App;
