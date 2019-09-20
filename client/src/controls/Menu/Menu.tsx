import * as React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GameIcon from "@material-ui/icons/Games";
import NewIcon from "@material-ui/icons/FiberNew";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import classnames from "classnames";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ScoreHistoryType } from "@models";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    listItem: {
      cursor: "auto"
    }
  })
);

interface IMenuProps {
  container?: Element;
  open: boolean;
  scores: ScoreHistoryType;
  onClose: () => void;
  handleMenuItemClick: (key: number) => void;
}

const Menu: React.FunctionComponent<IMenuProps> = ({
  container,
  open,
  onClose,
  handleMenuItemClick,
  scores
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {/* <Divider /> */}
      <List>
        {["Start New Game", "Score history"].map((text, index) => (
          <React.Fragment key={index}>
            <ListItem
              className={classnames(index === 1 && classes.listItem)}
              button
              key={text}
              onClick={() => handleMenuItemClick(index)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <NewIcon /> : <GameIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>

            {index % 2 !== 0 && (
              <React.Fragment key={index}>
                <Divider />
                <List>
                  {["Player1", "Player2"].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemText primary={text} />
                      <Typography variant="body2">
                        {scores[index].score}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={open}
          onClose={onClose}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Menu;
