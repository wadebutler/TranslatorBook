import React from 'react';

function TranslatorText() {
    return (
        <main>
            <section className="translator">
                <div className="textBox">
                    <label htmlFor="selectFrom">Original Language:
                    <select name="selectFrom" id="selectFrom">
                            <option value="English">English</option>
                        </select>
                    </label>
                    <label htmlFor="textFrom">
                        <textarea placeholder="Hello" name="textFrom" id="textFrom" cols="30" rows="10"></textarea>
                    </label>
                </div>

                <div className="textBox">
                    <label htmlFor="selectTo">Translated Language:
                    <select name="selectTo" id="selectTo">
                            <option value="French">French</option>
                        </select>
                    </label>
                    <label htmlFor="TextTo">
                        <textarea placeholder="Bonjour" name="TextTo" id="TextTo" cols="30" rows="10"></textarea>
                    </label>
                </div>
            </section>

            <div>
                <button>Translate</button>
                <button>Save</button>
            </div>  
        </main>
    );
}

export default TranslatorText;