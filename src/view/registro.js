/* eslint-disable default-case */
/* eslint-disable indent */
/* eslint-disable no-console */
import { createUser, verificateEmail, addUser } from '../firebase/firebaseFunciones.js';
import { templateHeaderSimple } from './header.js';

const sectionSignUp = document.createElement('section');
sectionSignUp.classList.add('sectionSignUp');
sectionSignUp.innerHTML = `${templateHeaderSimple}
        <img class="imagenFondo" src="../src/img/imagenFondo.png" alt="">
        <form id="signUp" class="signUp">
            <h1 class="title_register">
                Registrate
            </h1>
            <div class="inputs">
            <input id="name" class="typeText" name="nombre" type="email" placeholder="Nombre completo"  required/>
            <p class="error-message-input" id="error-name">✗ Solo puede ingresar letras y espacio</p>
            <input id="email" class="typeEmail" name="email" type="email" placeholder="example@gmail.com"/> 
            <input id="password" class="typePassword" name="contraseña" type="password" placeholder="**********" required/> 
            <p class="error-message-input" id="error-password">✗ Solo puede ingresar de 4 a 12 digitos alfanuméricos</p>
            </div>
            <p class="error-message" id="error-message" style="display:none"></p>
            <h5 class="textPrivacidad">
                Al hacer clic en registrarte, aceptas nuestras Condiciones, Política de datos y la política de cookies. 
            </h5>
            <button type="submit" class="btn_register" id="btn">
                Registrate
            </button><br>
            <span class="link_login"> 
                Ya tienes una cuenta 
                    <a id="linkLogIn" href="#/">
                        Ingresar
                    </a>
            </span>
        </form>

        <!--Este es el modal de información-->
     <div class="modal-container" style="display: none">
         <div class="modal-content">
           <p id="message"></p>
           <button class="modal-btn">Aceptar</button>
          </div>
    </div>`;

/** **********Validación de los Input************* */
const inputs = sectionSignUp.querySelectorAll('#signUp input');
const regexName = /^[a-zA-ZÀ-ÿ\s]{1,20}$/; // Letras y espacios, pueden llevar acentos.
const regexPassword = /^.{4,16}$/; // 4 a 12 digitos.
const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const validarInput = (e) => {
    switch (e.target.name) {
        case 'nombre':
            if (regexName.test(e.target.value)) {
                console.log('es correcto');
                sectionSignUp.querySelector('#name').classList.add('formularioCorrecto');
                sectionSignUp.querySelector('#error-name').classList.remove('activo');
            } else {
                console.log('es incorrecto');
                sectionSignUp.querySelector('#name').classList.add('formularioIncorrecto');
                sectionSignUp.querySelector('#name').classList.remove('formularioCorrecto');
                sectionSignUp.querySelector('#error-name').classList.add('activo');
            }
            break;
        case 'contraseña':
            if (regexPassword.test(e.target.value)) {
                console.log('es correcto');
                sectionSignUp.querySelector('#password').classList.add('formularioCorrecto');
                sectionSignUp.querySelector('#error-password').classList.remove('activo');
            } else {
                console.log('es incorrecto');
                sectionSignUp.querySelector('#password').classList.add('formularioIncorrecto');
                sectionSignUp.querySelector('#password').classList.remove('formularioCorrecto');
                sectionSignUp.querySelector('#error-password').classList.add('activo');
            }
            break;
        case 'email':
            if (regexEmail.test(e.target.value)) {
                console.log('es correcto');
                sectionSignUp.querySelector('#email').classList.add('formularioCorrecto');
            } else {
                console.log('es incorrecto');
                sectionSignUp.querySelector('#email').classList.add('formularioIncorrecto');
                sectionSignUp.querySelector('#email').classList.remove('formularioCorrecto');
            }
            break;
    }
};
inputs.forEach((input) => {
    input.addEventListener('keyup', validarInput); // cuando deja de escribir
    input.addEventListener('blur', validarInput); // cuando da click afuera
});

export const register = () => {
    /** **********Boton que Registra y te lleva al Inicio de Sesión************* */
    const botonSignUp = sectionSignUp.querySelector('#btn');
    botonSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        const nameUserNew = sectionSignUp.querySelector('#name').value;
        const emailSignUp = sectionSignUp.querySelector('#email').value;
        const passwordSignUp = sectionSignUp.querySelector('#password').value;
        const FormSignUp = sectionSignUp.querySelector('#signUp');
        FormSignUp.reset();

        /* ***********registrar un usuario nuevo********** */
        createUser(emailSignUp, passwordSignUp)
            .then((userCredential) => {
                console.log(userCredential, 'si pasoooooo');
                /** **muestra el modal cuando se registra**** */
                const modal = document.querySelector('.modal-container');
                modal.style.display = 'inline';
                const message = document.getElementById('message');
                message.innerText = `Bienvenido, ${nameUserNew} hemos enviado un correo para verificar tu cuenta`;

                // -----* Agregar documento de datos del usuario a la coleccion "USERS"
                addUser(nameUserNew, emailSignUp, userCredential.user)
                    .then(() => {
                        console.log('todo bien');
                    })
                    .catch((error) => {
                        console.log(error, 'todo mal');
                    });

                /** **Envio de email al usuario**** */
                verificateEmail(emailSignUp, passwordSignUp, nameUserNew)
                    .then(() => {
                        console.log('El usuario ha sido registrado satisfactoriamente');
                    })
                    .catch((error) => {
                        modal.style.display = 'none';
                        console.log(error, 'No se pudo completar el registro del usuario');
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = document.querySelector('#error-message');
                errorMessage.style.display = 'flex';
                if (emailSignUp === '' && passwordSignUp === '' && nameUserNew === '') {
                    errorMessage.textContent = '✗ Debes completar todos los campos';
                    FormSignUp.reset();
                } else if (errorCode === 'auth/invalid-email') {
                    errorMessage.textContent = '✗ Debes ingresar un email valido';
                    FormSignUp.reset();
                } else if (errorCode === 'auth/email-already-in-use') {
                    errorMessage.textContent = '✗ El correo ingresado ya se encuentra registrado';
                    FormSignUp.reset();
                } else if (errorCode === 'auth/weak-password') {
                    errorMessage.textContent = '✗ La contraseña debe tener al menos 6 caracteres';
                    FormSignUp.reset();
                } else if (errorCode === 'auth/internal-error') {
                    errorMessage.textContent = '✗ Debe ingresar una contraseña válida';
                    FormSignUp.reset();
                } else if (errorCode === 'auth/missing-email') {
                    errorMessage.textContent = '✗ Debes ingresar una cuenta de correo electrónico';
                    FormSignUp.reset();
                }
            });
    });
    return sectionSignUp;
};

/** **********Boton que te lleva al Inicio de Sesión, si ya tienes cuenta********* */
const btnLogin = sectionSignUp.querySelector('#linkLogIn');
btnLogin.addEventListener('click', () => {
    window.location.hash = '#/';
});

/** **********Boton que acepta el modal y te lleva a iniciar sesión********* */
const btnModal = sectionSignUp.querySelector('.modal-container');
btnModal.addEventListener('click', () => {
    btnModal.style.display = 'none';
    window.location.hash = '#/';
});
