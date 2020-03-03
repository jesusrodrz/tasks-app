import React from 'react';
import { withAuth } from '@8base/app-provider';
import { PageLoader } from '../../../../components/UI';

class AuthContainer extends React.Component {
  async componentDidMount() {
    const { auth } = this.props;

    await auth.authClient.authorize();
  }

  render() {
    return <PageLoader />;
  }
}

AuthContainer = withAuth(AuthContainer);

export { AuthContainer };
