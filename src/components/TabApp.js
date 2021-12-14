import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";

function TabApp() {
  const [value, setValue] = useState("customers");
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="customers" label="Customers" />
        <Tab value="trainings" label="Trainings" />
      </Tabs>
      {value === "customers" && (
        <div>
          <Customerlist />
        </div>
      )}
      {value === "trainings" && (
        <div>
          <Traininglist />
        </div>
      )}
    </div>
  );
}

export default TabApp;
