/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable indent */
import {
    closeUserSession,
    addPost,
    realTimePosts,
    likes,
    removeLikes,
    getDataUser,
    addComments,
    deletePost,
    getPost,
    editPost,
} from '../firebase/firebaseFunciones.js';

import { user } from '../firebase/config.js';
import { templateFooter } from './footer.js';
import { templateHeader } from './header.js';

export const home = () => {
    const templateHome = `
    <section class="homePage">
    <div class="fotoPerfil">
    <img src="" alt="foto" id="photoURL">
    <h5 class="userName" id="userName"></h5>
    </div>
    <div class="insertarPublicacion">
        <textarea id="insertarPublicacion" class="inputInsertarPublicacion" name="insertarPublicacion" type="text" placeholder="¿Que quieres compartir?"></textarea><br>
        <button type="submit" class="btn-publicar" id="btn-publicar">
            Publicar
        </button>
    </div>
    </section>
    <section id="insertPost">
    </section>`;

    const homePage = document.createElement('article');
    homePage.classList.add('article-home');
    homePage.innerHTML = templateHeader + templateHome + templateFooter;

    function templatePost(photoUser, nameUser, datePost, postUser,
        idDoc, lengthLike, identUsuario, btnHeart, idUsuario) {
        const publish = homePage.querySelector('#insertPost');
        publish.innerHTML
            += `<div class="container_post">
        <div class="header_post">
            <aside class="title_post">
                <h1 class="title">${nameUser} </h1>
                <h4 class="date_hour">${datePost}</h4>
            </aside>
            <aside class="photo_perfil">
                <img class="photo_public" src="${photoUser}" alt="foto">
            </aside>
        </div>
        <div class="content_post">
            <textarea id="publicacion-${idDoc}" class= "publicacion" readonly>${postUser}</textarea>
            <button id="editar-${idDoc}" class="editar" data-edicion="${idDoc}">Guardar</button>
        </div>
        <div class="iconos">
            <aside class="icons_iteration">
                <img data-like="${idDoc}" id='btn_give_like' class="${btnHeart}"  src="./img/heart.png">
                <p class="counterlike">${lengthLike}</p>
                <img data-open="${idDoc}" class='icono-coment' id='icono-coment' src="./img/comentar.png" alt="coment">

            </aside>
            <aside class="icons_iteration">
                <img data-edit="${idDoc}" style="${idUsuario === identUsuario ? 'display: block;' : 'display: none;'}" class="editBtn" src="./img/editar.png" alt="edit">
                <img data-post="${idDoc}" style="${idUsuario === identUsuario ? 'display: block;' : 'display: none;'}" class="deleteBtn" src="./img/borrar.png" alt="delete" >
            </aside>
        </div>
        <div id="openComment" class="coment-${idDoc}">
            <p id='name_user_coment-${idDoc}' class='name_user_coment'></p>
            <p class='insert_coment_user-${idDoc}'></p>
            <input  id="insert_coment-${idDoc}" class="insert_coment" name="coment" type="text" placeholder="Añadir un comentario..."/>
            <button data-coment="${idDoc}" type="submit" class="btn-comentar" id="btn-comentar">
                Publicar
            </button>
        </div>
    </div>`;
        return publish;
    }

    /** **********Insertar nombre de usuario y Foto************* */
    const loginUsername = homePage.querySelector('#userName');
    const photoUsername = homePage.querySelector('#photoURL');
    getDataUser()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (user().uid === doc.data().IdUserActive) {
                    loginUsername.textContent = doc.data().nameUser;
                    photoUsername.src = doc.data().photoGmail;
                }
            });
        });

    /** **********botón de publicar*********** */
    const publishButton = homePage.querySelector('#btn-publicar');
    publishButton.addEventListener('click', () => {
        const contentPost = document.querySelector('#insertarPublicacion');
        if (contentPost.value !== '') {
            addPost(user().displayName, contentPost.value, user().photoURL, user().uid);
        }
        contentPost.value = '';
    });

    /** ********** mostrar las publicaciones *********** */
    const publish = homePage.querySelector('#insertPost');
    realTimePosts((querySnapshot) => {
        publish.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const fotoUser = doc.data().userPhotoPost;
            const nombreUser = doc.data().userWhoPublishes;
            const fechaPost = doc.data().publicationDate;
            const textoPost = doc.data().publishedText;
            const idUsuario = user().uid;
            const cuentaLike = doc.data().likesPost;
            const lengthLike = cuentaLike.length;
            const idDocumento = doc.id;
            const identUsuario = doc.data().userIdent;

            const btnHeart = (cuentaLike.indexOf(idUsuario) !== -1) ? 'paint' : 'mark_like';

            templatePost(fotoUser, nombreUser, fechaPost, textoPost,
                idDocumento, lengthLike, identUsuario, btnHeart, idUsuario);

            /** **********eliminar posts*********** */
            const btnDelete = homePage.querySelectorAll('.deleteBtn');
            btnDelete.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const confirmar = window.confirm('¿Estás seguro de que deseas borrar este post?');
                    if (confirmar) {
                        deletePost(e.target.dataset.post);
                    }
                });
            });
            /** **********likes a las publicaciones ************* */
            const btnGiveLike = homePage.querySelectorAll('#btn_give_like');
            btnGiveLike.forEach((like) => {
                like.addEventListener('click', (e) => {
                    const idPost = e.target.dataset.like;
                    if (e.target.classList.contains('paint')) {
                        removeLikes(idPost, idUsuario).FieldValue;
                    } else {
                        likes(idPost, idUsuario).FieldValue;
                    }
                });
            });
            /** **********Insertar comentario a las publicaciones ************* */
            /** **********Boton que abre input para insertar comentario************* */
            const botonIconoComent = homePage.querySelectorAll('#icono-coment');
            botonIconoComent.forEach((open) => {
                open.addEventListener('click', (e) => {
                    const idOpen = e.target.dataset.open;
                    const addComment = homePage.querySelector(`.coment-${idOpen}`);
                    addComment.style.display = 'inline';
                });
            });

            /* ***********Comentarios************* */
            const botonInsertComent = homePage.querySelectorAll('#btn-comentar'); // icono de comentar
            botonInsertComent.forEach((coment) => {
                coment.addEventListener('click', (e) => {
                    const idComent = e.target.dataset.coment;
                    console.log(idComent); // id del que le da publicar
                    const inputComent = homePage.querySelector(`#insert_coment-${idComent}`).value;
                    console.log(inputComent); // el comentario escrito
                    addComments(inputComent, user().uid);
                    /** **********Insertar nombre de usuario y comentario************* */
                    const insertComment = homePage.querySelector(`.insert_coment_user-${idComent}`);
                    console.log(insertComment); //
                    insertComment.textContent = insertComment;
                });
            });

            /** **********editar publicaciones*********** */
            const iconEdit = homePage.querySelectorAll('.editBtn');
            iconEdit.forEach((Edit) => {
                Edit.addEventListener('click', (e) => {
                    const idPost = e.target.dataset.edit;
                    const publicacion = homePage.querySelector(`#publicacion-${idPost}`);
                    publicacion.readOnly = false;
                    const btnGuardar = homePage.querySelector(`#editar-${idPost}`);
                    btnGuardar.style.display = 'block';
                    getPost(idPost)
                        .then((docu) => {
                            const data = docu.data();
                            publicacion.value = data.publishedText;
                        });

                    btnGuardar.addEventListener('click', () => {
                        const newText = homePage.querySelector(`#publicacion-${idPost}`).value;
                        editPost(idPost, newText);
                    });
                });
            });
        });
    });

    /** **********Cerrar sesión Usuario************* */
    const logOut = homePage.querySelector('#logOut');
    logOut.addEventListener('click', () => {
        closeUserSession()
            .then(() => {
                console.log('El usuario ha cerrado sesión');
                window.location.hash = '#/';
            })
            .catch((error) => {
                console.log(error, 'No se pudo cerrar la sesión');
            });
    });

    return homePage;
};
