//класс Card, создаёт карточку с текстом и ссылкой на изображение

class Card {
  constructor({data: {name, link, likes, _id}, handleCardClick, handleDeleteIconClick, handleIconClick}, cardSelector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._handleCardClick = handleCardClick;  //Обработчик клика на карточку
    this._handleDeleteIconClick = handleDeleteIconClick; //Обработчик клика на удаление
    this._handleIconClick = handleIconClick; //Обработчик клика на лайк
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
  
  remove() {
    this._element.remove();
    this._element = null;
    }
//Слушатель
  _setEventListeners() {  
      //слушатель клика на карточку - открой попап
      this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleCardClick({ name: this._name, link: this._link, _id: this._id });
      });
      //слушатель клика на лайк - закрась сердечко и увеличь счетчик на 1
      this._element.querySelector('.card__like').addEventListener('click', () => {
          this._element.querySelector('.card__like').classList.toggle('card__like_color');
          //this._element.querySelector('.card__like-counter').textContent = 
          this._handleIconClick( {name: this._name, link: this._link, _id: this._id});
      });
      //слушатель клика на корзину - удали карточку
      this._element.querySelector('.card__delete').addEventListener('click', () => {
          this._handleDeleteIconClick({name: this._name, link: this._link, _id: this._id});
      });
  }

  //Публичный метод generateCard добавляет данные в разметку и 
  //возвращает готовые карточки внешним функциям
  generateCard(myId, ownerId) { 
      // Запишем разметку в приватное поле _element. 
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
      
      // вызов слушателя
      this._setEventListeners();
     
      this._img = this._element.querySelector('.card__image');
      this._counter = this._element.querySelector('.card__like-counter');
      
      // Добавим данные
      this._img.src = this._link;
      this._img.alt = this._name;
      this._element.querySelector('.card__title').textContent = this._name;
      this._counter.textContent = Object.keys(this._likes).length;
      
      // удалим корзину у чужих карточек
      if (myId != ownerId) {
        this._element.querySelector('.card__delete').remove();
      }
     
      // Вернём элемент наружу
      return this._element;  
  };
};

export default Card;