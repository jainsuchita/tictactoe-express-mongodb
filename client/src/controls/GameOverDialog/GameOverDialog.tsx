import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

interface IProps {
  fullScreen: boolean;
  open: boolean;
  isDraw: boolean;
  player: number;
  onClick: (open: boolean) => void;
  onClose: (close: boolean) => void;
}

const GameoverDialog: React.FunctionComponent<IProps> = ({
  fullScreen,
  open,
  isDraw,
  player,
  onClick,
  onClose
}) => {
  const title = isDraw ? "Draw!" : `Player - ${player} wins!`;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Would you like to start a new game?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClick(false)} color="secondary">
          No
        </Button>
        <Button onClick={() => onClick(true)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withMobileDialog()(GameoverDialog);
