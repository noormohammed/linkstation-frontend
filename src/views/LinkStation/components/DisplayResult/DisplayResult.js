import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
}));

/**
 * DisplayResult component for displaying results of FindLinkStation component
 *
 * @component
 * @example
 * const resultObject = {
 *  'status': 'success',
 *  'message: 'Best link station for point 20,20 is 20,20 with power 25'
 * }
 * return (
 *  <DisplayResult results={resultObject} />
 * )
 */
const DisplayResult = props => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardHeader
        title="Result"
      />
      <Divider />
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          color={(typeof props.results === 'object' && props.results.status === 'success') ? 'secondary' : 'error'}
        >
          {(typeof props.results === 'object' && props.results.message) ? props.results.message : ''}
        </Typography>
      </CardContent>
    </Card>
  );
};

DisplayResult.propTypes = {
  results: PropTypes.object.isRequired
};

export default DisplayResult;
