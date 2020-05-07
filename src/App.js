import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { NavLink } from "react-router-dom";
import firebase from 'firebase';
import Translator from './Components/Translator';
import Footer from './Components/Footer';
import SavedTranslations from './Components/SavedTranslations';
import "./styles/styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userID: "",
    }
  }

  //  GIVE THE USER ABILITY TO SIGN INTO THE APP
  handleLogin = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({
        loggedIn: true,
        userID: result.user.uid,
      })

    })
    // .then(() => {
    //   document.querySelector(".title").style.color = "red"
    // })
  }

  // GIVE THE USER ABILITY TO SIGN OUT OF THE APP
  handleSignout = (e) => {
    e.preventDefault()

    firebase.auth().signOut().then(() => {
      this.setState({
        loggedIn: false,
        userID: "",
      })
    }).then(() => {
      document.querySelector(".title").style.color = "black"
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1 className="title">Translator</h1>

            {this.state.loggedIn ? <>
              <button onClick={this.handleSignout}>Logout</button>
              <NavLink to="/">Translator</NavLink>
              <NavLink to="/saved">Saved Translations</NavLink>
            </> : <>
              <button onClick={this.handleLogin}>Login</button>
            </> }
          </header>
          
          <Route exact path="/"  component={() => 
            <Translator userIdProp={this.state.userID} loggedInProp={this.state.loggedIn}/> 
          }/>
          
          <Route exact path="/saved" render={() => (
            this.state.loggedIn ? (<SavedTranslations/>) : (<Redirect to="/"/>)
          )}/>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
