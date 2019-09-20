import * as React from "react";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { Appbar, Menu } from "@controls";

import { newGame } from "@state/actions";
import { IAppState, ScoreHistoryType } from "@models";

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
  children?: any;
  scores: ScoreHistoryType;
  newGame: () => void;
}

const Layout: React.FunctionComponent = (props: ILayoutProps) => {
  const { children, newGame, scores } = props;

  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (key: number): void => {
    if (key === 0) {
      newGame();
    }
    setMobileOpen(false);
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
