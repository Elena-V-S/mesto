// массив картинок-карточек

import {initialCards} from './Сonfigs.js';

const cardList = document.querySelector('.elements__list');// находим элемент DOM - список карточек, куда будем добавлять карточки
// popupOverlay

const popupOverlay = Array.from(document.querySelectorAll('.popup, .popup_opened'));

const popupImage = document.querySelector('.popup-image'); //всплывающее окно popup картинки
const closeImage = popupImage.querySelector('.popup__close');// кнопка закрывающая popupImage


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
  }else if (!activePopup) {
      document.removeEventListener('keydown', closePopupWithEscape);
  };
};

//класс Card, создаёт карточку с текстом и ссылкой на изображение

class Card {
  constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

  //Приватный метод _getTemplate забирает размеку из HTML, 
  //клонирует элемент и везвращает DOM-элемент карточки
  _getTemplate () {
    const cardElement = document.querySelector(this._cardSelector).content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
    
  }

// Обработчики

  //Обработчик клика на лайк
  _handleLikeClick() {
      this._element.querySelector('.card__like').classList.toggle('card__like_color');
  }
  //Обработчик клика на корзину
  _handleDeleteClick() {
      this._element.remove();
  }
  //Обработчик клика на карточку
  _handleOpenPopup () {
      popupImage.querySelector('.popup-image__img').src = this._link; //вызываем ту фотографию которая на карточке
      popupImage.querySelector('.popup-image__title').textContent = this._name;  //выводим подпись к вартинке
      
      togglePopup(popupImage);  // открытие popupImage
  }
  //Обработчик клика на крестик
  _handleClosePopup () {
      popupImage.querySelector('.popup-image__img').src = '';
      popupImage.querySelector('.popup-image__title').src = '';
      popupImage.classList.remove('popup_opened');
  }

//Слушатель
  _setEventListeners() {  
      //слушатель клика на карточку - открой попап
      this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleOpenPopup();
          document.addEventListener('keydown', closePopupWithEscape);
      });
      //слушатель клика на лайк - закрась сердечко
      this._element.querySelector('.card__like').addEventListener('click', () => {
          this._handleLikeClick();
      });
      //слушатель клика на корзину - удали карточку
      this._element.querySelector('.card__delete').addEventListener('click', () => {
          this._handleDeleteClick();
      });

      //слушатель клика на крестик - закрой попап
      closeImage.addEventListener('click', () => {
          this._handleClosePopup();
          document.removeEventListener('keydown', closePopupWithEscape);
      }); 

     
  }

  //Публичный метод generateCard добавляет данные в разметку и 
  //возвращает готовые карточки внешним функциям
  generateCard() { 
      // Запишем разметку в приватное поле _element. 
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
      // вызов слушателя
      this._setEventListeners();

      // Добавим данные
      this._element.querySelector('.card__image').src = this._link;
      this._element.querySelector('.card__title').textContent = this._name;
      this._element.querySelector('.card__image').alt = this._name;

      // Вернём элемент наружу
      return this._element;
  
  };

};

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');   // Создадим экземпляр карточки
  const cardElement = card.generateCard();   // заполняем карточку и возвращаем наружу
  cardList.prepend(cardElement);  // Добавляем в DOM
});

export default Card;
