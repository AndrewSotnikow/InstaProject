import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyAMaD8jrKECAcuAmHhKVPjhIHynOdYVII0",
        authDomain: "feedplaner.firebaseapp.com",
        databaseURL: "https://feedplaner.firebaseio.com",
        projectId: "feedplaner",
        storageBucket: "feedplaner.appspot.com",
        messagingSenderId: "767191895582",
        appId: "1:767191895582:web:3d1287fa4dbd0af7ca280f",
        measurementId: "G-5EGW039367"
}
)

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;