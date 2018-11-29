import React, { Component } from "react";
import "./Notification.css";

export class Notification extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.show !== this.props.show) {
            setTimeout(() => {
                this.props.hideNotification();
            }, 1500);
            return true;
        }
        return false;
    };

    render() {
    const { message, show, type } = this.props;
    return (
      <div
        className={`alert ${type} fade ${show ? "show" : ""}`}
        role="alert"
      >
        {message}
      </div>
    );
  }
}
