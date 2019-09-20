import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

// Local Components
import { App } from "@components";
import { configureStore } from "@state/store";
import { newGame } from "@state/actions";

// Style
import "./index.css";

// Service Workers
import registerServiceWorker from "./registerServiceWorker";

// At a later point, we can pull the state stored in local storage (or another source)
// and use it to create the store from a previous state.
const initialState = null;
const store = configureStore(initialState || {});

if (!initialState) {
  // since we don't have any persisted state, we should start a new game when the game loads

  // our new game operation returns an action object that we can use in the
  // redux store to dispatch
  const initialBoard = newGame();

  store.dispatch(initialBoard);
}

const Root = () => (
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);

ReactDOM.render(<Root />, document.getElementById("root") as HTMLElement);

registerServiceWorker();
