import firebaseConfig from './firebaseConfig.js'

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore/lite';
import {
    browserSessionPersistence,
    connectAuthEmulator,
    getAuth,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import store from '@/plugins/store'

const app = initializeApp(firebaseConfig); // Initialize Firebase

const db = getFirestore(app);
const auth = getAuth();

const hostName = document.location.hostname;
if( hostName === "localhost" ){
    //settingにエミュレータを利用するように記述
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099')
}

const login = function(email, password) {
    return setPersistence(auth, browserSessionPersistence)
        .then(() => {
            console.log("ログインしました。");
            return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

const logout = function() {
    signOut(auth)
        .then(() => {
            console.log("ログアウトしました。");
        })
        .catch((error) => {
            console.log(error);
        });
}

const onAuth = function() {
    onAuthStateChanged(auth, (user) => {
        store.commit('onAuthStateChanged', user);
    });
}

export default {
    db, login, logout, onAuth
};
