import * as React from "react";
import { connect } from "react-redux";

// Styling
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";

// Local Components
import { IAppState, BoardType, ScoreHistoryType } from "@models";
import { playTurn, checkWinner } from "@state/operations";
import { newGame } from "@state/actions";
import { Board, GameOverDialog, PlayerInfo } from "@controls";

interface IProps {
  player: number;
  board: BoardType;
  gameOver: boolean;
  winner: number;
  scores: ScoreHistoryType;
  playTurn: (player: number, row: number, col: number) => void;
  checkWinner: (board: BoardType, player: number) => boolean;
  newGame: () => void;
}

interface IState {
  showDialog: boolean;
}

class Game extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // we are now keeping local state only to track whether or not the gameover dialog is open
    this.state = { showDialog: false };

    this.handleBoardOnMove = this.handleBoardOnMove.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleBoardOnMove(row: number, col: number): void {
    // when a square is clicked we want to mark that square for the current player

    const { board, player, gameOver, playTurn, checkWinner } = this.props;

    // only mark if the game is still in progress and the square is empty (none)
    // otherwise, ignore the play
    if (gameOver || board[row][col] !== 0) {
      return;
    }

    // make a play for the player
    playTurn(player, row, col);

    // we now want to know the result of a winner check so we can update the
    // state of the game locally to show a dialog of the winner
    const hasWinner = checkWinner(board, player);

    if (hasWinner) {
      this.setState({ showDialog: true });
    }
  }

  handleDialogClick(answer: boolean) {
    // we only want to start a new game if the player clicks 'yes'
    if (answer) {
      this.props.newGame();
    }

    // we always want to close the dialog
    this.setState({ showDialog: false });
  }

  handleDialogClose() {
    this.setState({ showDialog: false });
  }

  render() {
    const { showDialog } = this.state;
    const { board, player, gameOver, winner } = this.props;
    const draw = winner === 0;

    return (
      <>
        <Card>
          <PlayerInfo player={player} gameOver={gameOver} />

          <Grid container style={{ marginTop: 32 }}>
            <Grid item xs={12} sm={12} md={12}>
              <Board board={board} onMove={this.handleBoardOnMove} />
            </Grid>
          </Grid>
        </Card>
        {showDialog && (
          <GameOverDialog
            open={showDialog}
            isDraw={draw}
            player={winner}
            onClick={this.handleDialogClick}
            onClose={this.handleDialogClose}
          />
        )}
      </>
    );
  }
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 300px;

  & p {
    font-size: 18px;
  }
`;

const mapStateToProps = (state: IAppState) => {
  const { board, player, gameOver, winner, scores } = state;

  return {
    board,
    player,
    gameOver,
    winner,
    scores
  };
};

const mapDispatchToProps = { playTurn, checkWinner, newGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
