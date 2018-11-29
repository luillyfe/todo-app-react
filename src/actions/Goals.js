import {API} from "../Api";
import {generateId} from "../helpers";

export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const handleAddGoalAction = (name, sendNotification) => {
    return dispatch => {
        API.saveGoal(name)
            .then(goal => {
                sendNotification({
                    message: `${goal.name} was added with success!`
                });
                dispatch(addGoalAction(goal));
            })
            .catch(error => {
                sendNotification({
                    type: "alert-danger",
                    message: `we were unable to add, ${name}`
                });
            });
    };
};
export const addGoalAction = goal => {
    goal.id = generateId();
    return {
        type: ADD_GOAL,
        goal
    };
};
export const handleRemoveGoalAction = (goal, sendNotification) => {
    return dispatch => {
        dispatch(removeGoalAction(goal.id));
        API.deleteTodo(goal.id)
            .then(() => {
                sendNotification({
                    message: `${goal.name} was removed with success!`
                });
            })
            .catch(error => {
                sendNotification({
                    type: "alert-danger",
                    message: `we were unable to removed, ${goal.name}`
                });
                dispatch(addGoalAction(goal));
            });
    };
};
export const removeGoalAction = id => ({
    type: REMOVE_GOAL,
    id
});