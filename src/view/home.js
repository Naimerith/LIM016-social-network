import { templateFooter } from './footer.js'
import { templateHeader } from './header.js'

export const home = () => {
    const templateHome = `
    <section class="homePage">
    <div class="fotoPerfil"><img src="" alt="foto"></div>
    <div class="insertarPublicacion">
        <input id="insertarPublicacion" class="inputInsertarPublicacion" name="insertarPublicacion" type="text" placeholder="¿Que quieres compartir?"/><br>
        <button type="submit" class="btn-publicar" id="btn-publicar">
            Publicar
        </button>
    </div>
    </section>`

    const divElement = document.createElement('div');
    divElement.innerHTML = templateHome;

    const templatePost =
        `<div class="container_post">
        <div class="header_post">
            <aside class="title_post">
                <h1 class="title">Publicado por:  ... </h1>
                <h4 class="date_hour">04/03/2015</h4>
            </aside>
            <aside class="photo_perfil">
                <img src="" alt="foto">
            </aside>
        </div>
        <div class="content_post">
            <p>hola que tal</p>
        </div>
        <div class="iconos">
            <aside class="icons_iteration">
                <img src="" alt="like">
                <img src="" alt="coment">
            </aside>
            <aside class="icons_iteration">
                <img src="" alt="edit">
                <img src="" alt="delete">
            </aside>
        </div>
        <div class="coment">
            <input id="insert_coment" class="insert_coment" name="coment" type="text" placeholder="Añadir Comentario"/>
            <button type="submit" class="btn-publicar" id="btn-publicar">
                Publicar
            </button>
        </div>
    </div>`

    const homePage = document.createElement('article');
    homePage.classList.add('article-home');
    homePage.innerHTML = templateHeader + templateHome + templatePost + templateFooter

    return homePage;
};

