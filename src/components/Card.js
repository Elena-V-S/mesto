//класс Card, создаёт карточку с текстом и ссылкой на изображение

class Card {
  constructor({data: {name, link}, handleCardClick}, cardSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;  //Обработчик клика на карточку
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

//Слушатель
  _setEventListeners() {  
      //слушатель клика на карточку - открой попап
      this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleCardClick({ name: this._name, link: this._link });
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