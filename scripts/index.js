import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {object, initialCards} from './Сonfigs.js';


// popupOverlay

const popupOverlay = Array.from(document.querySelectorAll('.popup, .popup_opened'));

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

// popupImage

const popupImage = document.querySelector('.popup-image'); //всплывающее окно popup картинки
const closeImage = popupImage.querySelector('.popup__close');// кнопка закрывающая popupImage

// находим элементы страницы 

const profileName = document.querySelector('.profile__name'); // находим элемент старницы куда записывается имя
const profileActivity = document.querySelector('.profile__activity'); // находим элемент старницы куда записывается профессия

const cardList = document.querySelector('.elements__list');// находим элемент DOM - список карточек, куда будем добавлять карточки
const cardTemplate = document.querySelector('#card-template').content;//получаем шаблон template, его содержимое


// функци открытия / закрытия окна popup
function togglePopup(popupType) {
    if (popupType.classList.contains('popup_opened')) {
        document.removeEventListener('keydown', closePopupWithEscape);
    };
    popupType.classList.toggle('popup_opened'); // добавляет или удаляет класс отвечающий за скрытие попапа
}; 


//функция закрытия попапа кликом на оверлей: клик должен быть совершен вне самого модального окна

popupOverlay.forEach((popupElement) => {
    popupElement.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup_opened') && 
        !(evt.target.classList.contains('popup__container') || evt.target.classList.contains('form') 
        || evt.target.classList.contains('popup__title') || evt.target.classList.contains('form__label') 
        || evt.target.classList.contains('form__input'))) {
            popupElement.classList.remove('popup_opened');
            document.removeEventListener('keydown', closePopupWithEscape);
        }
    });
});

//функция закрывающая попап при нажатия на клавишу Escape
function closePopupWithEscape(event) {
    const activePopup = document.querySelector('.popup_opened');
    if (event.key === 'Escape' && activePopup) {
        activePopup.classList.remove('popup_opened');
    } else if (!activePopup) {
        document.removeEventListener('keydown', closePopupWithEscape);
    };
};

//  функция заполнения полей формы редактирования профайла

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

  // Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.remove(object.inputErrorClass);// удаляем стили поля input
    errorElement.classList.remove(object.errorClass);// удаляем сообщение об ошибке
    errorElement.textContent = ''; // очищаем текст сообщения об ошибке
};


//слушатели
openPopupProfile.addEventListener('click', () => { //кнопка открытия попап редактирования профиля
    hideInputError(formProfile, nameInput);// сбрасываем стили невалидных полей
    hideInputError(formProfile, activityInput);
    saveProfile.classList.remove('form__button_inactive');//делаем кнопку активной
    fieldInputs();
    togglePopup(popupProfileEdit);
    document.addEventListener('keydown', closePopupWithEscape);
}); 

openPopupCard.addEventListener('click', () => {  //кнопка открытия попап добавления карточки
    hideInputError(formCard, placeInput);// сбрасываем стили невалидных полей
    hideInputError(formCard, linkInput);
    saveCard.classList.add('form__button_inactive'); //делаем кнопку неактивной
    saveCard.setAttribute('disabled', true);
    formCard.reset();
    togglePopup(popupCardEdit);
    document.addEventListener('keydown', closePopupWithEscape);
});

closePopupProfile.addEventListener('click', () => {  // кнопка закрытия попапа редактирования профиля
    togglePopup(popupProfileEdit);
    document.removeEventListener('keydown', closePopupWithEscape);
}); 

closePopupCard.addEventListener('click', () => {  // кнопка закрытия попапа добавления карточки
    togglePopup(popupCardEdit);
    document.removeEventListener('keydown', closePopupWithEscape);
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