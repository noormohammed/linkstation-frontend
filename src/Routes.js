import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Minimal as MinimalLayout } from './layouts';

import {
  Account as AccountView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MinimalLayout}
        path="/"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
