import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/utills/setAuthToken";
import { logoutUser, setCurrentUser } from "./redux/actions/authActions";

import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./component/auth/protected_route";

//Page------------------------------------
import LandingPage from "./component/pages/landing_page"
import RegisterPage from "./component/pages/register_page";
import HomePage from "./component/pages/home_page/home_page";
import ExercisesPage from "./component/pages/exercises_page";
import ScoreBookPage from "./component/pages/scorebook_page";
import MemberPage from "./component/pages/member_page/member_page";
import CollectionsPage from "./component/pages/collections_page";
//----------------------------------------

import "./App.css";
import { decode } from "jsonwebtoken";
import ROLE from "./component/auth/Role";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuhenicated
  store.dispatch(setCurrentUser(decoded));

  //Check for expried token
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute
            exact
            path="/home"
            role={ROLE.STUDENT}
            component={HomePage}
          />
          <ProtectedRoute
            exact
            path="/collections"
            role={ROLE.STUDENT}
            component={CollectionsPage}
          />
          <ProtectedRoute
            exact
            path="/exercises"
            role={ROLE.STUDENT}
            component={ExercisesPage}
          />
          <ProtectedRoute
            exact
            path="/scorebook"
            role={ROLE.STUDENT}
            component={ScoreBookPage}
          />
          <ProtectedRoute
            exact
            path="/member"
            role={ROLE.STUDENT}
            component={MemberPage}
          />
          <Route
            path="/403"
            component={() => "403 YOU DON'T HAVE PERRMISSION"}
          />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
