import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import fire from './config/firebase'
import Home from './Home.js';
import Dashboard from './dashboard/Dashboard'
import SignUp from './SignUp';
import SignIn from './SignIn.js';


class App extends Component {
render() {
    return (
    <BrowserRouter>
        <div>
          <ul className="navLinks">
            <Link to="/signin"><li>Sign in</li></Link>
            <Link to="/signup"><li>Sign up</li></Link>
            <Link to="/"><li>Home</li></Link>
            <Link to="/dashboard"><li>Dashboard</li></Link>
          </ul>

          <Switch>
              <Route path="/" exact>
                <Home/>
              </Route>  
              <Route path="/dashboard">
                <Dashboard/>
              </Route>
              <Route path="/signin">
                <SignIn/>
              </Route>
              <Route path="/signup">
                <SignUp/>
              </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
