import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "./auth";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const roleChecked = useSelector((state) => state.auth.user.role);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          if (role !== roleChecked) {
            return (
              <Redirect
                to={{
                  pathname: "/403",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
