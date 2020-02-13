import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    render={() => (
      isAuthenticated === true
        ? <Component {...rest} />
        : (
          <Redirect
            to="/"
          />
        )
    )}
  />
);
export default PrivateRoute;
