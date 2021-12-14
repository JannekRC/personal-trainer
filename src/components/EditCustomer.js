import React from "react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Edit } from "@mui/icons-material";

function EditCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.row.data.firstname,
      lastname: props.row.data.lastname,
      streetaddress: props.row.data.streetaddress,
      postcode: props.row.data.postcode,
      city: props.row.data.city,
      email: props.row.data.email,
      phone: props.row.data.phone,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.editCustomer(props.row.value, customer);
    handleClose();
  };

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Tooltip title="Edit">
        <Button size="small" onClick={handleClickOpen}>
          <Edit />
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            label="Firstname"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            label="Lastname"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            label="Street address"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            label="Post code"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={inputChanged}
            label="City"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            label="Phone"
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

export default EditCustomer;
