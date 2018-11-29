import {API} from "../Api";

export const RECEIVE_DATA = "RECEIVE_DATA";
export const handleReceiveDataAction = () => {
    return dispatch => {
        Promise.all([API.fetchTodos(), API.fetchGoals()])
            .then(([todos, goals]) => {
                dispatch(receiveDataAction(todos, goals));
            })
            .catch(console.log);
    };
};
const receiveDataAction = (todos, goals) => ({
    type: RECEIVE_DATA,
    todos,
    goals
});