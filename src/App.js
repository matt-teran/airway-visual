//react
import { useState, useEffect, Fragment } from "react";
//mui
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
//react-globe.gl
import Globe from "react-globe.gl";
//axios
import axios from "axios";
//custom components
import Controls from "./Controls";
//assets
import earth from "./earth.jpg";
import airports from "./airports.json";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [arcInitialGap, setArcInitialGap] = useState(1);
  const [arcsData, setArcsData] = useState([]);

  const searchHandler = (airport, date, activeFlights, isDeparture) => {
    // setArcsData([
    //   {
    //     startLat: -97.5011978149414,
    //     startLng: 27.77039909362793,
    //     endLat: -95.34140014648438,
    //     endLng: 29.984399795532227,
    //     color: "blue",
    //     // label: flight.departure.iata + "=>" + flight.arrival.iata,
    //     stroke: 10,
    //   },
    // ]);
    let flights;
    const iata = isDeparture ? "dep_iata" : "arr_iata";
    axios
      .get("http://api.aviationstack.com/v1/flights", {
        params: {
          access_key: "9584c354034b2a3ac2d393611a910f35",
          [iata]: airport.iata,
          flight_status: activeFlights ? "active" : "scheduled",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        flights = res.data.data.reduce((result, flight) => {
          if (
            airports.findIndex(
              (airport) => airport.iata === flight.arrival.iata
            ) !== -1
          ) {
            result.push({
              startLat: isDeparture
                ? airport.lat
                : airports.find(
                    (airport) => airport.iata === flight.departure.iata
                  ).lat,
              startLng: isDeparture
                ? airport.lng
                : airports.find(
                    (airport) => airport.iata === flight.departure.iata
                  ).lng,
              endLat: airports.find(
                (airport) => airport.iata === flight.arrival.iata
              ).lat,
              endLng: airports.find(
                (airport) => airport.iata === flight.arrival.iata
              ).lng,
              color: "red",
              label: flight.departure.iata + "=>" + flight.arrival.iata,
              stroke: 0.5,
            });
          }
          return result;
        }, []);
        return flights;
      })
      .then((res) => {
        console.log(flights);
        setArcsData(flights);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (arcInitialGap >= 0 && arcsData.length > 0) {
      setTimeout(() => setArcInitialGap((prev) => prev - 0.005), 25);
    }
  }, [arcInitialGap, arcsData]);

  return (
    <Fragment>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controls search={searchHandler} />
        </LocalizationProvider>
      </ThemeProvider>
      <Globe
        arcsData={arcsData}
        arcColor={"color"}
        // arcStroke={"stroke"}
        // arcLabel={"label"}
        arcDashInitialGap={() => arcInitialGap}
        arcsTransitionDuration={0}
        globeImageUrl={earth}
      />
    </Fragment>
  );
}

export default App;
