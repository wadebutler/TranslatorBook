import React from 'react';

function Translator() {
    return (
        <main>
            <label htmlFor="selectFrom">Language:
            <select name="selectFrom" id="selectFrom">
                    <option selected="selected">Translate to?</option>
                    <option value="English">English</option>
                </select>
            </label>
            <label htmlFor="">
                <textarea placeholder="Hello" name="textFrom" id="textFrom" cols="30" rows="10"></textarea>
            </label>

            <button>Translate</button>
        </main>
    );
}

export default Translator;