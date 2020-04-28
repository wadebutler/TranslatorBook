import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from './Components/Header';
import Translator from './Components/Translator';
import Footer from './Components/Footer';
import SavedTranslations from './Components/SavedTranslations';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Route exact path="/" component={Translator} />
        <Route exact path="/saved" component={SavedTranslations} />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
