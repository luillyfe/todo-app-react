const generateId = () =>
  Math.random().toString(36) + new Date().getSeconds().toString(36);

export const createStore = reducer => {
  let state = {
      todos: [
        {
          id: generateId(),
          name: "Walk the dog",
          complete: false
        },
        {
          id: generateId(),
          name: "Wash the car",
          complete: false
        },
        {
          id: generateId(),
          name: "Go to the gym",
          complete: true
        }
      ],
      goals: [
        {
          id: generateId(),
          name: "Learn Redux"
        },
        {
          id: generateId(),
          name: "Read 50 books this year"
        }
      ]
    },
    listeners = [];

  const getState = () => state;
  const subscribe = listener => {
    listeners.push(listener);
    return () => listener.filter(l => l !== listener);
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
};

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

export const addTodoAction = todo => ({
  type: ADD_TODO,
  todo
});

export const removeTodoAction = id => ({
  type: REMOVE_TODO,
  id
});

export const toggleTodoAction = id => ({
  type: TOGGLE_TODO,
  id
});

export const addGoalAction = goal => ({
  type: ADD_GOAL,
  goal
});

export const removeGoalAction = id => ({
  type: REMOVE_GOAL,
  id
});

const todos = (state = [], action) => {
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
    default:
      return state;
  }
};

const goals = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
};

export const app = (state = {}, action) => ({
  todos: todos(state.todos, action),
  goals: goals(state.goals, action)
});
