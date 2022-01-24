import firebaseConfig from './firebaseConfig.js'

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import * as Firestore from 'firebase/firestore/lite';
import * as Auth from "firebase/auth";
import store from '@/plugins/store'

const app = initializeApp(firebaseConfig); // Initialize Firebase

const db = Firestore.getFirestore(app);
const auth = Auth.getAuth(app);

const hostName = document.location.hostname;
if( hostName === "localhost" ){
    //エミュレータを利用するように記述
    Firestore.connectFirestoreEmulator(db, 'localhost', 8080);
    Auth.connectAuthEmulator(auth, 'http://localhost:9099')
}

function login(email, password) {
    return Auth.setPersistence(auth, Auth.browserSessionPersistence)
        .then(() => {
            console.log("ログインしました。");
            return Auth.signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

function logout() {
    Auth.signOut(auth)
        .then(() => {
            console.log("ログアウトしました。");
        })
        .catch((error) => {
            console.log(error);
        });
}

function onAuth() {
    Auth.onAuthStateChanged(auth, (user) => {
        store.commit('onAuthStateChanged', user);
    });
}

function passwordReset(email) {
    return Auth.sendPasswordResetEmail(auth, email);
}

export default {
    db,
    login, logout, onAuth,
    passwordReset
};
