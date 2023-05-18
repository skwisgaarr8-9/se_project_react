import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, path, isLoggedIn }) {
  return (
    <Route path={path}>{isLoggedIn ? children : <Redirect to="/" />}</Route>
  );
}

export default ProtectedRoute;
