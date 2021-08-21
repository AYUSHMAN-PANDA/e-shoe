import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "./AddIssue.css";
// import Login from "./Loginform";
// import { Link } from "react-router-dom";
import AddIssue from "./AddIssue";
import UpdateIssue from "./UpdateIssue";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const FrontPage = () => {
  const [issues, setIssues] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateIssueList, setUpdateIssueList] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const classes = useStyles();

  const getIssues = () => {
    axios
      .get("/allIssues")
      .then((res) => {
        setIssues(res.data);
        console.log(issues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteOne = (id) => {
    console.log(id);
    axios
      .delete(`/del-issue/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setUpdateIssueList(!updateIssueList);
  };
  //delete all issues
  const handleDelete = () => {
    axios
      .delete("/del-all-issues")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setUpdateIssueList(!updateIssueList);
  };

  useEffect(() => {
    getIssues();
  }, [updateIssueList]);

  return (
    <>
      <TableContainer component={Paper}>
        <h1 className="make-center">Issues</h1>
        <div className="make-center">
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="secondary"
            size="small"
          >
            <DeleteOutlineIcon />
            Delete All
          </Button>
        </div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell>Assignee(s)</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">State</TableCell>
              <TableCell align="center">Tags</TableCell>
              <TableCell align="center">Edit Issue</TableCell>
              <TableCell align="center">Delete Issue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell component="th" scope="row">
                  {row.assignees}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center">{row.tags}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setShowAdd(false);
                      setShowUpdate(true);
                      setUpdateId(row._id);
                    }}
                    variant="outlined"
                    color="primary"
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleDeleteOne(row._id);
                    }}
                    variant="outlined"
                    color="secondary"
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="make-center">
          <Paper>
            <div>{showAdd ? <AddIssue /> : ""}</div>
            <div>{showUpdate ? <UpdateIssue id={updateId} /> : ""}</div>
          </Paper>
          &nbsp; &nbsp;
          <br />
          &nbsp;
          {showUpdate ? (
            <Button
              onClick={() => {
                setShowUpdate(!showUpdate);
                setUpdateIssueList(!updateIssueList);
                setUpdateIssueList(!updateIssueList);
              }}
              variant="contained"
              color="primary"
            >
              Done
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowAdd(!showAdd);
                setShowUpdate(false);
                setUpdateIssueList(!updateIssueList);
              }}
              variant="contained"
              color="secondary"
            >
              {showAdd ? "Done" : "Add Issue"}
            </Button>
          )}
          <br />
        </div>
        <br />
      </TableContainer>
    </>
  );
};

export default FrontPage;
