import React from 'react';


function DatabaseToElement(props) {
    const {item} = props
    return (
        <li>
            <span>Original:</span> {item.original} <span>Translation:</span> {item.translated} <button onClick={() => {props.removeElement(item.key)}}>X</button>
        </li>
    )
}

export default DatabaseToElement;