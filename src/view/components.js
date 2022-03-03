/* eslint-disable indent */
// importar todas las vistas
import { login } from './login.js';
import { register } from './registro.js';
import { home } from './home.js';
import { profile } from './profile.js';
import { search } from './search.js';
import { Different } from './404.js';

const components = {
    Registro: register,
    Login: login,
    Home: home,
    Profile: profile,
    Search: search,
    Different,
};

export { components }; // exportando a router
