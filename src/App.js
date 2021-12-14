import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TabApp from "./components/TabApp";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal trainer</Typography>
        </Toolbar>
      </AppBar>
      <TabApp />
    </div>
  );
}

export default App;
