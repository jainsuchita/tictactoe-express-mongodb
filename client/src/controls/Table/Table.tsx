import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 400
    }
  })
);

interface IProps {
  rows: Array<{ game: number; winner: string }>;
}

const SimpleTable: React.FunctionComponent<IProps> = ({ rows }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell align="right">Winner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.game}>
              <TableCell component="th" scope="row">
                {row.game}
              </TableCell>
              <TableCell align="right">{row.winner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SimpleTable;
