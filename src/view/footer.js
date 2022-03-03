/* import { getDataUser } from '../firebase/firebaseFunciones.js'
import { user } from '../firebase/config.js' */

export const templateFooter = `
<footer class="footer">
    <a href="#/home">
        <img class="inicio" src="../src/img/inicio.png" alt="inicio">
    </a>
    <a href="#/search">
    <input id="buscador" class="search" name="buscador" type="text" placeholder="Buscar"/>
    </a>
    <a href="#/profile">
        <img id='perfil_footer' class="perfil_footer" src="../src/img/perfil.png" alt="perfil">
    </a>
    </footer>`;

export const templateFooterWithoutSearch = `
<footer class="footer">
    <a href="#/home">
        <img class="inicio" src="../src/img/inicio.png" alt="inicio">
    </a>
    <a href="#/profile">
        <img class="perfil_search" src="../src/img/perfil.png" alt="perfil">
    </a>
    </footer>`;
