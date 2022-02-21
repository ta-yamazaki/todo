import firebaseConfig from './firebaseConfig.js'

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    browserSessionPersistence,
    connectAuthEmulator,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import store from '@/plugins/store'

const app = initializeApp(firebaseConfig); // Initialize Firebase
const auth = getAuth(app);

const hostName = document.location.hostname;
if( hostName === "localhost" ){
    //エミュレータを利用するように記述
    connectAuthEmulator(auth, 'http://localhost:9099')
}

export function login(email, password) {
    return setPersistence(auth, browserSessionPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

export function logout() {
    signOut(auth)
        .then(() => {
        })
        .catch((error) => {
            console.log(error);
        });
}

export function onAuth() {
    onAuthStateChanged(auth, (user) => {
        store.commit('onAuthStateChanged', user);
    });
}

export function passwordReset(email) {
    return sendPasswordResetEmail(auth, email);
}

export default {
    login, logout, onAuth,
    passwordReset
};
