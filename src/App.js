import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./List";
import { Notification } from "./Notification";
import { connect } from "react-redux";
import {
  handleAddGoalAction,
  handleAddTodoAction,
  handleReceiveDataAction,
  handleRemoveGoalAction,
  handleRemoveTodoAction,
  handleToggleAction
} from "./Reducers";

class Todos extends Component {
  state = {
    notification: {
      show: false,
      message: "",
      type: "alert-success"
    }
  };

  addItem = name => {
    this.props.dispatch(handleAddTodoAction(name, this.sendNotification));
  };

  removeItem = todo => {
    this.props.dispatch(handleRemoveTodoAction(todo, this.sendNotification));
  };

  sendNotification = ({
    type = "alert-success",
    show = true,
    message = ""
  }) => {
    this.setState({
      notification: {
        type,
        show,
        message
      }
    });
  };

  toggleItem = id => {
    this.props.dispatch(handleToggleAction(id, this.sendNotification));
  };

  hideNotification = () => {
    this.setState({ notification: { show: false } });
  };

  render() {
    const { todos } = this.props;
    const { message, show, type } = this.state.notification;
    return (
      <Fragment>
        {/*TODO: if the user removes too quickly items, a notification gets *
        replace for the most current one.*/}
        <Notification
          show={show}
          type={type}
          hideNotification={this.hideNotification}
          message={message}
        />
        <List
          title="todos"
          items={todos}
          addItem={this.addItem}
          removeItem={this.removeItem}
          toggleItem={this.toggleItem}
        />
      </Fragment>
    );
  }
}

const ConnectedTodos = connect(state => ({ todos: state.todos }))(Todos);

class Goals extends Component {
  state = {
    notification: {
      show: false,
      message: "",
      type: "alert-success"
    }
  };

  addItem = name => {
    this.props.dispatch(handleAddGoalAction(name, this.sendNotification));
  };

  removeItem = goal => {
    this.props.dispatch(handleRemoveGoalAction(goal, this.sendNotification));
  };

  sendNotification = ({
    type = "alert-success",
    show = true,
    message = ""
  }) => {
    this.setState({
      notification: {
        type,
        show,
        message
      }
    });
  };

  hideNotification = () => {
    this.setState({ notification: { show: false } });
  };

  render() {
    const { goals } = this.props;
    const { show, type, message } = this.state.notification;
    return (
      <Fragment>
        {/*TODO: refactor, lift notification component app (or use portal).*/}
        <Notification
          show={show}
          type={type}
          hideNotification={this.hideNotification}
          message={message}
        />
        <List
          title="goals"
          items={goals}
          addItem={this.addItem}
          removeItem={this.removeItem}
          toggleItem={() => null}
        />
      </Fragment>
    );
  }
}

const ConnectedGoals = connect(state => ({ goals: state.goals }))(Goals);

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch(handleReceiveDataAction());
    }
  }

  render() {
    return (
      <div className="container">
        <ConnectedTodos />
        <hr />
        <ConnectedGoals />
      </div>
    );
  }
}

export default App;
