import {
  NEW_GAME,
  GAME_OVER,
  GAME_MOVE,
  GAME_PLAYER,
  GAME_WINNER,
  SAVE_SCORE_HISTORY
} from "../types";

import { IGameActionTypes, BoardType, ScoreHistoryType } from "@models";

const emptyBoard = () => [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const move = (board: BoardType, { player, row, col }: any) => {
  const updated = board.slice();

  updated[row][col] = player;

  return updated;
};

export const boardReducer = (
  state = emptyBoard(),
  action: IGameActionTypes
): BoardType => {
  switch (action.type) {
    case NEW_GAME:
      return emptyBoard();
    case GAME_MOVE:
      return move(state, action.payload);
    default:
      return state;
  }
};

export const playerReducer = (state = 1, action: IGameActionTypes): number => {
  // TODO: abstract out the player into an enumeration, { NONE: 0, Player1: 1, Player2: 2 }
  switch (action.type) {
    case GAME_PLAYER:
      return action.payload;
    case NEW_GAME:
      return 1;
    default:
      return state;
  }
};

export const gameoverReducer = (
  state = false,
  action: IGameActionTypes
): boolean => {
  switch (action.type) {
    case NEW_GAME:
      return false;
    case GAME_OVER:
      return true;
    case GAME_WINNER:
      return true;
    default:
      return state;
  }
};

export const winnerReducer = (state = -1, action: IGameActionTypes): number => {
  switch (action.type) {
    case GAME_WINNER:
      return action.payload;
    case NEW_GAME:
      return -1;
    default:
      return state;
  }
};

const initialScore = [
  {
    id: 1,
    score: 0
  },
  {
    id: 2,
    score: 0
  }
];

const saveScore = (state: ScoreHistoryType, player: number) => {
  const updated = state.slice();
  const newScore = updated.map(item => {
    if (item.id === player) {
      item.score++;
    }
    return item;
  });

  return newScore;
};

export const scoreReducer = (
  state = initialScore,
  action: IGameActionTypes
): ScoreHistoryType => {
  switch (action.type) {
    case SAVE_SCORE_HISTORY:
      return saveScore(state, action.payload);

    default:
      return state;
  }
};
