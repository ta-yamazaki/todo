import firebaseConfig from './firebaseConfig.js'

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {addDoc, collection, connectFirestoreEmulator, getFirestore} from 'firebase/firestore/lite';
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

export const db = getFirestore(app);
const auth = getAuth(app);

const hostName = document.location.hostname;
if( hostName === "localhost" ){
    //エミュレータを利用するように記述
    connectFirestoreEmulator(db, 'localhost', 8080);
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
            console.log("ログアウトしました。");
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

export function registerLog(log, type) {
    onAuthStateChanged(auth, () => {
        let logData = {
            createdAt: new Date(),
            type: type,
            log: log,
        };

        let logsCollection = collection(this.db, "logs");
        addDoc(logsCollection, logData)
            .then(() => {})
            .catch((e) => { console.log(e); });
    });
}

export default {
    db,
    login, logout, onAuth,
    passwordReset,
    registerLog
};
