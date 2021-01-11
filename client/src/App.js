import { LandingPage } from './component/landing_page'
import { RegisterPage } from './component/register_page'
import { HomePage } from './component/home_page'
import { BrowserRouter , Router, Route, Switch } from 'react-router-dom';
import {ProtectedRoute} from './component/protected_route'
import './App.css'

function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route exact path= "/" component={LandingPage}/>
        <Route exact path= "/register" component={RegisterPage}/>
        <ProtectedRoute exact path= "/home" component={HomePage}/>
        <Route path= "*" component={() => "404 NOT FOUND"} />
        
      </Switch>
    </div>
  );
}

export default App;
