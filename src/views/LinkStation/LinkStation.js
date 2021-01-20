import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { FindLinkStation, DisplayResult } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

/**
 * Main Link Station Module
 *
 * @component
 * @example
 * return (<LinkStation />);
 */
const LinkStation = () => {
  const classes = useStyles();

  const [result, setResult] = useState({});

  const callbackFindLinkStation = (res) => {
    if (!res) setResult('');
    setResult(res);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={6}
          xl={4}
          xs={12}
        >
          <FindLinkStation sendResult={callbackFindLinkStation}/>
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          xl={4}
          xs={12}
        >
          <DisplayResult results={result} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LinkStation;
