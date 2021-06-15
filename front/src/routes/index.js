/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */

// React
import React from 'react';

// AuthGuard
import { AuthGuard } from '../components';

// Views
import Login from '../pages/Login';
import Dash from '../pages/Dash';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Login />
  },
  {
    path: '/dash',
    exact: true,
    component: () => (
      <AuthGuard>
        <Dash />
      </AuthGuard>
    )
  }
];

export default routes;
