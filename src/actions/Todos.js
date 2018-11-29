import {API} from "../Api";
import {generateId} from "../helpers";

export const REMOVE_TODO = "REMOVE_TODO";
export const ADD_TODO = "ADD_TODO";
export const handleAddTodoAction = (name, sendNotification) => {
    return dispatch => {
        API.saveTodo(name)
            .then(todo => {
                sendNotification({
                    message: `${todo.name} was added with success!`
                });
                dispatch(addTodoAction(todo));
            })
            .catch(error => {
                sendNotification({
                    type: "alert-danger",
                    message: `We were unable to add, ${name}`
                });
            });
    };
};
export const addTodoAction = todo => {
    todo.id = generateId();
    return {
        type: ADD_TODO,
        todo
    };
};
export const handleRemoveTodoAction = (todo, sendNotification) => {
    return dispatch => {
        dispatch(removeTodoAction(todo.id));
        API.deleteTodo(todo.id)
            .then(() => {
                sendNotification({
                    message: `${todo.name} was removed with success!`
                });
            })
            .catch(error => {
                sendNotification({
                    message: `We were unable to remove, ${todo.name}!`,
                    type: "alert-danger"
                });
                dispatch(addTodoAction(todo));
            });
    };
};
export const removeTodoAction = id => ({
    type: REMOVE_TODO,
    id
});
export const TOGGLE_TODO = "TOGGLE_TODO";
export const handleToggleAction = (id, sendNotification) => {
    return dispatch => {
        dispatch(toggleTodoAction(id));
        API.saveTodoToggle(id)
            .then(() => {
                sendNotification({message: "item updated!"});
            })
            .catch(error => {
                sendNotification({
                    type: "alert-danger",
                    message: "we were unable to update this item"
                });
                dispatch(toggleTodoAction(id));
            });
    };
};
export const toggleTodoAction = id => ({
    type: TOGGLE_TODO,
    id
});