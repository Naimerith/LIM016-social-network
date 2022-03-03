/* eslint-disable indent */
/* eslint-disable no-console */
import {
    closeUserSession, getDataUser, editProfile, getEditProfile,
} from '../firebase/firebaseFunciones.js';
import { user } from '../firebase/config.js';
import { templateFooter } from './footer.js';
import { templateHeader } from './header.js';

export const profile = () => {
    const templateprofile = `<div class="userProfile">
        <form class="form-imgProfile"
        <label class="btn-file">
        <!--input type="file" name="uploadFile" id="uploadFile"-->
        <img class="perfil" src="">
        <!--button id="btn-savePhoto" class="btn_register">Agregar</button--> 
        </label>
        <a href="#/profile">
        </a>
        </form>
        <div class="descriptionPerfil">
            <p class="nameRegister"></p>
            <p class="emailRegister"></p>
            <p class="presentacion"> ✯ Presentación:</p>
            <p id="insert_description" class="description">➤ Descripción</p>
        </div>
        </div>
        <button type="submit" class="btn-editProfile" id="btn-editProfile">
            Editar perfil
        </button>
        <h1 class="title-profile">
            Mis publicaciones
        </h1>
        <div class="user_posts">
        
        </div>
        
        <!--Este es el modal para editar Perfil-->
        <div class="modal-containerEdit" style="display: none">
        <div class="modal-editProfile">
            <input id="description" class="form-description" name="description" type="text" placeholder="Describete brevemente..."/> 
            <button id="btn-saveChanges" class="btn_register">Guardar Cambios</button>
        </div>
    </div>`;

    const profilePage = document.createElement('div');
    profilePage.classList.add('article-home');
    profilePage.innerHTML = templateHeader + templateprofile + templateFooter;

    /** **********Insertar nombre de usuario************* */
    const loginUsername = profilePage.querySelector('.nameRegister');
    const photoUsername = profilePage.querySelector('.perfil');
    const emailUsername = profilePage.querySelector('.emailRegister');
    getDataUser()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (user().uid === doc.data().IdUserActive) {
                    loginUsername.textContent = doc.data().nameUser;
                    emailUsername.textContent = doc.data().emailUser;
                    photoUsername.src = doc.data().photoGmail;
                }
            });
        });

    /** **********Insertar descripcion en el perfil************* */
    const descriptionProfile = profilePage.querySelector('#insert_description');
    getEditProfile()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                descriptionProfile.textContent = doc.data().publishedText;
            });
        });

    /** **********Boton que abre modal para editar perfil************* */
    const botonEditProfile = profilePage.querySelector('#btn-editProfile');
    botonEditProfile.addEventListener('click', () => {
        const modalEditProfile = document.querySelector('.modal-containerEdit');
        modalEditProfile.style.display = 'inline';
    });

    /** **********Evento del teclado para llenar Input********* */
    const eventFillInput = profilePage.querySelector('.modal-containerEdit');
    eventFillInput.addEventListener('keyup', () => {
        const inputDescription = profilePage.querySelector('#description'); // este es input del formulario
        const obtenerValue = inputDescription.value; // aqui selecciono el valor del input
        const insertDescription = profilePage.querySelector('#insert_description'); // este es el espacio donde imprimire en el perfil
        insertDescription.innerHTML = obtenerValue; // aqui inserto en el perfil
    });

    /** **********Boton que guarda los cambios y vuelve al perfil********* */
    const botonSaveChanges = profilePage.querySelector('#btn-saveChanges');
    botonSaveChanges.addEventListener('click', () => {
        const modalChangesSaved = document.querySelector('.modal-containerEdit');
        modalChangesSaved.style.display = 'none';
        const contentDescription = document.querySelector('#description').value;
        // console.log(contentDescription);
        editProfile(contentDescription, user().displayName, user().uid)
            .then(() => {
                console.log('todo bien');
            })
            .catch((error) => {
                console.log(error, 'todo mal');
            });
    });

    /** **********Cerrar sesión Usuario************* */
    const logOutProfile = profilePage.querySelector('#logOut');
    logOutProfile.addEventListener('click', () => {
        closeUserSession()
            .then(() => {
                console.log('El usuario ha cerrado sesión');
                window.location.hash = '#/';
            })
            .catch((error) => {
                console.log(error, 'No se pudo cerrar la sesión');
            });
    });

    // mostrar las publicaciones
    /* const publishProfile = profilePage.querySelector('.user_posts');
    realTimePosts((querySnapshot) => {
        publishProfile.innerHTML = '';
        querySnapshot.forEach((doc) => {
            if (user().uid === doc.data().IdUserActive) {
                const fotoUser = doc.data().userPhotoPost;
                const nombreUser = doc.data().userWhoPublishes;
                const fechaPost = doc.data().publicationDate;
                const textoPost = doc.data().publishedText;
                const idUsuario = user().uid;
                const cuentaLike = doc.data().likesPost;
                const idDocumento = doc.id;
                const btnHeart = (cuentaLike.indexOf(idUsuario) !== -1) ? 'painted' : '';
                templatePost(fotoUser, nombreUser, fechaPost, textoPost, idDocumento, idUsuario,
                    btnHeart, cuentaLike.length);
            } else {
                console.log('fallooooo');
            }
        });
    }); */
    // console.log(realTimePosts)

    return profilePage;
};
