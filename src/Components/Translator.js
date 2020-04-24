import React, { Component } from 'react';
import axios from 'axios';

// URLS FOR YANDEX API
const translateURL = "https://translate.yandex.net/api/v1.5/tr.json/translate";
const languagesURL = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs';
const apiKey = 'trnsl.1.1.20200413T224443Z.493dc6e5d26c9b52.1719c0c35f9ae9338654d19067f66d7026c049be';

class Translator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            translateTo: "",
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
            const select = document.getElementById("translateTo");

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
            translateTo: document.getElementById("translateTo").value
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
                lang: this.state.translateTo,
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

    render() {
        return (
            <main>
                <label htmlFor="translateText">Enter Text to
                    <textarea onChange={this.handleTextChange} placeholder="Hello" name="translateText" id="translateText" cols="30" rows="10"></textarea>
                </label>

                <label htmlFor="translateTo">Language:
                    <select onChange={this.handleLanguageSelect} name="translateTo" id="translateTo">
                        <option value="default">Translate to ↓</option>
                    </select>
                </label>

                <button onClick={this.translate}>Translate</button>

                <p className="translatedText"></p>
            </main>
        )
    }
}

export default Translator;