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

const AddIssue = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    title: "",
    description: "",
    tags: "",
    assignees: "",
    state: "open",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const send_issue = data;
    // console.log(send_issue);
    axios
      .post("/addIssue", send_issue)
      .then((res) => console.log("sent"))
      .catch((err) => {
        console.log(err);
      });
    // console.log(JSON.stringify(data));
    setData({
      title: "",
      description: "",
      tags: "",
      assignees: "",
      state: "open",
    });
  };

  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        placeholder="Title"
        value={data.title}
        name="title"
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        placeholder="Description"
        value={data.description}
        name="description"
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        placeholder="Tags"
        value={data.tags}
        name="tags"
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        placeholder="Assignees"
        value={data.assignees}
        name="assignees"
        onChange={handleChange}
        required
      />
      <FormLabel component="legend">State</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="state"
        value={data.state}
        onChange={handleChange}
        row
        required
      >
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
        Add Issue
      </Button>
    </form>
  );
};

export default AddIssue;
