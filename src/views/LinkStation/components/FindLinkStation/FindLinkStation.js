import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import isJSON from 'common/helpers.js';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {},
  pull_right: {
    justifyContent: 'space-between',
  },
}));

const defaultLinkStationLocations = [
  {
    "x": 0,
    "y": 0,
    "r": 10
  },
  {
    "x": 20,
    "y": 20,
    "r": 5
  },
  {
    "x": 10,
    "y": 0,
    "r": 12
  }
];

const { REACT_APP_BACKEND_API } = process.env;

const FindLinkStation = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const inputPropsNumber = {
    min: 0,
    max: 200,
  };

  const [isSearching, setIsSearching] = useState(false);

  const [values, setValues] = useState({
    x: 0,
    y: 0,
    locations: JSON.stringify(defaultLinkStationLocations),
  });

  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all"
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleIsSearching = (showHide) => {
    // setIsSearching(!isSearching);
    setIsSearching(showHide)
  };

  const handleFindClick = async (data) => {
    handleIsSearching(true);
    const result = await postData(data);
    if (result && result.message) {
      alert(result.message);
    }
    setTimeout(() => {
      handleIsSearching(false);
    }, 1000);
  }

  const postData = async (data) => {
    const body = {
      devicePoint: {
        x: Number(data.x),
        y: Number(data.y)
      },
      linkStationPoints: JSON.parse(data.locations)
    };

    try {
      const result = await axios.post(`${REACT_APP_BACKEND_API}/linkstation/findLinkStationForDevice`, body)
      if (result.status !== 200) return false;
      return result.data;
    } catch(e) {
      console.log(e);
      return false;
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleFindClick)}
      >
        <CardHeader
          subheader="Searching the most suitable/nearest link station with maximum power for the given device location"
          title="Find Link Station"
        />
        <Divider />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Link Station Locations with Reach
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={6}
            >
              <TextField
                fullWidth
                multiline
                rows={12}
                helperText="Please specify the link station locations in JSON format"
                label="Locations & Reach"
                margin="dense"
                name="locations"
                onChange={handleChange}
                required
                value={values.locations}
                variant="outlined"
                inputRef={register({
                  required: "Link Stations locations are required",
                  validate: isJSON
                })}
                error={!!errors.locations}
                helperText={errors.locations && 'Invalid JSON format'}
              />
            </Grid>
          </Grid>
          <Divider style={{marginTop: 10, marginBottom: 10}}/>
          <Typography variant="h6" gutterBottom>
            Device Location
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="x coordinate"
                margin="dense"
                name="x"
                onChange={handleChange}
                required
                variant="outlined"
                type="number"
                value={values.x}
                inputProps={inputPropsNumber}
                inputRef={register({
                  required: "Device's 'x' coordinate is required.",
                  max: 200,
                  pattern: {
                    value: /\d+/,
                    message: "Numbers only."
                  },
                })}
                error={!!errors.x}
                helperText={errors.x && errors.x.message}
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="y coordinate"
                margin="dense"
                name="y"
                onChange={handleChange}
                required
                variant="outlined"
                type="number"
                value={values.y}
                inputProps={inputPropsNumber}
                inputRef={register({
                  required: "Device's 'y' coordinate is required.",
                  max: 200,
                  pattern: {
                    value: /\d+/,
                    message: "Numbers only."
                  },
                })}
                error={!!errors.y}
                helperText={errors.y && errors.y.message}
              />
            </Grid>
          </Grid>

          <Divider orientation="vertical" flexItem />
        </CardContent>
        <Divider />
        <CardActions className={classes.pull_right}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Find
          </Button>
          {isSearching && (
            <Typography variant="body2" gutterBottom>
              Searching ...
            </Typography>
          )}
        </CardActions>
      </form>
    </Card>
  );
};

FindLinkStation.propTypes = {
  className: PropTypes.string
};

export default FindLinkStation;
