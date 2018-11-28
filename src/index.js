import React, { createContext, Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { todos, goals } from "./Reducers";

const logger = store => next => action => {
  console.group(action.type);
  console.log("The action: ", action);
  const result = next(action);
  console.log("The new state: ", store.getState());
  console.groupEnd();
  return result;
};
const store = createStore(
  combineReducers({ todos, goals }),
  applyMiddleware(thunk, logger)
);

export const Context = createContext({});

class Provider extends Component {
  render() {
    return (
      <Context.Provider value={this.props.store}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export function connect (mapStateToProps) {
  return Component => {
    class Receiver extends Component {
      componentDidMount() {
        const { subscribe } = this.props.store;
        this.unsubscribe = subscribe(() => this.forceUpdate());
      };

      componentWillUnmount() {
        this.unsubscribe();
      };

      render() {
        const { dispatch, getState } = this.props.store;
        const state = getState(mapStateToProps(getState()));
        return <Component {...state} dispatch={dispatch} />;
      }
    }

    class ConnectedComponent extends Component {
      render() {
        return (
          <Context.Consumer>
            {store => <Receiver store={store} />}
          </Context.Consumer>
        );
      }
    }

    return ConnectedComponent;
  };
};

const ConnectedApp = connect(state => ({ loading: state.loading}))(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
