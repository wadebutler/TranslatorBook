import firebase from 'firebase';

var configuration = {
    apiKey: "AIzaSyBrjSOvhdIEn5QMk-v5UhakQ7mT1rMwmoY",
    authDomain: "translator-b1371.firebaseapp.com",
    databaseURL: "https://translator-b1371.firebaseio.com",
    projectId: "translator-b1371",
    storageBucket: "translator-b1371.appspot.com",
    messagingSenderId: "504419077955",
    appId: "1:504419077955:web:766848ae0a9602595c69f6"
};

firebase.initializeApp(configuration);

export default firebase