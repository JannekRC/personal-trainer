import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import { Delete } from "@mui/icons-material";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer deleted");
            setOpen(true);
            fetchCustomers();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchCustomers())
      .catch((err) => console.error(err));
  };

  const editCustomer = (link, updatedCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        setMsg("Customer edited");
      })
      .then((_) => {
        setOpen(true);
        fetchCustomers();
      })
      .catch((err) => console.error(err));
  };

  const addTraining = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchCustomers())
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true, width: 130 },
    { field: "lastname", sortable: true, filter: true, width: 130 },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true, width: 125 },
    { field: "city", sortable: true, filter: true, width: 120 },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true, width: 130 },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 80,
      field: "links.0.href",
      cellRendererFramework: (params) => (
        <EditCustomer editCustomer={editCustomer} row={params} />
      ),
    },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 80,
      field: "links.0.href",
      cellRendererFramework: (params) => (
        <Tooltip title="Delete">
          <Button
            size="small"
            color="error"
            onClick={() => deleteCustomer(params.value)}
          >
            <Delete />
          </Button>
        </Tooltip>
      ),
    },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 80,
      field: "links.0.href",
      cellRendererFramework: (params) => (
        <AddTraining addTraining={addTraining} />
      ),
    },
  ];

  return (
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ marginTop: 20, height: 700, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={12}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        message={msg}
        autoHideDuration={2000}
        onClose={handleClose}
      />
    </div>
  );
}

export default Customerlist;
