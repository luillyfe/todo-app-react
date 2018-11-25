import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./List";
import { Notification } from "./Notification";
import {
  addGoalAction,
  addTodoAction,
  receiveDataAction,
  removeGoalAction,
  removeTodoAction,
  toggleTodoAction
} from "./Reducers";
import { API } from "./Api";

class Todos extends Component {
  state = {
    notification: {
      show: false,
      message: "",
      type: "alert-success"
    }
  };

  addItem = name => {
    API.saveTodo(name)
      .then(todo => {
        this.sendNotification({
          message: `${todo.name} was added with success!`
        });
        this.props.store.dispatch(addTodoAction(todo));
      })
      .catch(error => {
        this.sendNotification({
          type: "alert-danger",
          message: `We were unable to add, ${name}`
        });
      });
  };

  removeItem = todo => {
    this.props.store.dispatch(removeTodoAction(todo.id));
    API.deleteTodo(todo.id)
      .then(() => {
        this.sendNotification({
          message: `${todo.name} was removed with success!`
        });
      })
      .catch(error => {
        this.sendNotification({
          message: `We were unable to remove, ${todo.name}!`,
          type: "alert-danger"
        });
        this.props.store.dispatch(addTodoAction(todo));
      });
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
    this.props.store.dispatch(toggleTodoAction(id));
    API.saveTodoToggle(id)
      .then(() => {
        this.sendNotification({ message: "item updated!" });
      })
      .catch(error => {
        this.sendNotification({
          type: "alert-danger",
          message: "we were unable to update this item"
        });
        this.props.store.dispatch(toggleTodoAction(id));
      });
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
    API.saveGoal(name)
      .then(goal => {
        this.sendNotification({
          message: `${goal.name} was added with success!`
        });
        this.props.store.dispatch(addGoalAction(goal));
      })
      .catch(error => {
        this.sendNotification({
          type: "alert-danger",
          message: `we were unable to add, ${name}`
        });
      });
  };

  removeItem = goal => {
    this.props.store.dispatch(removeGoalAction(goal.id));
    API.deleteTodo(goal.id)
      .then(() => {
        this.sendNotification({
          message: `${goal.name} was removed with success!`
        });
      })
      .catch(error => {
        this.sendNotification({
          type: "alert-danger",
          message: `we were unable to removed, ${goal.name}`
        });
        this.props.store.dispatch(addGoalAction(goal));
      });
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
    Promise.all([API.fetchTodos(), API.fetchGoals()])
      .then(([todos, goals]) => {
        store.dispatch(receiveDataAction(todos, goals));
      })
      .catch(console.log);

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
