import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./List";
import { Notification } from "./Notification";
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
    this.props.store.dispatch(handleAddTodoAction(name, this.sendNotification));
  };

  removeItem = todo => {
    this.props.store.dispatch(
      handleRemoveTodoAction(todo, this.sendNotification)
    );
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
    this.props.store.dispatch(handleToggleAction(id));
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

class Goals extends Component {
  state = {
    notification: {
      show: false,
      message: "",
      type: "alert-success"
    }
  };

  addItem = name => {
    this.props.store.dispatch(handleAddGoalAction(name, this.sendNotification));
  };

  removeItem = goal => {
    this.props.store.dispatch(
      handleRemoveGoalAction(goal, this.sendNotification)
    );
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

class App extends Component {
  componentDidMount() {
    const { store } = this.props;
    store.dispatch(handleReceiveDataAction());
    this.unsubscribeStore = store.subscribe(() => this.forceUpdate());
  }

  unsubscribeStore = () => null;

  componentWillUnmount() {
    this.unsubscribeStore();
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
