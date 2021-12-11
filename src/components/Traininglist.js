import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { format, formatDistance, formatRelative, subDays, formatISO } from "date-fns";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setOpen(true);
            fetchTrainings();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/gettrainings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((response) => fetchTrainings())
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "activity", sortable: true, filter: true },
    {
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return format(new Date(params.value), "dd.MM.y HH:mm");
      }
    },
    { field: "duration", sortable: true, filter: true },
    {
      field: "customer",
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return (params.value).firstname + " " + (params.value).lastname;
      }
    },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 120,
      field: "id",
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteTraining(params.value)}
        >
          Delete
        </Button>
      )
    },
  ];

  return (
    <div>
      {/* <AddTraining addTraining={addTraining} /> */}
      <div
        className="ag-theme-material"
        style={{ marginTop: 20, height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        message="Training deleted successfully"
        autoHideDuration={2000}
        onClose={handleClose}
      />
    </div>
  );
}

export default Traininglist;
