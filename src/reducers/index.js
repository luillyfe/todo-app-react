import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {todos} from "./Todos";
import {goals} from "./Goals";

const logger = store => next => action => {
    console.group(action.type);
    console.log("The action: ", action);
    const result = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return result;
};
export const store = createStore(
    combineReducers({todos, goals}),
    applyMiddleware(thunk, logger)
);