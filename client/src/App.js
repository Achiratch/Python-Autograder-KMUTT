import { Provider } from "react-redux";
import store from './redux/store'

import LandingPage from "./component/landing_page";
import RegisterPage from "./component/register_page";
import HomePage from "./component/home_page";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./component/auth/protected_route";
import "./App.css";



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
