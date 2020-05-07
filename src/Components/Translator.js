import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../firebase';
// import "../styles/styles.css";

// URLS FOR YANDEX API
const translateURL = "https://translate.yandex.net/api/v1.5/tr.json/translate";
const languagesURL = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs';
const apiKey = 'trnsl.1.1.20200413T224443Z.493dc6e5d26c9b52.1719c0c35f9ae9338654d19067f66d7026c049be';

class Translator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            setLanguage: "",
            translatedText: "",
        }
    }

    // GET LANGUAGES FROM API AND PLACE THEM IN THE SELECT AS OPTIONS
    componentDidMount = () => {
        axios.get(languagesURL, {
            params: {
                key: apiKey,
                ui: 'en',
            }
        }).then((results) => {
            const select = document.getElementById("setLanguage");

            for (let key in results.data.langs) {
                if (results.data.langs.hasOwnProperty(key)) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.innerHTML = results.data.langs[key];
                    select.appendChild(option);
                }
            }
        })
    }

    // PUT THE LANGUAGE YOU WANT TO TRANSLATE TO INTO STATE
    handleLanguageSelect = (e) => {
        e.preventDefault();

        this.setState({
            setLanguage: document.getElementById("setLanguage").value
        })
    }

    // PUT TEXT FROM TEXT AREA INTO STATE
    handleTextChange = (e) => {
        e.preventDefault();

        this.setState({
            originalText: document.getElementById("translateText").value
        })
    }

    // TRANSLATE TEXT AND POPULATE IT ON SCREEN
    translate = (e) => {
        e.preventDefault();

        axios.get(translateURL, {
            params: {
                key: apiKey,
                text: this.state.originalText,
                lang: this.state.setLanguage,
            }
        }).then((results) => {
            this.setState({
                translatedText: results.data.text[0],
            })
        })

        setTimeout(() => {
            document.querySelector(".translatedText").innerHTML = this.state.translatedText
        }, 1000)
    }

    sendToFirebase = (e) => {
        e.preventDefault()
        const dbRef = firebase.database().ref(`${this.state.userID}`)
        dbRef.push({
            item: {
                original: this.state.originalText,
                translated: this.state.translatedText,
            }   
        })
    }

    render() {
        return (
            <main>
                
                <label className="visuallyHidden" htmlFor="translateText">
                    Text to Translate
                </label>
                <textarea onChange={this.handleTextChange} placeholder="Hello" name="translateText" id="translateText" cols="30" rows="10"></textarea>

                <label className="visuallyHidden" htmlFor="setLanguage">
                    Language select
                </label>
                <select onChange={this.handleLanguageSelect} name="setLanguage" id="setLanguage">
                    <option value="default">Translate to ↓</option>
                </select>

                <label className="visuallyHidden" htmlFor="translateButton">
                    translate button
                </label>
                <button name="translateButton" id="translateButton" onClick={this.translate}>Translate</button>

                <button onClick={this.sendToFirebase}>Save</button>
                

                <p className="translatedText"></p>
            </main>
        )
    }
}

export default Translator;