import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

/* Import Route Components */
import { Home } from './home';
import App from './App';
import { AuthCallback } from './auth';
import PrivateRoute from '../shared/components/PrivateRoute';
import { withAuth } from '@8base/react-sdk';

function Router(props) {
  return (
    <Switch>
      <Route path="/auth" component={AuthCallback} />
      <PrivateRoute exact path="/app">
        <App />
      </PrivateRoute>
      <Route exact path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default withAuth(Router);
