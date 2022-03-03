/* eslint-disable no-console */
import {
  loginApp,
  signInGithub,
  signInGoogle,
  addUserGmail,
} from '../firebase/firebaseFunciones.js';

import { GoogleAuthProvider, GithubAuthProvider } from '../firebase/config.js';

export const login = () => {
  const templateLogin = `   
        <div id="Logo" class="containerLogin">
          <p class="title_version">Queremos ver tu mejor versión</p>
          <figure><img class="imagenFondo" src="../src/img/imagenFondo.png" alt=""></figure>
        </div>
        <form id="login" class="login">
        <div class="tittle">
        <h1 class="glowApp2">Glow App</h1>
        <img class="logo2" src="../src/img/diamante.png" alt=""></img>
        </div> 
          <div id="inputs2" class="inputs2">
             <input id="email2" class="styleEmail1" name="email" type="email" placeholder="....@gmail.com " required/>
             <input id="password2" class="stylepass" type="password" placeholder="**********" minlength="5" required/>
          </div>
          <p id="verified" class="everified"></p>
          <button type="submit" class="btn2" id="btn2">Acceder</button>
          <div id="lastContainer class="lastContainers">
            <p class="enter"> O inicia sesión con: </p>
            <div class='iconos_sesion'>
              <img src="./img/icono google.png" id="btn-google" class="btn-google">
              <img src="./img/icono github.png" id="btn-github" class="btn-github"> 
            </div>
          <span class="link">¿Eres Nuevo aqui? <a id="linkRegister" href="#/register">Regístrate</a></span>
          </div>
        </form>      
        `;
  const divLogin = document.createElement('div');
  divLogin.innerHTML = templateLogin;

  const botonSignIn = divLogin.querySelector('#btn2');
  botonSignIn.addEventListener('click', (e) => {
    e.preventDefault();

    const emailSignIn2 = divLogin.querySelector('#email2').value;
    const passwordSignIn2 = divLogin.querySelector('#password2').value;
    const errorVerified = divLogin.querySelector('#verified');
    const cleanForm = divLogin.querySelector('#login');

    loginApp(emailSignIn2, passwordSignIn2)
      .then((usuario) => {
        const userEmail = usuario.user.emailVerified;
        // si el usuario verifico su correo lo dirige a la vista home
        if (userEmail === true) {
          window.location.hash = '#/home';
          console.log('Usuario logueado');
        } else {
          // muestra mensaje de error si no verifico por correo
          errorVerified.innerHTML = '✗ Error, cuenta no verificada';
          cleanForm.reset();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Validaciones de los campos
        if (emailSignIn2 === '' || passwordSignIn2 === '') {
          errorVerified.innerHTML = '✗ Debes completar todos los campos';
          cleanForm.reset();
        } else if (emailSignIn2 !== '' && errorCode === 'auth/invalid-email') {
          errorVerified.innerHTML = '✗ La dirección de correo electrónico no es válida';
          cleanForm.reset();
        } else if (errorCode === 'auth/user-disabled') {
          errorVerified.innerHTML = '✗ El usuario esta desactivado';
          cleanForm.reset();
        } else if (errorCode === 'auth/user-not-found') {
          errorVerified.innerHTML = '✗ Cuenta no encontrada o incorrecta';
          cleanForm.reset();
        } else if (errorCode === 'auth/wrong-password') {
          errorVerified.innerHTML = '✗ Contraseña incorrecta';
          cleanForm.reset();
        }
        console.log(errorCode, errorMessage);
      });
  });
  // boton que te lleva a vista de registro
  const btnRegister = divLogin.querySelector('#linkRegister');
  btnRegister.addEventListener('click', () => {
    window.location.hash = '#/register';
  });

  // boton para ingresar con google
  const btnGoogle = divLogin.querySelector('#btn-google');
  btnGoogle.addEventListener('click', () => {
    signInGoogle()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token);
        console.log('iniciaste sesion con google', user);

        addUserGmail(result.user)
          .then(() => {
            console.log('todo bien');
          })
          .catch((error) => {
            console.log(error, 'todo mal');
          });
        window.location.hash = '#/home';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  });

  // boton para ingresar con github
  const btnGithub = divLogin.querySelector('#btn-github');
  btnGithub.addEventListener('click', () => {
    signInGithub()
      .then((result) => {
        // This gives you a Github Access Token. You can use it to access the Google API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(credential);
        console.log(token);
        console.log(user);

        console.log('iniciaste sesion con github', user);
        window.location.hash = '#/home';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  });

  return divLogin;
};
