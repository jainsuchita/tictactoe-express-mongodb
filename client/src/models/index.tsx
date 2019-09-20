import {
  NEW_GAME,
  GAME_OVER,
  GAME_MOVE,
  GAME_PLAYER,
  GAME_WINNER,
  SAVE_SCORE_HISTORY
} from "@state/types";

export type BoardType = Array<Array<number>>;

export type ScoreHistoryType = Array<{ id: number; score: number }>;

export interface IPlayer {
  id: number;
  score: number;
}

interface INewGameAction {
  type: typeof NEW_GAME;
}

interface IGameOverAction {
  type: typeof GAME_OVER;
}

interface IMovePlayerAction {
  type: typeof GAME_MOVE;
  payload: { player: number; row: number; col: number };
}

interface ISwitchPlayerAction {
  type: typeof GAME_PLAYER;
  payload: number;
}

interface IWinnerAction {
  type: typeof GAME_WINNER;
  payload: number;
}

interface ISaveScoreHistory {
  type: typeof SAVE_SCORE_HISTORY;
  payload: number;
}

export type IGameActionTypes =
  | INewGameAction
  | IGameOverAction
  | IWinnerAction
  | ISwitchPlayerAction
  | IMovePlayerAction
  | ISaveScoreHistory;

export interface IBoardProps {
  dims: number;
}

export interface IAppState {
  board: BoardType;
  player: number;
  gameOver: boolean;
  winner: number;
  scores: ScoreHistoryType;
}
