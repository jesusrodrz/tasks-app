import React, { createContext, useContext } from 'react';
import { client } from 'shared/api';
import { withAuth } from '@8base/react-sdk';
export const ClientContext = createContext();

export const ClientProvider = withAuth(({ children, auth }) => {
  return <ClientContext.Provider value={{ client, auth }}>{children}</ClientContext.Provider>;
});

// Para usar el authContext en componetes funcionales
export const useClient = () => {
  return useContext(ClientContext);
};

// Para usar el authContext en componentes de clase
export function withAuthValue(Component) {
  return function WrappedComponent(props) {
    const value = useClient();
    return <Component {...props} auth={value} />;
  };
}
