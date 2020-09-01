import './index.css'

import Card from '../components/Card.js';
import {initialCards} from '../components/configs.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


// находим элементы страницы 
const openPopupProfile = document.querySelector('.profile__edit'); // находим кнопку редактирования профиля в DOM
const openPopupCard = document.querySelector('.profile__card-edit');// находим кнопку добавления карточки в DOM

const profileName = document.querySelector('.profile__name'); // находим элемент старницы куда записывается имя
const profileActivity = document.querySelector('.profile__activity'); // находим элемент старницы куда записывается профессия

//Добавляем карточки на страницу
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => { 
      const card = new Card({
            data: item, 
            handleCardClick: () => {
                const popup = new PopupWithImage(item.name, item.link, '#popup-imageTemplate');   // Создадим экземпляр попапа-карточки
                popup.open(); 
            }, 
            },
            '#card-template'); // Создадим экземпляр карточки
      const cardElement = card.generateCard();  // заполняем карточку и возвращаем наружу
     cardsList.addItem(cardElement); // Добавляем в DOM
    },
  },
  '.elements__list'
);

cardsList.renderItems();

// создадим экземпляры класса  PopupWithForm для каждого из попапов

// попап редактирования профиля
const popupProfile = new PopupWithForm({
    popupSelector: '#popup_type_editTemplate', 
    handleSubmitPopup: (formData) => {
     // создаем экземпляр UserCard передаём ему объект с данными формы
    const card = new UserInfo(formData, '.profile__name', '.profile__activity');

    card.setUserInfo();// добавляем новые данные на страницу

    const newValueProfile = card.getUserInfo();
    }
});

// попап добавления карточки

const popupCardAdd = new PopupWithForm({
    popupSelector: '#popup_type_new-cardTemplate', 
    handleSubmitPopup: (formData) => {
        // создаем экземпляр Card передаём ему объект с данными формы
        const card = new Card({
            data: formData, 
            handleCardClick: () => {
                const popup = new PopupWithImage(formData.name, formData.link, '#popup-imageTemplate');   // Создадим экземпляр попапа-карточки
                popup.open(); 
            },
            },
            '#card-template');
        const cardElement = card.generateCard();  // заполняем карточку и возвращаем наружу
        cardsList.addItem(cardElement); 
    }
});

//слушатели
openPopupProfile.addEventListener('click', () => { //кнопка открытия попап редактирования профиля

    popupProfile.open();
    // заполняем поля попапа
    popupProfile._form.querySelector('#name-input').value = profileName.textContent; //Получаем значение элемента страницы, содержащее имя, с помощью свойства textContent и вставляяем его в поле формы для имени с помощью свойства value
    popupProfile._form.querySelector('#activity-input').value = profileActivity.textContent; // аналогично для профессии
});

openPopupCard.addEventListener('click', () => {  
    popupCardAdd.open();
});