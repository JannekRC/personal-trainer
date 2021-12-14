import React from "react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AddCircle } from "@mui/icons-material";

function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    activity: "",
    duration: "",
    date: "",
    customer: "https://customerrest.herokuapp.com/api/customers/",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Tooltip title="Add training">
        <Button onClick={handleClickOpen}>
          <AddCircle color="success" />
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="date"
            value={training.date}
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

export default AddTraining;
