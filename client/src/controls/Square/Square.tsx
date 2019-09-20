import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: "2em" // double the size of the square's font size
    }
  })
);

const playerIcon = (player: number) => {
  // these are icon names from https://material.io/icons/
  // you can pick whichever you want, but I chose two that
  // closely resembles X and O
  switch (player) {
    case 1:
      return "clear"; // X
    case 2:
      return "panorama_fish_eye"; // O
    default:
      return "";
  }
};

interface IProps {
  player: number;
}

// the Square is just a square on the game board, it will have nothing, an X or an O depending
// on which player has marked the square
const Square: React.FunctionComponent<IProps> = ({ player }) => {
  const classes = useStyles();
  // 'player' is the player, or none, that marked this Square
  return <Icon className={classes.icon}>{playerIcon(player)}</Icon>;
};

export default Square;
