import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import firebase from '../firebase';

function Header() {
    return (
        <header>
            <h1 className="title">Translator</h1>
            <div>
                <NavLink to="/">Translator</NavLink>
                <NavLink to="/saved">Saved Translations</NavLink>
            </div>
        </header>
    );
}

export default Header;