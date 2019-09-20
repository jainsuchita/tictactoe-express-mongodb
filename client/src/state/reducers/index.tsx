import { combineReducers } from "redux";

import {
  boardReducer,
  gameoverReducer,
  winnerReducer,
  playerReducer,
  scoreReducer
} from "./tictactoe";

const rootReducers = combineReducers({
  board: boardReducer,
  gameOver: gameoverReducer,
  winner: winnerReducer,
  player: playerReducer,
  scores: scoreReducer
});

export default rootReducers;
