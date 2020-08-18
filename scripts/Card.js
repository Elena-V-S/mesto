
import {popupImage, togglePopup} from './utils.js';

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

//Слушатель
  _setEventListeners() {  
      //слушатель клика на карточку - открой попап
      this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleOpenPopup();
      });
      //слушатель клика на лайк - закрась сердечко
      this._element.querySelector('.card__like').addEventListener('click', () => {
          this._handleLikeClick();
      });
      //слушатель клика на корзину - удали карточку
      this._element.querySelector('.card__delete').addEventListener('click', () => {
          this._handleDeleteClick();
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
      this._img = this._element.querySelector('.card__image');

      // Добавим данные
      this._img.src = this._link;
      this._img.alt = this._name;
      this._element.querySelector('.card__title').textContent = this._name;
      
      // Вернём элемент наружу
      return this._element;  
  };
};

export default Card;
