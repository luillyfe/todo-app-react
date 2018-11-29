import React, { Component, Fragment } from "react";
import {
  handleToggleAction
} from "./actions/Todos";
import { Notification } from "./Notification";
import List from "./List";
import connect from "react-redux/es/connect/connect";
import {handleAddTodoAction, handleRemoveTodoAction} from "./actions/Todos";

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

export const ConnectedTodos = connect(state => ({ todos: state.todos }))(Todos);
