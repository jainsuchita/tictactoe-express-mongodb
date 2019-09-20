import * as React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface IDialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: IDialogTitleProps) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

interface IProps {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

const HistoryDialog: React.FunctionComponent<IProps> = ({
  open,
  handleClose,
  children
}) => {
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="history-dialog-title"
        open={open}
      >
        <DialogTitle id="history-dialog-title" onClose={handleClose}>
          Game History
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default HistoryDialog;
