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

  render() {
    const { todos, goals } = this.state;
    return (
      <div className="container">
        <List items={todos} title="Todos" />
        <hr />
        <List items={goals} title="Goals" />
      </div>
    );
  }
}

export default App;
