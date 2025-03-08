'use strict';

// СКРИН ТАБЛИЦА
const Fitnes = "fitnes"
const FitnesText = `
Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям.
Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.
`
const FitnesImg = `img/tabs/vegy.jpg`

const Post = "post"
const PostText = `
Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения.
Полная гармония с собой и природой в каждом элементе! Все будет Ом!    
`
const PostImg = `img/tabs/post.jpg`

const Elite = "elite"
const EliteText = `
Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.
Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!    
` 
const EliteImg = `img/tabs/elite.jpg`

const Vegy = "vegy"
const VegyText = `
Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям.
Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.
`
const VegyImg = `img/tabs/hamburger.jpg`

// делаем мапу, тк МАПА имеет доступ к памяти O1 (если нет коллизий - у нас точно нет)
const ScreenCast = new Map()
ScreenCast.set(Fitnes, {text: FitnesText, img: FitnesImg, title: 'Фитнес'})
ScreenCast.set(Post, {text: PostText, img: PostImg, title: 'Постное'})
ScreenCast.set(Elite, {text: EliteText, img: EliteImg, title: 'Премиум'})
ScreenCast.set(Vegy, {text: VegyText, img: VegyImg, title: 'Сбалансированное'})
// функция принимает скрин, в зависимости от скрина выбираем элемент в мапе, перещелкиваем нужные элементы и берем нужную инфу из мапы
function SetActiveScreen(screen) {
  const screenItem = ScreenCast.get(screen)

  const image = document.querySelectorAll('.tabcontent img')[0]; // <img src="img/tabs/vegy.jpg" alt="vegy">
  image.setAttribute("src", screenItem.img) // устанавливаем новую картинку
  image.setAttribute("alt", screenItem.img.split("/")[2].split(".")[0]) // меняем альтернативный текст

  const text = document.querySelectorAll('.tabcontent__descr')[0]; // описание меню: <div class="tabcontent__descr">
  text.innerHTML = screenItem.text // меняем описание

  const tabheaderItems = document.querySelectorAll('.tabheader__items') // табы Выберите стиль меню: фитнес, премиум, постное, сбалансированное
  // console.log(tabheaderItems)
  for (const item of tabheaderItems[0].children) { // дочерние элемеенты  '.tabheader__items': фитнес, премиум, постное, сбалансированное
    if (screenItem.title === item.innerHTML) { // если фитнес === фитнес,  премиум===премиум и тд
      item.classList = ["tabheader__item", "tabheader__item_active"].join(" "); // делаем вкладку активной
    } else {
      item.classList = ["tabheader__item"]
    }
  }
}

// СЛАЙДЕР
// делаем мапу, дальше простая логика больше меньше и перещелкивание нужных элементов
const SliderNumberImg = new Map()
SliderNumberImg.set(1, {img: "img/slider/pepper.jpg", alt: "pepper"})
SliderNumberImg.set(2, {img: "img/slider/paprika.jpg", alt: "paprika"})
SliderNumberImg.set(3, {img: "img/slider/food-12.jpg", alt: "food-12"})
SliderNumberImg.set(4, {img: "img/slider/olive-oil.jpg", alt: "olive-oil"})
const SlideTota = Number(document.querySelectorAll('#total')[0].innerHTML); // получаем общее кол-во слайдеров
function Slide(side) {
  const current = Number(document.querySelectorAll('#current')[0].innerHTML); // начало: 01
  const next = side === "+" ? current + 1 : current - 1;
  // обработка выхода из слайдера 01 (из 01 -> в 04)
  if (next <= 0) {
    document.querySelectorAll('#current')[0].innerHTML = "04"
    document.querySelectorAll('.offer__slide img')[0].setAttribute("src", SliderNumberImg.get(4).img)
    document.querySelectorAll('.offer__slide img')[0].setAttribute("alt", SliderNumberImg.get(4).alt)
  }
  // обработка выхода из слайдера 04 (из 04 -> в 01)
  else if (next >= 5) {
    document.querySelectorAll('#current')[0].innerHTML = "01"
    document.querySelectorAll('.offer__slide img')[0].setAttribute("src", SliderNumberImg.get(1).img)
    document.querySelectorAll('.offer__slide img')[0].setAttribute("alt", SliderNumberImg.get(1).alt)
  } else {
    document.querySelectorAll('#current')[0].innerHTML = String("0" + next)
    document.querySelectorAll('.offer__slide img')[0].setAttribute("src", SliderNumberImg.get(next).img)
    document.querySelectorAll('.offer__slide img')[0].setAttribute("alt", SliderNumberImg.get(next).alt)
  }
}



// МОДАЛКА
// вешаем на страничу новый стиль - вообще так плохо делать, но тут дело в том что надо юзать только JS
const style = document.createElement('style');
// утснавливаем приоритетное свойство display: block !important;
style.innerHTML = `
  .modal_open {
    display: block !important;
  }
`;
document.head.appendChild(style);
// останавливаем высплытие события из контента диалого
// чтобы клик внутри формы не закрывал модалку
document.querySelectorAll('.modal__content')[0].setAttribute('onclick', "event.stopPropagation()")
// функция модалки - открыть / закрыть
function Modal(action) { // action = open/close
  const modal = document.querySelectorAll('.modal')[0] // <div class="modal" onclick="Modal('close')">
  if (action === "open") {
    modal.classList = "modal modal_open"
  } else {
    modal.classList = "modal"
  }
}

// ================================================ ДОПОЛНИТЕЛЬНО =================================================== 

// id > class 
const genderButtons = document.querySelectorAll('#gender .calculating__choose-item'); // берем все <div class="calculating__choose" id="gender">
genderButtons.forEach(button => {
    button.addEventListener('click', () => {
        genderButtons.forEach(btn => btn.classList.remove('calculating__choose-item_active'));
        // добавляем активный класс к той кнопке, на которую кликнули
        button.classList.add('calculating__choose-item_active');
    });
});


const activityButtons = document.querySelectorAll('.calculating__choose_big .calculating__choose-item');
activityButtons.forEach(button => {
    button.addEventListener('click', () => {
        activityButtons.forEach(btn => btn.classList.remove('calculating__choose-item_active'));
        button.classList.add('calculating__choose-item_active');
    });
});



const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const ageInput = document.getElementById('age');
const resultElement = document.querySelector('.calculating__result span');

let gender = 'female'; // по умолчанию
let activity = 1.375;  // по умолчанию

genderButtons.forEach(button => {
    button.addEventListener('click', () => {
        genderButtons.forEach(btn => btn.classList.remove('calculating__choose-item_active'));
        button.classList.add('calculating__choose-item_active');
        gender = button.textContent === 'Женщина' ? 'female' : 'male';
        calculateCalories();
    });
});

activityButtons.forEach(button => {
    button.addEventListener('click', () => {
        activityButtons.forEach(btn => btn.classList.remove('calculating__choose-item_active'));
        button.classList.add('calculating__choose-item_active');
        switch (button.id) {
            case 'low':
                activity = 1.2;
                break;
            case 'small':
                activity = 1.375;
                break;
            case 'medium':
                activity = 1.55;
                break;
            case 'high':
                activity = 1.725;
                break;
        }
        calculateCalories();
    });
});

heightInput.addEventListener('input', calculateCalories);
weightInput.addEventListener('input', calculateCalories);
ageInput.addEventListener('input', calculateCalories);

function calculateCalories() {
    const height = +heightInput.value;
    const weight = +weightInput.value;
    const age = +ageInput.value;

    if (!height || !weight || !age || height <= 0 || weight <= 0 || age <= 0) {
        resultElement.textContent = '____';
        return;
    }

    let calories;
    if (gender === 'female') {
        calories = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } else {
        calories = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }

    calories = Math.round(calories * activity);
    resultElement.textContent = calories;
}



const menuItems = document.querySelectorAll('.menu__item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)'; // поднимаем карточку
        item.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; // увеличиваем тень
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // плавный переход
    });

    // при уходе курсора
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)'; // возвращаем карточку на место
        item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // возвращаем тень
    });
});


// time
let days = document.querySelector('#days').textContent;
let hours = document.querySelector('#hours').textContent;
let minutes = document.querySelector('#minutes').textContent;
let seconds = document.querySelector('#seconds').textContent;

function updateTimer() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    seconds--;

    if (seconds < 0) {
        seconds = 59;
        minutes--;

        if (minutes < 0) {
            minutes = 59;
            hours--;

            if (hours < 0) {
                hours = 23;
                days--;

                if (days < 0) {
                    clearInterval(timerInterval);
                    days = 0;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                }
            }
        }
    }

    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

const timerInterval = setInterval(updateTimer, 1000);