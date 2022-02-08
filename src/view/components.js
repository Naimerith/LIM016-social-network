//importar todas las vistas
import {login} from './login.js';
import {register} from './registro.js';
import {home} from './home.js';
import {Different} from './404.js';


const components= {
    Registro: register,
    Login: login,
    Home: home,
    Different: Different
};

export { components}; //exportando a router 