/* eslint-disable import/no-unresolved */
/* eslint-disable indent */

// Importación de la app de firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-storage.js';

// Importación de los metodos de firebase auth
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js';

import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    getDocs,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    arrayRemove,
    arrayUnion,
    updateDoc,
    doc,
    deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js';

// La configuración de Firebase de tu aplicación web
const firebaseConfig = {
    apiKey: 'AIzaSyBvcb3grtQsKqFwIP1FWpkaCv7IeXrAE14',
    authDomain: 'glow-app-fe108.firebaseapp.com',
    projectId: 'glow-app-fe108',
    storageBucket: 'glow-app-fe108.appspot.com',
    messagingSenderId: '519645271762',
    appId: '1:519645271762:web:7e319319119d715fd53f0b',
};
// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa Firebase Auth
export const auth = getAuth(app);

// Inicializa Firebase Storage
export const storage = getStorage(app);

// inicializa google con firebase app
export const googleProvider = new GoogleAuthProvider(app);

// inicializa github con github
export const githubProvider = new GithubAuthProvider(app);

// usuario actual
export const user = () => auth.currentUser;

// inicializa cloud Firebase
export const db = getFirestore(app);

// Exportando Firebase Auth
export {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signOut,
};

export {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    getDocs,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    arrayRemove,
    arrayUnion,
    updateDoc,
    doc,
    deleteDoc,
};

export {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
};
