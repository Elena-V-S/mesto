import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._img = this._popup.querySelector('.popup-image__img');
        this._title = this._popup.querySelector('.popup-image__title');
        }
 
  open({name, link}) {
    super.open();
    this._img.src = link; //вызываем ту фотографию которая на карточке
    this._title.textContent = name;  //выводим подпись к вартинке
  }
}