import React from 'react';
import remove from './DeleteElement';

function DatabaseToElement(key, original, translated) {
    return (
        <li key={key}>
            <span>Original:</span> {original} <span>Translation:</span> {translated} <button onClick={remove}>X</button>
        </li>
    )
}

export default DatabaseToElement;