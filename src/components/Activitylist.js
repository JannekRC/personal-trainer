import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddActivity from "./AddActivity";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Activitylist() {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error(err));
  };

  const deleteActivity = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setOpen(true);
            fetchActivities();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addActivity = (activity) => {
    fetch("https://customerrest.herokuapp.com/gettrainings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(activity),
    })
      .then((response) => fetchActivities())
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "activity", sortable: true, filter: true },
    { field: "duration", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 120,
      field: "links.0.href",
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteActivity(params.value)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
       <AddActivity addActivity={addActivity} />
      <div
        className="ag-theme-material"
        style={{ marginTop: 20, height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={activities}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        message="Activity deleted successfully"
        autoHideDuration={2000}
        onClose={handleClose}
        />
    </div>
  );
}

export default Activitylist;
