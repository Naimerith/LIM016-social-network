/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable indent */
/* eslint-disable no-console */
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    googleProvider,
    githubProvider,
    signOut,
    db,
    doc,
    collection,
    addDoc,
    getDoc,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    arrayRemove,
    arrayUnion,
    updateDoc,
    deleteDoc,
} from './config.js';

/** ** Registrar un usuario ****** */
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

/** ** Inicio de sesión de un usuario registrado ****** */
export const loginApp = (email, password) => signInWithEmailAndPassword(auth, email, password);

/** ** Enviando email a usuario registrado ****** */
export const verificateEmail = () => sendEmailVerification(auth.currentUser);

/** ** Inicio de sesion con google */
export const signInGoogle = () => signInWithPopup(auth, googleProvider);

/** ** Inicio de sesión con github */
export const signInGithub = () => signInWithPopup(auth, githubProvider);

/** ** Cerrar sesión con github */
export const closeUserSession = () => signOut(auth);

/** *FUNCIONES PARA EL FIRESTORE *** */

/** ** Crear coleccion cuando se REGISTRE un usuario */
export const addUser = async (name, email, user) => {
    console.log(name, email, user);
    const docRefUser = await addDoc(collection(db, 'user'), {
        nameUser: name,
        emailUser: email,
        IdUserActive: user.uid,
    });
    console.log('Document written with ID: ', docRefUser.id);
};

/** ** Crear coleccion cuando un usuario inicie sesión con GMAIL  */
export function addUserGmail(user) {
    let nameGmail = 0;
    let photoGmail = '';
    if (user.displayName !== null && user.photoURL !== null) { // si tiene nombre y foto la obtengo
        nameGmail = user.displayName;
        photoGmail = user.photoURL;
    }
    return addDoc(collection(db, 'user'), { // este es la coleccion que voy a retornar cuando ingrese con gmail
        nameUser: nameGmail,
        emailUser: user.email,
        IdUserActive: user.uid,
        photoGmail,
    });
}

/** ** Crear colección cuando el usuario edita el perfil */
export const editProfile = async (postText, idUser) => {
    // console.log(postText, idUser)
    const docRefProfile = await addDoc(collection(db, 'editProfile'), {
        userIdent: idUser,
        publishedText: postText,
    });
    console.log('Document written with ID: ', docRefProfile.id);
};

/** ** Obtener datos de Usuario en el Perfil */
export const getDataUser = () => getDocs(collection(db, 'user'));

/** ** Obtener description del perfil del usuario cuando la edita */
export const getEditProfile = () => getDocs(collection(db, 'editProfile'));

// guardar los posts
export const addPost = async (name, postText, photoURL, idUser) => {
    console.log(name, postText, photoURL, idUser);
    try {
        const docRef = await addDoc(collection(db, 'posts'), {
            userIdent: idUser,
            userPhotoPost: photoURL,
            userWhoPublishes: name,
            publishedText: postText,
            publicationDate: new Date().toLocaleString('en-ES'),
            likesPost: [],
            comments: [],
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

// obtener un post
export const getPost = (id) => getDoc(doc(db, 'posts', id));

// Obtener los posts en tiempo real
export const realTimePosts = (callback) => {
    const colRef = collection(db, 'posts');
    const q = query(colRef, orderBy('publicationDate', 'desc'));
    onSnapshot(q, callback);
};

// Dar likes a las publicaciones
export const likes = async (id, idUserLike) => await updateDoc(doc(db, 'posts', id), {
    likesPost: arrayUnion(idUserLike),
});

export const removeLikes = async (idPost, idUserLike) => await updateDoc(doc(db, 'posts', idPost), {
    likesPost: arrayRemove(idUserLike),
});

/** ** Crear colección cuando el usuario agrega un comentario */
export const addComments = async (postText, idUser) => {
    console.log(idUser, postText);
    const docRefComent = await addDoc(collection(db, 'comments'), {
        userIdentCom: idUser,
        commentDate: new Date().toLocaleString('en-ES'),
        publishedComment: postText,
    });
    console.log('Document written with ID: ', docRefComent.id);
};

/** **Obtener comentarios */
export const getComment = (id) => getDoc(doc(db, 'comments', id));

// borrar publicaciones
export const deletePost = async (id) => await deleteDoc(doc(db, 'posts', id));

// editar publicaciones
export const editPost = (postId, newText) => {
    const colRefId = doc(db, 'posts', postId);
    return updateDoc(colRefId, {
        publishedText: newText,
        publicationDate: new Date().toLocaleString('en-ES'),
    });
};
