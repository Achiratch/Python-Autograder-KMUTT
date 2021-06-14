import React from "react";
import { Redirect, Route } from "react-router-dom";
// import auth from "./auth";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, auth, role, ...rest }) => {
  const roleChecked = useSelector((state) => state.auth.user.role);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated === true) {
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
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedRoute);
