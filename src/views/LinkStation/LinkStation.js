import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { FindLinkStation } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const LinkStation = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        {/* <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile />
        </Grid> */}
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <FindLinkStation />
        </Grid>
      </Grid>
    </div>
  );
};

export default LinkStation;
