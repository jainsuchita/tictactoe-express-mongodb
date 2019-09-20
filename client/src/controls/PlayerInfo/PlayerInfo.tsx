import * as React from "react";

import Typography from "@material-ui/core/Typography";

interface IProps {
  player: number;
  gameOver: boolean;
}

const PlayerInfo: React.FunctionComponent<IProps> = ({ player, gameOver }) => {
  const showPlayer: string = player === 1 ? "X" : "O";
  return (
    <Typography variant="h4">
      {gameOver && "Gameover!"}
      {!gameOver && `Next Turn: ${showPlayer}`}
    </Typography>
  );
};

export default PlayerInfo;
