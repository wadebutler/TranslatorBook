import React, { Component } from 'react';
import axios from 'axios';

// URLS FOR YANDEX API
const translateURL = "https://translate.yandex.net/api/v1.5/tr.json/translate";
const languagesURL = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs';
const detectURL = 'https://translate.yandex.net/api/v1.5/tr.json/detect';
const apiKey = 'trnsl.1.1.20200413T224443Z.493dc6e5d26c9b52.1719c0c35f9ae9338654d19067f66d7026c049be';

class Translator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
        }
    }

    // get languages from API and place them in the select as options
    componentDidMount = () => {
        axios.get(languagesURL, {
            params: {
                key: apiKey,
                ui: 'en',
            }
        }).then((results) => {
            // console.log(results.data.langs)
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

    translate = (e) => {
        e.preventDefault();

        axios.get(translateURL, {
            params: {

            }
        })
    }

    // put text from text area into state and await translation
    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            originalText: document.getElementById("translateText").value
        })
    }

    render() {
        return (
            <main>
                <label htmlFor="translateText">Enter Text to
                    <textarea onChange={this.handleChange} placeholder="Hello" name="translateText" id="translateText" cols="30" rows="10"></textarea>
                </label>

                <label htmlFor="translateTo">Language:
                    <select name="translateTo" id="translateTo">
                        <option value="default">Translate to ↓</option>
                    </select>
                </label>

                <button>Translate</button>
            </main>
        )
    }
}

export default Translator;