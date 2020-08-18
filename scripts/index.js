import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {object, initialCards} from './Сonfigs.js';
import {togglePopup, closePopupOverlai} from './utils.js';


// popupProfile 

const openPopupProfile = document.querySelector('.profile__edit'); // находим кнопку редактирования профиля в DOM
const popupProfileEdit = document.querySelector('.popup_type_edit'); //всплывающее окно popup редактирования профиля
const closePopupProfile = popupProfileEdit.querySelector('.popup__close');// кнопка закрывающая popup
const formProfile = popupProfileEdit.querySelector('.form'); // форма для редактирования профиля в DOM
const nameInput = popupProfileEdit.querySelector('.form__input_type_name'); // находим поле формы для имени в DOM
const activityInput = popupProfileEdit.querySelector('.form__input_type_activity');  // находим поле формы для профессии в DOM
const saveProfile = popupProfileEdit.querySelector('.form__button');// находим кнопку сохранения внесенных в форму данных

// popupCard 

const openPopupCard = document.querySelector('.profile__card-edit');// находим кнопку добавления карточки в DOM
const popupCardEdit = document.querySelector('.popup_type_new-card'); //всплывающее окно popup добавления карточки
const closePopupCard = popupCardEdit.querySelector('.popup__close');// кнопка закрывающая popup
const formCard = popupCardEdit.querySelector('.form'); // форма для добавления карточки в DOM
const saveCard = popupCardEdit.querySelector('.form__button');// находим кнопку сохранения новой карточки
const placeInput = popupCardEdit.querySelector('.form__input_type_place'); // находим поле формы для добавления названия места
const linkInput = popupCardEdit.querySelector('.form__input_type_link');  // находим поле для добавления ссылки на картинку

// находим элементы страницы 

const profileName = document.querySelector('.profile__name'); // находим элемент старницы куда записывается имя
const profileActivity = document.querySelector('.profile__activity'); // находим элемент старницы куда записывается профессия

const cardList = document.querySelector('.elements__list');// находим элемент DOM - список карточек, куда будем добавлять карточки

const popupOverlay = Array.from(document.querySelectorAll('.popup, .popup_opened')); // popupOverlay


// функция заполнения полей формы редактирования профайла

function fieldInputs() {
    nameInput.value = profileName.textContent; //Получаем значение элемента страницы, содержащее имя, с помощью свойства textContent и вставляяем его в поле формы для имени с помощью свойства value
    activityInput.value = profileActivity.textContent; // аналогично для профессии
}

// Функция - обработчик «отправки» формы
function submitProfileForm (evt) {
    evt.preventDefault(); //отменяем стандартную отправку формы
    profileName.textContent = nameInput.value; // Получаем значение поля формы редактирования для имени с помощью свойства value и вставляем его на страницу 
    profileActivity.textContent = activityInput.value; // аналогично для профессии
    togglePopup(popupProfileEdit);
}


//слушатели
openPopupProfile.addEventListener('click', () => { //кнопка открытия попап редактирования профиля
    profileFormValidator.hideInputError(nameInput);// сбрасываем стили невалидных полей
    profileFormValidator.hideInputError(activityInput);
    saveProfile.classList.remove('form__button_inactive');//делаем кнопку активной
    fieldInputs();
    togglePopup(popupProfileEdit);
}); 

openPopupCard.addEventListener('click', () => {  //кнопка открытия попап добавления карточки
    cardFormValidator.hideInputError(placeInput);// сбрасываем стили невалидных полей
    cardFormValidator.hideInputError(linkInput);
    saveCard.classList.add('form__button_inactive'); //делаем кнопку неактивной
    saveCard.setAttribute('disabled', true);
    formCard.reset();
    togglePopup(popupCardEdit);
});

closePopupProfile.addEventListener('click', () => {  // кнопка закрытия попапа редактирования профиля
    togglePopup(popupProfileEdit);
}); 

closePopupCard.addEventListener('click', () => {  // кнопка закрытия попапа добавления карточки
    togglePopup(popupCardEdit);
});

formProfile.addEventListener('submit', submitProfileForm); //сохранения данных профиля

formCard.addEventListener('submit', (evt) => {                // сохранение добавленной карточки
    evt.preventDefault(); //отменяем стандартную отправку формы
    const newData = {name: placeInput.value, link: linkInput.value};
    const card = new Card(newData, '#card-template');   // Создадим экземпляр карточки
    const cardElement = card.generateCard(newData);   // заполним карточку и возвращаем наружу

    cardList.prepend(cardElement); //добавим карточку на страницу
    formCard.reset();
    togglePopup(popupCardEdit);// закрываем попап
});

//Добавляем слушатели клика на оверлэй  
popupOverlay.forEach((popupElement) => {
    popupElement.addEventListener('click', closePopupOverlai);
});

//Добавляем карточка на страницу
initialCards.forEach((item) => {
    const card = new Card(item, '#card-template');   // Создадим экземпляр карточки
    const cardElement = card.generateCard();   // заполняем карточку и возвращаем наружу
    cardList.prepend(cardElement);  // Добавляем в DOM
  });

// создадим экземпляры класса FormValidator для каждой из форм и запишем их в отдельные именованные переменные
const profileFormValidator = new FormValidator(object, formProfile);
profileFormValidator.enableValidation(formProfile);

const cardFormValidator = new FormValidator(object, formCard);
cardFormValidator.enableValidation(formCard);