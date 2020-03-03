import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

export const LinkComponent = props => {
  return <Link {...props} />;
};
export const PageLoader = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
};
