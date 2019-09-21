import {
  switchPlayer,
  movePlayer,
  winner,
  gameOver,
  saveScoreHistory
} from "@state/actions";
import { BoardType } from "@models";
import { isWinner, isDraw } from "@utils";
import axios from "axios";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = "http://localhost:3000";
/**
 * When a player plays a turn we need to mark that spot on the board.  We then need to
 * switch to the next player
 * @param {number} player The current player
 * @param {number} row The row on the board
 * @param {number} col The column on the board
 */
export const playTurn = (player: number, row: number, col: number) => (
  dispatch: any
) => {
  let nextPlayer: number = player;

  switch (player) {
    case 1:
      nextPlayer = 2;
      break;
    case 2:
      nextPlayer = 1;
      break;
    default:
      break;
  }

  dispatch(movePlayer(player, row, col));
  dispatch(switchPlayer(nextPlayer));
};

// Save it to backend
const saveGameHistory = (player: number) => {
  axios
    .post(baseURL + "/game", {
      winner: player
    })

    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

/**
 * Checks for a winner, if there is one, we dispatch three actions, one for winning the
 * game (winner) and another for gameOver and one for saving the score of the winner.
 * If there isn't a winner, we need to check to see if the game ended in a draw, if so
 * we dispatch the same two actions, but with the player being NONE (0).
 * Finally, do nothing if the above two conditions aren't met.
 * @param {number[][]} board The game board
 * @param {number} player The current player
 */
export const checkWinner = (board: BoardType, player: number) => (
  dispatch: any
): boolean => {
  // the logic to check if a player has won or the game ended in a draw are in
  // the utils/game.js file.

  // instead of returning a promise like we would if we were making an api call
  // from our operations, we just return a boolean for the game winner
  let hasWinner = true;

  if (isWinner(board, player)) {
    dispatch(winner(player));
    dispatch(gameOver());
    dispatch(saveScoreHistory(player));
    saveGameHistory(player);
  } else if (isDraw(board)) {
    dispatch(winner(0));
    dispatch(gameOver());
    saveGameHistory(0);
  } else {
    hasWinner = false;
  }

  return hasWinner;
};
