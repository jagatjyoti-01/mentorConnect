import React, { useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { AuthContext } from '../../services/AuthedContext';
import AuthLayout from '../shared/AuthLayout';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path, ...rest }) => {
  const context = useContext(AuthContext)
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          {...rest}
          path={path}
          element={context.isAuthenticated ? <Component /> : <Navigate to="/login/" />}
        />
      </Route>

    </Routes>

  );
};

export default PrivateRoute;

