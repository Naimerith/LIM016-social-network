import { createUser } from '../firebase/firebaseFunciones.js'

export const register = () => {

    const sectionSignUp = document.createElement('section');
    const divSignUp = document.createElement('div')
    sectionSignUp.classList.add('sectionSignUp'); //la clase para la section 
    divSignUp.classList.add('divSignUp') // clase para el nombre 
    sectionSignUp.appendChild(divSignUp);
    divSignUp.innerHTML = `
        <h1>Registrate</h1>
        <input id="name" class="form" name="nombre" type="text" placeholder="Nombre completo" required/>
        <input id="email" class="form" name="email" type="email" placeholder="email" required/>
        <input id="password" class="form" name="contraseña" type="password" placeholder="********** " required/>
        <h5 class="textPrivacidad">Al hacer clic en registrarte, aceptas nuestras Condiciones, Política de datos y la política de cookies. </h5>
        <button type="submit" class="btn" id="btn">Registrate</button>
        <span class="link"> Ya tienes una cuenta <a id="linkLogIn" href="#/">Ingresar</a></span>`

    const boton_SignUp = sectionSignUp.querySelector('#btn');
    boton_SignUp.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.hash = '#/';
        //console.log("diste un click")

        const emailSignUp = sectionSignUp.querySelector('#email').value;
        const passwordSignUp = sectionSignUp.querySelector('#password').value;

        //console.log(nombreDelRegistro, apellidoDelRegistro, emailDelRegistro, contraseñaDelRegistro, fechaNacDelRegistro);

        createUser(emailSignUp, passwordSignUp)
            .then((userCredential) => {
                console.log(userCredential, "si pasoooooo")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

    });

    const btnLogin = divSignUp.querySelector('#linkLogIn');
    btnLogin.addEventListener('click', () => {
        window.location.hash = '#/';
    });

    return sectionSignUp;
};
