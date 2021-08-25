import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { Chip } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

function Allusers() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loadUsers, setLoadUsers] = useState(false);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loadUsers]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User Name</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={user.role}
                    variant="outlined"
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={() => {
            setLoadUsers(!loadUsers);
          }}
        >
          Refresh Users List
        </Button>
        <Link to="/front" activeClassName="active">
          <Button variant="outlined" color="secondary">
            List All Issues
          </Button>
        </Link>
      </TableContainer>
    </div>
  );
}

export default Allusers;
