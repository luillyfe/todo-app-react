import connect from "react-redux/es/connect/connect";
import React, {Component, Fragment} from "react";
import {handleAddGoalAction} from "./actions/Goals";
import {Notification} from "./Notification";
import List from "./List";
import {handleRemoveGoalAction} from "./actions/Goals";

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
        this.setState({notification: {show: false}});
    };

    render() {
        const {goals} = this.props;
        const {show, type, message} = this.state.notification;
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

export const ConnectedGoals = connect(state => ({goals: state.goals}))(Goals);