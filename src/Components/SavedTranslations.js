import React, {Component} from 'react';
import firebase from '../firebase';

class SavedTranslations extends Component {

    // turns users database into an array and places it in <li> elements on the page
    componentDidMount = (e) => {
        const array = []
        const user = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(user)

        dbRef.once('value').then((snapshot) => {
            snapshot.forEach((childSnap) => {
                const item = childSnap.val();
                item.key = childSnap.key;

                array.push(item);
            })
            const display =  document.querySelector(".displaySaved");

            const saved = Array.from({ length: array.length }).map((_, i) => {
                const el = document.createElement('li');
                // const btn = document.createElement('BUTTON');
                // btn.onclick = () => {}
                el.textContent = `original: ${array[i].original} Translation: ${array[i].translated}`;
                // el.appendChild(btn)
                return el;
            });
            display.append(...saved);
        })
    }

    render() {
        return (
            <div>
                <h1>Saved Translations</h1>
                <ul className="displaySaved"></ul>
            </div>
        )
    }
} 

export default SavedTranslations