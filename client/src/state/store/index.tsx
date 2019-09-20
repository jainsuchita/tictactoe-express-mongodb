import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

// const isProduction = process.env.NODE_ENV === "production";

/**
 * Logger middleware doesn't add any extra types to dispatch, just logs actions
 * and state.
 */
function logger() {
  const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
    console.group(action.type);
    console.info("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    // @ts-ignore
    console.groupEnd(action.type);
    return result;
  };

  return loggerMiddleware;
}

export function configureStore(state = {}) {
  const middlewares = [thunkMiddleware, logger()]; // lets us return functions from action creators

  // if (!isProduction) {
  //   middlewares.push(logger());
  // }

  const store = createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
}
