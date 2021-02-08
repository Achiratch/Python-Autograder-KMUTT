import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/utills/setAuthToken";
import { setCurrentUser } from "./redux/actions/authActions";

import LandingPage from "./component/landing_page";
import RegisterPage from "./component/register_page";
import HomePage from "./component/home_page";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./component/auth/protected_route";

import "./App.css";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuhenicated
  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/home" component={HomePage} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
