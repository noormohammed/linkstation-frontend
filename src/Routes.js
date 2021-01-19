import React from 'react';
import { Switch } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Minimal as MinimalLayout } from './layouts';

import {
  LinkStation as LinkStationView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={LinkStationView}
        exact
        layout={MinimalLayout}
        path="/"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
      />
    </Switch>
  );
};

export default Routes;
