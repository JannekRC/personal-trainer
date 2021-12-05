import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function AddActivity(props) {
  const [open, setOpen] = React.useState(false);
  const [activity, setActivity] = React.useState({
    activity: "",
    duration: "",
    date: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addActivity(activity);
    handleClose();
  };

  const inputChanged = (event) => {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new activity
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New activity</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="activity"
            value={activity.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={activity.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="date"
            value={activity.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddActivity;
