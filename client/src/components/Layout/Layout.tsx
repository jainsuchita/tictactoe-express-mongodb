import * as React from "react";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { Appbar, Menu, HistoryDialog, Table } from "@controls";

import { newGame } from "@state/actions";
import { IAppState, ScoreHistoryType } from "@models";
import Axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },

    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

interface ILayoutProps {
  children?: React.ReactNode;
  scores: ScoreHistoryType;
  newGame: () => void;
}

const Layout: React.FunctionComponent = (props: ILayoutProps) => {
  const { children, newGame, scores } = props;

  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [rows, setRows] = React.useState();
  // const [response, setResponse] = React.useState<Array<object> | null>(null);
  // const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await Axios.get("http://localhost:3000/games");
        // setResponse(res.data);
        buildDataRows(res.data);
      } catch (err) {
        // setError(err);
        console.log("error - ", err);
      }
    };
    FetchData();
  }, []);

  const buildDataRows = (data: Array<any>) => {
    const rowsArr: Array<any> = [];
    data.map((d: object) => {
      const datacell: Array<any> = [];

      Object.keys(d).map(item => {
        if (item === "gameId" || item === "winnerId") {
          datacell.push(d[item]);
        }
      });

      rowsArr.push(datacell);
    });
    const updated = rowsArr.map(arr => {
      return createData(arr[0], arr[1]);
    });

    setRows(updated);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const showGameHistoryDialog = () => {
    setDialogOpen(true);
  };

  const closeHistoryDialog = () => {
    setDialogOpen(false);
  };

  const handleMenuItemClick = (key: number): void => {
    if (key === 0) {
      newGame();
    } else if (key === 1) {
      showGameHistoryDialog();
    }
    setMobileOpen(false);
  };

  const createData = (game: number, winner: number) => {
    if (winner === 1) {
      return { game, winner: "Player1" };
    } else if (winner === 2) {
      return { game, winner: "Player2" };
    } else if (winner === 0) {
      return { game, winner: "Draw" };
    } else {
      return { game, winner: "Error" };
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Appbar onClick={handleDrawerToggle} />

      <Menu
        open={mobileOpen}
        onClose={handleDrawerToggle}
        handleMenuItemClick={handleMenuItemClick}
        scores={scores}
      />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>

      {dialogOpen && (
        <HistoryDialog open={dialogOpen} handleClose={closeHistoryDialog}>
          <Table rows={rows} />
        </HistoryDialog>
      )}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { scores } = state;

  return {
    scores
  };
};

const mapDispatchToProps = { newGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
