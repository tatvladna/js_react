'use strict';

export const adv = document.querySelector('.promo__adv'), // реклама
            genre = document.querySelector('.promo__genre'), // <div class="promo__genre">КОМЕДИЯ</div>
            title = document.querySelector('.promo__title'), // <div class="promo__title">МАРСИАНИН</div>
            bg = document.querySelector('.promo__bg'), // promo_bg - блок, который включает genre, title, ratings
            descr = document.querySelector('.promo__descr'), // <div class="promo__descr">ИСТОРИЯ ЧЕЛОВЕКА, ВЫЖИВШЕГО НА ЧУЖОЙ ПЛАНЕТЕ В ОДИНОЧКУ</div>
            ratings = document.querySelectorAll('.promo__ratings span'), // span: IMDb, кинопоиск
            movieList = document.querySelector('.promo__interactive-list'),  // нумерованный список: <ul class="promo__interactive-list">
            form = document.querySelector('.add'), // форма: <form class="add">
            inputText = form.querySelector('.adding__input'), // текст в форме: <input class="adding__input" type="text" placeholder="Что уже посмотрено...?">
            checkBoxFav = form.querySelector('[type="checkbox"]'), // <input type="checkbox">
            movieTitleMain = document.querySelector('.promo__interactive-title'), // <div class="promo__interactive-title">ПРОСМОТРЕННЫЕ ФИЛЬМЫ</div>
            movieTitleForm = form.querySelector('.promo__interactive-title'), // <div class="promo__interactive-title">ДОБАВИТЬ НОВЫЙ ФИЛЬМ</div>
            movieSpan = form.querySelector('span'), // <span>Введите название фильма</span>
            tabList = document.querySelectorAll('.promo__menu-item'), // меню слева: фильмы, мультфильмы, сериалы, клипы
            promoToUpdate = [genre, title, descr, ratings[0], ratings[1]];
