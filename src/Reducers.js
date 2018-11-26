import { API } from "./Api";

const generateId = () =>
  Math.random().toString(36) + new Date().getSeconds().toString(36);

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";
const RECEIVE_DATA = "RECEIVE_DATA";

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

export const handleToggleAction = (id, sendNotification) => {
  return dispatch => {
    dispatch(toggleTodoAction(id));
    API.saveTodoToggle(id)
      .then(() => {
        sendNotification({ message: "item updated!" });
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

export const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.id
            ? Object.assign({}, todo, { complete: !todo.complete })
            : todo
      );
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
};

export const goals = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    case RECEIVE_DATA:
      return action.goals;
    default:
      return state;
  }
};
