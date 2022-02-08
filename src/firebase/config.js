/////// ======>FIREBASE SCRIPTS<=====////////

// Importe las funciones que necesita de los SDK que necesita 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";

// TODO: Agrega SDK para los productos de Firebase que quieras usar
import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";

// La configuración de Firebase de tu aplicación web
const firebaseConfig = {
    apiKey: "AIzaSyBvcb3grtQsKqFwIP1FWpkaCv7IeXrAE14",
    authDomain: "glow-app-fe108.firebaseapp.com",
    projectId: "glow-app-fe108",
    storageBucket: "glow-app-fe108.appspot.com",
    messagingSenderId: "519645271762",
    appId: "1:519645271762:web:7e319319119d715fd53f0b"
};
// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa Firebase Auth
export const auth = getAuth(app);

export {
    getAuth,
    createUserWithEmailAndPassword
}

