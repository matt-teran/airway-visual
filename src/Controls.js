//react
import { useState, useEffect, Fragment } from "react";
//axios
import axios from "axios";
//mui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";

//inputs
import Autocomplete from "@mui/material/Autocomplete";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
//date-fns
import isToday from "date-fns/isToday";
//styles
import { useTheme } from "@mui/styles/";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slide from "@mui/material/Slide";
import makeStyles from "@mui/styles/makeStyles";
import SearchIcon from "@mui/icons-material/Search";
//custom components

const useStyles = makeStyles((theme) => {
  return {
    container: {
      marginTop: "2vw",
      marginLeft: "2vw",
      width: "27vw",
      position: "fixed",
      zIndex: 1,
      [theme.breakpoints.down("sm")]: {
        width: "90vw",
        marginTop: 0,
        marginLeft: 0,
        left: "5%",
        top: "26vh",
      },
    },
    actions: {
      display: "flex",
      flexDirection: "column",
    },
    citySelector: {
      width: "12vw",
      marginLeft: 5,
      marginRight: 5,
      [theme.breakpoints.down("sm")]: {
        width: "40vw",
      },
    },
    search: {
      zIndex: 5,
      left: "43vw",
      top: "83vh",
      visibility: "hidden",
      [theme.breakpoints.down("sm")]: {
        width: "40vw",
        visibility: "visible",
      },
    },
  };
});

const Controls = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [airports, setAirports] = useState([]);
  const [depCity, setDepCity] = useState("");
  const [arrCity, setArrCity] = useState("");
  const [checked, setChecked] = useState(true);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(true);

  //update localhost to actual airport api
  useEffect(() => {
    axios.get("http://localhost:3000/airports").then((res) => {
      setAirports(res.data);
    });
  }, []);

  useEffect(() => {
    if (!isToday(date)) setChecked(false);
  }, [date]);
  
  const searchHandler = () => {
    props.search(
      airports.find((airport) => airport.iata === depCity || arrCity),
      date,
      checked,
      Boolean(depCity),
      airports
    );
    setOpen(false);
  };

  return (
    <Fragment>
      <Slide
        in={!matches ? open : true}
        direction="down"
        mountOnEnter
        unmountOnExit
      >
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
                  options={airports}
                  getOptionLabel={(airport) =>
                    airport.label + " (" + airport.iata + ")"
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Departure City" />
                  )}
                  onInputChange={(ev, value) => {
                    setDepCity(value.split(")")[0].split("(")[1]); //extracts IATA code from string
                  }}
                  disabled={Boolean(arrCity)}
                />
                <Autocomplete
                  className={classes.citySelector}
                  options={airports}
                  getOptionLabel={(airport) =>
                    airport.label + " (" + airport.iata + ")"
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Arrival City" />
                  )}
                  onInputChange={(ev, value) => {
                    setArrCity(value.split(")")[0].split("(")[1]); //extracts IATA code from string
                  }}
                  disabled={Boolean(depCity)}
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
                control={
                  <Switch
                    checked={checked}
                    onChange={(ev) => {
                      setChecked(ev.target.checked);
                    }}
                    disabled={!isToday(date)}
                  />
                }
                label="Active Flights"
              />
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  variant="contained"
                  disabled={
                    (!Boolean(depCity) && !Boolean(arrCity)) || props.loading
                  }
                  onClick={() => {
                    searchHandler();
                  }}
                >
                  Search
                </Button>
                {props.loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </CardActions>
          </CardContent>
        </Card>
      </Slide>
      <Slide in={!open} mountOnEnter unmountOnExit direction="up">
        <Fab
          className={classes.search}
          sx={{ position: "absolute" }}
          disabled={open}
          onClick={() => {
            setOpen(true);
          }}
        >
          <SearchIcon color="primary" />
        </Fab>
      </Slide>
    </Fragment>
  );
};

export default Controls;
