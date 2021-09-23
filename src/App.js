//mui
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
//react-globe.gl
import Globe from "react-globe.gl";
//custom components
import Controls from "./Controls";
//assets
import earth from "./earth.jpg";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controls />
        <Globe globeImageUrl={earth} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
