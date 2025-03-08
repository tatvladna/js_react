'use strict';

import { movieDB, nameDB, promoDB } from './db.js';
import { adv, genre, title, bg, descr, ratings, movieList, form, inputText, checkBoxFav, movieTitleMain, movieTitleForm, movieSpan, tabList, promoToUpdate } from './domElements.js';
import { updateMovieList } from './updateMovieList.js';

document.addEventListener('DOMContentLoaded', () => {
    adv.remove(); // реклама удалена
    genre.textContent = 'драма'; // меняем "комедия" на "драма"

    bg.style.backgroundImage = 'url("img/bg.jpg")'; // меняем картинку

    form.addEventListener('submit', (event) => {
        event.preventDefault(); //  обработка данных формы без перезагрузки страницы
        let newMovie = inputText.value;
        if (newMovie.length > 21) {
            newMovie = newMovie.slice(0, 21) + "...";
        };

        const tabName = movieTitleMain.textContent.split(" ")[1].toLowerCase(); // от "ПРОСМОТРЕННЫЕ ФИЛЬМЫ" берем "ФИЛЬМЫ" (или клипы\сериалы\мультфильмы)
        const newItems = nameDB[tabName]; // берем новую информацию

        // если чекбокс отмечен, то добавляем сердечко к названию фильма
        if (checkBoxFav.checked) {
            newMovie = newMovie + " 💖";
        };
        
        newItems.push(newMovie); // добавляем в массив новый фильм
        // console.log(newItems);
        // console.log(movieList);
        updateMovieList(newItems, movieList);
        // возвращаем к дефолтному состоянию
        inputText.value = "";
        checkBoxFav.checked = false;
    });

    console.log(tabList);
    tabList.forEach((tab) => {
        tab.addEventListener('click', (event) => {
            // чтобы не было перезагрузки
            event.preventDefault();
            
            // выделяем активную вкладку
            // убираем класс promo__menu-item_active у всех вкладок
            tabList.forEach((tab) => {
                tab.classList.remove('promo__menu-item_active');
            });
            // добавляем класс promo__menu-item_active к текущей вкладке
            tab.classList.add('promo__menu-item_active');
            // oбновление заголовков
            movieTitleMain.textContent = `ПРОСМОТРЕННЫЕ ${tab.textContent.toUpperCase()}`;
            // slice - возвращает строку без последнего символа
            movieTitleForm.textContent = `ДОБАВИТЬ НОВЫЙ ${tab.textContent.slice(0,-1).toUpperCase()}`;
            movieSpan.textContent = `Введите название ${(tab.textContent.slice(0, -1) + 'а').toLowerCase()}`;
            
            let n = 0;
            const tabArray = promoDB[tab.textContent.toLowerCase()];
            // обновляем промо материалы
            // genre.textContent = tabArray[0];
            // title.textContent = tabArray[1];
            // descr.textContent = tabArray[2];
            promoToUpdate.forEach((el) => {
                el.textContent = tabArray[n];
                n++;
            });
            bg.style.backgroundImage = tabArray[tabArray.length-1];

            updateMovieList(nameDB[tab.textContent.toLowerCase()], movieList);
        });
    });

    updateMovieList(movieDB.movies, movieList);
});
