import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "components/auth/slice";

const PrivateRoute = ({ component: Component, path, exact }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (
        <>{!user ? <Redirect to="/" /> : <Component {...props} />}</>
      )}
    />
  );
};

export default PrivateRoute;
