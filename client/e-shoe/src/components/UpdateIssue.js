import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import { RadioGroup } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from "axios";
// import "./Loginform.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const UpdateIssue = (props) => {
  const classes = useStyles();
  const [data, setData] = useState({});

  const handleChange = (e) => {
    if (e.target.value === "") {
      const del_field = e.target.name;
      delete data[del_field];
      return;
    }
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = props.id;
    const update_url = `/update-issue/${id}`;
    console.log(update_url);
    console.log(data);

    axios
      .put(`/update-issue/${id}`, data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <div className="make-center">{props.id}</div>
      <TextField
        variant="outlined"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        placeholder="Description"
        name="description"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        placeholder="Tags"
        name="tags"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        placeholder="Assignees"
        name="assignees"
        onChange={handleChange}
      />
      <FormLabel component="legend">State</FormLabel>
      <RadioGroup aria-label="gender" name="state" onChange={handleChange} row>
        {/* <div> */}
        <FormControlLabel value="open" control={<Radio />} label="Open" />
        <FormControlLabel
          value="assigned"
          control={<Radio />}
          label="Assigned"
        />
        <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
        <FormControlLabel
          value="abandoned"
          control={<Radio />}
          label="Abandoned"
        />
        {/* </div> */}
      </RadioGroup>
      <br />
      <Button type="submit" color="secondary">
        Update Issue
      </Button>
    </form>
  );
};

export default UpdateIssue;
