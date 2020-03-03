import React from 'react';
import { withAuth } from '@8base/app-provider';
import { Redirect, Route } from 'react-router-dom';
function PrivateRoute(props) {
  const {
    auth: { isAuthorized },
    children,
    ...restProps
  } = props;
  return (
    <Route
      {...restProps}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default withAuth(PrivateRoute);
