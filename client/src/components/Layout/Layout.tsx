import * as React from "react";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { Appbar, Menu, HistoryDialog, Table } from "@controls";

import { newGame } from "@state/actions";
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
  // scores: ScoreHistoryType;
  newGame: () => void;
}

interface IRows {
  gameId: number;
  winner: number;
}

const Layout: React.FunctionComponent = (props: ILayoutProps) => {
  const { children, newGame } = props;

  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [rows, setRows] = React.useState();
  // const [response, setResponse] = React.useState<Array<object> | null>(null);
  // const [error, setError] = React.useState<any>(null);

  // const reject = (obj: object, keys: Array<string>) => {
  //   return Object.keys(obj)
  //     .filter(k => !keys.includes(k))
  //     .map(k => Object.assign({}, { [k]: obj[k] }))
  //     .reduce((res, o) => Object.assign(res, o), {});
  // };

  const pick = (obj: object, keys: Array<string>) => {
    return keys
      .map(k => (k in obj ? { [k]: obj[k] } : {}))
      .reduce((res, o) => Object.assign(res, o), {});
  };

  const buildDataRows = (data: Array<any>) => {
    const rowsArr: Array<any> = [];
    data.map((d: object) => {
      let datacell: object;
      datacell = pick(d, ["winner", "gameId"]);
      rowsArr.push(datacell);
    });

    const updated = rowsArr.map(arr => {
      return createData(arr);
    });

    setRows(updated);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const showGameHistoryDialog = async () => {
    try {
      const res = await Axios.get("http://localhost:3000/game");
      // setResponse(res.data);
      buildDataRows(res.data);
    } catch (err) {
      // setError(err);
      console.log("error - ", err);
    }
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

  const createData = (rows: IRows) => {
    const { gameId, winner } = rows;
    if (winner === 1) {
      return { game: gameId, winner: "Player1" };
    } else if (winner === 2) {
      return { game: gameId, winner: "Player2" };
    } else if (winner === 0) {
      return { game: gameId, winner: "Draw" };
    } else {
      return { game: gameId, winner: "Error" };
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
        // scores={scores}
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

// const mapStateToProps = (state: IAppState) => {
//   const { scores } = state;

//   return {
//     scores
//   };
// };

const mapDispatchToProps = { newGame };

export default connect(
  null,
  mapDispatchToProps
)(Layout);
