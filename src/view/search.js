/* eslint-disable no-restricted-syntax */
/* eslint-disable indent */

import { templateFooterWithoutSearch } from './footer.js';
import { templateHeader } from './header.js';

export const search = () => {
    const templateSearch = `
            <a href="#/search"></a> 
            <input type="text" id="form_search" class="form_search" placeholder="Buscar...">
            <ul id="result">
            </ul>
   `;
    const searchPage = document.createElement('div');
    searchPage.classList.add('container_search');
    searchPage.innerHTML = templateHeader + templateSearch + templateFooterWithoutSearch;

    /// ///////////////BUSCADOR///////////////////////
    const keywords = [
        { wordSearch: '#maquillaje' },
        { wordSearch: '#dieta' },
        { wordSearch: '#saludable' },
        { wordSearch: '#ejercicios' },
        { wordSearch: '#rutina' },
    ];

    const form = searchPage.querySelector('#form_search');
    const result = searchPage.querySelector('#result');

    const filter = () => {
        result.innerHTML = ''; // El inner comienza vacio
        // console.log(form.value);
        const word = form.value.toLowerCase();
        for (const keyword of keywords) {
            const palabra = keyword.wordSearch.toLowerCase();
            if (palabra.indexOf(word) !== -1) {
                result.innerHTML += ` 
                <li>${keyword.wordSearch}</li>`;
            }
        }
        if (result.innerHTML === '') {
            result.innerHTML += ` 
                <li>No se encontraron coincidencias...</li>`;
        }
    };
    form.addEventListener('keyup', filter);
    filter();
    return searchPage;
};
