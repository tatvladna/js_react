'use strict';

const updateMovieList = (movies, element) => {
    movies.sort((a, b) => a.localeCompare(b, 'ru'));
    element.innerHTML = "";
    
    movies.forEach((item, i) => {
        element.innerHTML += `<li class="promo__interactive-item">${i+1}. ${item}
                                <div class="delete"></div></li>`;
    });
    document.querySelectorAll('.delete').forEach((btn, i) => {
        // lобавляем обработчик к delete
        btn.addEventListener('click', () => {
            // удаляем родительский класс <li> из DOM
            btn.parentElement.remove();
            // i - индекс для удаления, а 1 - количество для удаления
            movies.splice(i, 1);
            // снова вызываем функцию, чтобы отобразить обновления
            updateMovieList(movies, element);
        });
    });
};

export { updateMovieList };