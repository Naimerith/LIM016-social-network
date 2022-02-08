import { createUser } from '../firebase/firebaseFunciones.js'

const elementInput = () => {
    const input = document.getElementById('app')
    const sectionSignUp = document.createElement('section');
    sectionSignUp.classList.add('sectionSignUp');
    sectionSignUp.innerHTML = `
    <h1 class="Registrate">
        Registrate
    </h1>
    <input id="name" class="form" name="nombre" type="text" placeholder="Nombre Completo" required/><br>
    <input id="email" class="form" name="email" type="email" placeholder="Correo electrónico" required/><br>
    <input id="password" class="form" name="contraseña" type="password" placeholder="Contraseña" required/>
    <h5 class="textPrivacidad">
        Al hacer clic en registrarte, aceptas nuestras Condiciones, Política de datos y la política de cookies.
    </h5>
    <div class=btnRegistrate>
        <button type="submit" class="btn" id="btn">Registrate</button>
    </div>`
    input.appendChild(sectionSignUp);
}

elementInput();

const botonSignUp = () => { //este es el evento para el boton de registrate
    const boton_SignUp = document.querySelector('#btn');
    boton_SignUp.addEventListener('click', () => {
        const emailSignUp = document.querySelector('#email').value;
        const passwordSignUp = document.querySelector('#password').value;

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
}
botonSignUp();

