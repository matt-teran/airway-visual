//react
import { useState, useEffect } from "react";
//mui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
//inputs
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
//date-fns
import isToday from "date-fns/isToday";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
  container: {
    marginTop: "2vw",
    marginLeft: "2vw",
    width: "27vw",
    position: "fixed",
    zIndex: 1,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
  },
  citySelector: {
    width: "12vw",
    marginLeft: 5,
    marginRight: 5,
  },
});

const Controls = () => {
  const classes = useStyles();
  const [depCity, setDepCity] = useState("");
  const [arrCity, setArrCity] = useState("");
  const [checked, setChecked] = useState(true);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!isToday(date)) setChecked(false);
  }, [date]);

  const texasCities = [
    { label: "Corpus Christi" },
    { label: "Houston" },
    { label: "San Antonio" },
    { label: "Austin" },
    { label: "Dallas" },
    { label: "McAllen" },
    { label: "Laredo" },
    { label: "Harlingen" },
    { label: "Brownsville" },
  ];

  return (
    <Card className={classes.container}>
      <CardHeader
        sx={{ paddingBottom: 0 }}
        titleTypographyProps={{ align: "center", variant: "h6" }}
        title="Options"
        subheader="Select Departure or Arrival"
        subheaderTypographyProps={{ align: "center", variant: "overline" }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <CardActions className={classes.actions}>
          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Autocomplete
              className={classes.citySelector}
              options={texasCities}
              renderInput={(params) => (
                <TextField {...params} label="Departure City" />
              )}
              onInputChange={(ev, value) => {
                setDepCity(value);
              }}
              disabled={arrCity !== ""}
            />
            <Autocomplete
              className={classes.citySelector}
              options={texasCities}
              renderInput={(params) => (
                <TextField {...params} label="Arrival City" />
              )}
              onInputChange={(ev, value) => {
                setArrCity(value);
              }}
              disabled={depCity !== ""}
            />
          </Box>

          <DatePicker
            onChange={(value) => {
              setDate(value);
            }}
            renderInput={(params) => <TextField {...params} label="Date" />}
            value={date}
          />

          <FormControlLabel
            control={<Switch checked={checked} onChange={ev => {setChecked(ev.target.checked)}} disabled={!isToday(date)} />}
            label="Active Flights"
          />
          <Button
            variant="contained"
            onClick={() => {
              console.log(date);
            }}
          >
            Search
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Controls;
