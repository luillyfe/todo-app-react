import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./List";

const generateId = () =>
  Math.random().toString(36) + new Date().getSeconds().toString(36);

class App extends Component {
  state = {
    goals: [
      {
        id: generateId(),
        name: "Learn Redux"
      },
      {
        id: generateId(),
        name: "Read 50 books this year"
      }
    ],
    todos: [
      {
        id: generateId(),
        name: "Walk the dog",
        complete: false
      },
      {
        id: generateId(),
        name: "Wash the car",
        complete: false
      },
      {
        id: generateId(),
        name: "Go to the gym",
        complete: true
      }
    ]
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

  render() {
    const { todos, goals } = this.state;
    return (
      <div className="container">
        <List
          items={todos}
          title="todos"
          addNewItem={this.addNewItem}
          removeItem={this.removeItem}
        />
        <hr />
        <List
          items={goals}
          title="goals"
          addNewItem={this.addNewItem}
          removeItem={this.removeItem}
        />
      </div>
    );
  }
}

export default App;
