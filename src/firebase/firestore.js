import firebaseConfig from './firebaseConfig.js'

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore/lite';

const app = initializeApp(firebaseConfig); // Initialize Firebase
const db = getFirestore(app);

const hostName = document.location.hostname;
if( hostName === "localhost" ){
    //エミュレータを利用するように記述
    connectFirestoreEmulator(db, 'localhost', 8080);
}

export default db;
