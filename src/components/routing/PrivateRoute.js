import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        switch (user) {
          case null:
            return <Redirect to={'/'} />;
          case 'loading':
            return <h3 className='ta-c mt-3'>Loading...</h3>;
          default:
            return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
