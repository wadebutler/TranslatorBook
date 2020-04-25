import React from 'react';
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>
            <h1>Translator</h1>
            <div>
                <NavLink to="/">Translator</NavLink>
                <NavLink to="/saved">Saved Translations</NavLink>
            </div>
        </header>
    );
}

export default Header;