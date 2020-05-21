import React, {Component} from 'react';
import firebase from '../firebase';
import DatabaseToElement from './DatabaseToElement'

class SavedTranslations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savedArray: []
        }
    }

    componentDidMount = () => {
        this.dataToArray();
    }

    // turns users database into an array and places it in <li> elements on the page
    dataToArray = () => {
        const array = []
        const user = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(user)

        dbRef.once('value').then((snapshot) => {
            snapshot.forEach((childSnap) => {
                const item = childSnap.val();
                item.key = childSnap.key;
                array.push(item);
            })

            this.setState({
                savedArray: array
            })
        })
    }

    removeElement = (key) => {
        const dbRef = firebase.database().ref(`${this.props.userIdProp}`).child(key);
        dbRef.remove();
        this.dataToArray();
    }

    render() {
        return (
            <section>
                <h2>Saved Translations</h2>
                <ul className="displaySaved">
                    {
                        this.state.savedArray.map((item) => {
                            return <DatabaseToElement key={item.key} item={item} removeElement={this.removeElement} />
                        })
                    }
                </ul>
            </section>
        )
    }
} 

export default SavedTranslations