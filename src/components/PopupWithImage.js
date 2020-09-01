import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(name, link, popupSelector) {
        super(popupSelector);
        this._name = name;
        this._link = link;
        }
 
  open() {
    this._popup = super._getTemplate(); // создаём элемент
    super.open();
    this._popup.querySelector('.popup-image__img').src = this._link; //вызываем ту фотографию которая на карточке
    this._popup.querySelector('.popup-image__title').textContent = this._name;  //выводим подпись к вартинке
  }
}