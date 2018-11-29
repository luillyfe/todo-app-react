import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {handleReceiveDataAction} from "./actions/Shared";
import {ConnectedTodos} from "./Todos";
import {ConnectedGoals} from "./Goals";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch(handleReceiveDataAction());
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <ConnectedTodos />
        <hr />
        <ConnectedGoals />
      </div>
    );
  }
}

export default App;
