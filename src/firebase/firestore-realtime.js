import firebaseConfig from './firebaseConfig.js'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const app = initializeApp(firebaseConfig); // Initialize Firebase

const realtime_db = getFirestore(app);

var hostName = document.location.hostname;
if( hostName === "localhost" ){
    //settingにエミュレータを利用するように記述
    connectFirestoreEmulator(realtime_db, 'localhost', 8080);
}

export default realtime_db
