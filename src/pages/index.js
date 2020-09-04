
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {object, initialCards} from '../utils/configs.js';
import './index.css';
// popupProfile 

const openPopupProfile = document.querySelector('.profile__edit'); // находим кнопку редактирования профиля в DOM
const popupProfileEdit = document.querySelector('.popup_type_edit'); //всплывающее окно popup редактирования профиля
const formProfile = popupProfileEdit.querySelector('.form'); // форма для редактирования профиля в DOM

// popupCard 

const openPopupCard = document.querySelector('.profile__card-edit');// находим кнопку добавления карточки в DOM
const popupCardEdit = document.querySelector('.popup_type_new-card'); //всплывающее окно popup добавления карточки
const formCard = popupCardEdit.querySelector('.form'); // форма для добавления карточки в DOM


// находим элементы страницы 

const profileName = document.querySelector('.profile__name'); // находим элемент старницы куда записывается имя
const profileActivity = document.querySelector('.profile__activity'); // находим элемент старницы куда записывается профессия


//Добавляем карточки на страницу

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => { 
        const newCard = createCard(item);
        const cardElement = newCard.generateCard();  // заполняем карточку и возвращаем наружу
        cardsList.addItem(cardElement); // Добавляем в DOM
    },
  },
  '.elements__list'
);

cardsList.renderItems();

// создадим экземпляры класса FormValidator для каждой из форм и запишем их в отдельные именованные переменные
const profileFormValidator = new FormValidator(object, formProfile);
profileFormValidator.enableValidation(formProfile);

const cardFormValidator = new FormValidator(object, formCard);
cardFormValidator.enableValidation(formCard);

// /функция createCard создадает экземпляр класса Card
function createCard(item) {
   const card = new Card({
       data: item, 
       handleCardClick: (item) => {
           const popupImage = new PopupWithImage('.popup-image');   // Создадим экземпляр попапа-карточки
           popupImage.open(item); 
           popupImage.setEventListeners()
       }, 
    },
    '#card-template');
      return card;
}

// создадим экземпляры класса  PopupWithForm для каждого из попапов

// попап редактирования профиля
const popupProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit', 
    handleSubmitPopup: (formData) => {
        // создаем экземпляр UserCard передаём ему объект с селекторами двух классов:
        // элемента имени пользователя и элемента информации о себе.
        const card = new UserInfo('.profile__name', '.profile__activity');

        card.setUserInfo(formData);// добавляем новые данные на страницу

        const newValueProfile = card.getUserInfo();

        popupProfile.close();

    }
});
popupProfile.setEventListeners()
// попап добавления карточки

const popupCardAdd = new PopupWithForm({
    popupSelector: '.popup_type_new-card', 
    handleSubmitPopup: (formData) => {
        // создаем экземпляр Card передаём ему объект с данными формы
        const newCard = createCard(formData);
        const cardElement = newCard.generateCard();  // заполняем карточку и возвращаем наружу
        cardsList.addItem(cardElement); // Добавляем в DOM 
       
        popupCardAdd.close();
        
    }
});
popupCardAdd.setEventListeners()

//слушатели
openPopupProfile.addEventListener('click', () => { //кнопка открытия попап редактирования профиля
    const nameInput = popupProfile._form.querySelector('#name-input');
    const activityInput = popupProfile._form.querySelector('#activity-input');
    profileFormValidator.hideInputError(nameInput);// сбрасываем стили невалидных полей
    profileFormValidator.hideInputError(activityInput);
    popupProfile._form.querySelector('.form__button').classList.remove('form__button_inactive');
    popupProfile.open();
    
    // заполняем поля попапа при открытии
    nameInput.value = profileName.textContent; //Получаем значение элемента страницы, содержащее имя, с помощью свойства textContent и вставляяем его в поле формы для имени с помощью свойства value
    activityInput.value = profileActivity.textContent; // аналогично для профессии

});

openPopupCard.addEventListener('click', () => {  //кнопка открытия попап добавления карточки
    const placeInput = popupCardAdd._form.querySelector('#place-input');
    const linkInput = popupCardAdd._form.querySelector('#link-input');
    const popupButton = popupCardAdd._form.querySelector('.form__button');
    cardFormValidator.hideInputError(placeInput);// сбрасываем стили невалидных полей
    cardFormValidator.hideInputError(linkInput);
    popupButton.classList.add('form__button_inactive'); //делаем кнопку неактивной
    //popupButton.setAttribute('disabled', true);
    popupCardAdd.open();
});