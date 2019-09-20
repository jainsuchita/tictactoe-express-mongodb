import {
  NEW_GAME,
  GAME_OVER,
  GAME_MOVE,
  GAME_PLAYER,
  GAME_WINNER,
  SAVE_SCORE_HISTORY
} from "@state/types";

import { IGameActionTypes } from "@models";

export function newGame(): IGameActionTypes {
  return {
    type: NEW_GAME
  };
}

export function gameOver(): IGameActionTypes {
  return {
    type: GAME_OVER
  };
}

export function movePlayer(
  player: number,
  row: number,
  col: number
): IGameActionTypes {
  return {
    type: GAME_MOVE,
    payload: { player, row, col }
  };
}

export function switchPlayer(player: number): IGameActionTypes {
  return {
    type: GAME_PLAYER,
    payload: player
  };
}

export function winner(player: number): IGameActionTypes {
  return {
    type: GAME_WINNER,
    payload: player
  };
}

export function saveScoreHistory(player: number): IGameActionTypes {
  return {
    type: SAVE_SCORE_HISTORY,
    payload: player
  };
}
