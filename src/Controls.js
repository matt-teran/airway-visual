import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
  container: {
      marginTop: '2vw',
      marginLeft: '2vw',
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
            />
            <Autocomplete
              className={classes.citySelector}
              options={texasCities}
              renderInput={(params) => (
                <TextField {...params} label="Arrival City" />
              )}
            />
          </Box>

          <DatePicker
            renderInput={(params) => <TextField {...params} label="Date" />}
          />

          <FormControlLabel control={<Switch />} label="Active Flights" />
          <Button variant="contained">Search</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Controls;
