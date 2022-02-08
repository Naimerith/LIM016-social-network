/* =====> REGISTRO DE NUEVO USUARIO <====== */
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./config.js";

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginApp = (email, password) => signInWithEmailAndPassword(auth,email,password);