import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import fire from './config/firebase'
import SignIn from './SignIn.js';
import Home from './Home.js';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.user ? (<Home/>) : (<SignIn/>)}
      </div>
    );
  }
}

export default App;
