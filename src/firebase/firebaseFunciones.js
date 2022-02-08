/* =====> REGISTRO DE NUEVO USUARIO <====== */
import { auth, createUserWithEmailAndPassword } from "./config.js";

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)