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
            language: {},
        }
    }

    componentDidMount = () => {
        axios.get(languagesURL, {
            params: {
                key: apiKey,
                ui: 'en',
            }
        }).then((results) => {
            console.log(results.data.langs)
        })
    }

    render() {
        return (
            <main>
                <label htmlFor="toTranslate">Enter Text to
                    <textarea placeholder="Hello" name="toTranslate" id="toTranslate" cols="30" rows="10"></textarea>
                </label>

                <label htmlFor="selectFrom">Language:
                    <select name="selectFrom" id="selectFrom">
                        <option selected="selected">Translate to?</option>
                    </select>
                </label>

                <button>Translate</button>
            </main>
        )
    }
}

export default Translator;