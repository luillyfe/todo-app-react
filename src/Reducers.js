const generateId = () =>
  Math.random().toString(36) + new Date().getSeconds().toString(36);

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";
const RECEIVE_DATA = "RECEIVE_DATA";

export const addTodoAction = todo => {
  todo.id = generateId();
  return {
    type: ADD_TODO,
    todo
  };
};

export const removeTodoAction = id => ({
  type: REMOVE_TODO,
  id
});

export const toggleTodoAction = id => ({
  type: TOGGLE_TODO,
  id
});

export const addGoalAction = goal => {
  goal.id = generateId();
  return {
    type: ADD_GOAL,
    goal
  };
};

export const removeGoalAction = id => ({
  type: REMOVE_GOAL,
  id
});

export const receiveDataAction = (todos, goals) => ({
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
