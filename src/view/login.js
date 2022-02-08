import { loginApp } from '../firebase/firebaseFunciones.js'

export const login = () => {
  const templateLogin = `   
        <h1>Ingreso</h1>
        <input id="email2" class="form" name="email" type="email" placeholder="....@gmail.com " required/>
        <input id="password2" class="form" name="contraseña" type="password" placeholder="********** " required/>
        <button type="submit" class="btn2" id="btn2">Acceder</button>
        <span class="link">¿Eres Nuevo aqui? <a id="linkRegister" href="#/register">Regístrate</a></span>`
  const divLogin = document.createElement('div');
  divLogin.innerHTML = templateLogin;

  const boton_SignIn = divLogin.querySelector('#btn2');
  boton_SignIn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.hash = '#/home';

    const emailSignIn2 = divLogin.querySelector('#email2').value;
    const passwordSignIn2 = divLogin.querySelector('#password2').value;

    loginApp(emailSignIn2, passwordSignIn2).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
  });

  const btnRegister = divLogin.querySelector('#linkRegister');
  btnRegister.addEventListener('click', () => {
    window.location.hash = '#/register';
  });

  return divLogin;
};