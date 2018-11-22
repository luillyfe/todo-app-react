const createStore = reducer => {
  let state,
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

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.todo.id
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

const app = (state = {}, action) => ({
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
});

const store = createStore(app);

store.subscribe(() => {
  console.log(`The new state is, ${store.getState()}`);
});

const action = {
  type: "ADD_TODO",
  id: 0,
  name: "Learn Redux",
  complete: false
};
store.dispatch(action);
