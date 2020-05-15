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
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1 className="title">Translator</h1>

            {this.state.loggedIn ? <>
              <button className="log" onClick={this.handleSignout}>Logout</button>

              <div className="navMenu">
                <NavLink className="navLink" to="/">Translator</NavLink>
                <NavLink className="navLink" to="/saved">Saved Translations</NavLink>
              </div>
            </> : <>
              <button className="log" onClick={this.handleLogin}>Login</button>

              <div className="emptylink"><p>placeholder</p></div>
            </> }
          </header>
          
          <Route exact path="/"  component={() => 
            <Translator userIdProp={this.state.userID} loggedInProp={this.state.loggedIn}/> 
          }/>
          
          <Route exact path="/saved" render={() => (
            this.state.loggedIn ? (<SavedTranslations userIdProp={this.state.userID} />) : (<Redirect to="/"/>)
          )}/>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
