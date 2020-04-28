import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import firebase from '../firebase';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userID: "",
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => { 
            // const token = result.credential.accessToken;
            // const user = result.user;

            this.setState({
                loggedIn: true,
                userID: result.user.uid,
            })
        }).then(() => {
            document.querySelector(".title").style.color = "red"
        })
    }

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

    render(){
        return (
            <header>
                <h1 className="title">Translator</h1>
                <div>
                    <NavLink to="/">Translator</NavLink>
                    <NavLink to="/saved">Saved Translations</NavLink>
                </div>

                <button onClick={this.handleLogin}>Login</button>
                <button onClick={this.handleSignout}>Logout</button>
            </header>
        );
    }
}

export default Header;