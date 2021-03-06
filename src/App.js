import React, { useState } from 'react';
import {
	makeStyles, Typography, TextField, Button, Link, Select, MenuItem
} from '@material-ui/core';

const AVERAGE_FRY_LENGTH = [
  {unit: "millimeters", length: 58.9, short: "mm"},
  {unit: "centimeters", length: 5.89, short: "cm"},
  {unit: "inches", length: 2.32, short: "in"},
  {unit: "feet", length: 0.19, short: "ft"},
  {unit: "meters", length: 0.0589, short: "m"},
  {unit: "kilometers", length: 0.0000589, short: "km"},
  {unit: "miles", length: 0.000037, short: "mi"},
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '500px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  calculateButton: {
    margin: theme.spacing()
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0
  },
}));

export default function App() {
	const classes = useStyles();

  const [distance, setDistance] = useState(0);
  const [distanceInFries, setDistanceInFries] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(0);

  const handleDistanceChange = event => {
    setDistance(event.target.value);
  };

  const handleCalculateClick = () => {
    const DIF = (distance / AVERAGE_FRY_LENGTH[selectedUnit].length).toFixed(2);
    setDistanceInFries(`${distance} ${AVERAGE_FRY_LENGTH[selectedUnit].unit} is ${DIF} McDonald's french fries`);
  };

  const handleUnitsChange = event => {
    setSelectedUnit(event.target.value);
  };

	return (
    <div className={classes.root}>
      <Typography variant="h2">How Far in Fries?</Typography>
      <div>
        <TextField value={distance} onChange={handleDistanceChange} type="number"/>
        <Select
          value={selectedUnit}
          onChange={handleUnitsChange}
        >
          {AVERAGE_FRY_LENGTH.map((afl, index) => <MenuItem value={index}>{afl.short}</MenuItem>)}
        </Select>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculateClick}
        className={classes.calculateButton}
      >
        Calculate
      </Button>
      <Typography>{distanceInFries}</Typography>
      <div className={classes.footer}>
        <Link href="http://web.mit.edu/rsi/www/2014/files/MiniSamples/Fry/frymain.pdf">
          MIT Research for average McDonald's fry length
        </Link>
      </div>
    </div>
	);
}