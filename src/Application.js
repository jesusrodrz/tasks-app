import React from 'react';
import { AppProvider } from '@8base/react-sdk';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import AuthClient from './shared/auth';
import { hot } from 'react-hot-loader';
import { ClientProvider } from './Context';

const workspaceEndpoint = process.env.REACT_APP_WORKSPACE_ENDPOINT;

class Application extends React.PureComponent {
  onRequestSuccess = ({ operation }) => {
    const message = operation.getContext();

    if (message) {
      // eslint-disable-next-line no-console
      console.error(message);
    }
  };

  onRequestError = ({ graphQLErrors }) => {
    const hasGraphQLErrors = Array.isArray(graphQLErrors) && graphQLErrors.length > 0;

    if (hasGraphQLErrors) {
      graphQLErrors.forEach(error => {
        // eslint-disable-next-line no-console
        console.error(error.message);
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <AppProvider
          uri={workspaceEndpoint}
          authClient={AuthClient}
          onRequestSuccess={this.onRequestSuccess}
          onRequestError={this.onRequestError}
        >
          <ClientProvider>
            <Routes />
          </ClientProvider>
        </AppProvider>
      </BrowserRouter>
    );
  }
}

export default hot(module)(Application);
