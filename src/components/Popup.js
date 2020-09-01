import FormValidator from './FormValidator.js';
import {object} from './configs.js';

export default class Popup {
    constructor( popupSelector ) {
      this._popupSelector = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this);
    }
    //Приватный метод _getTemplate забирает размеку из HTML, 
    //клонирует элемент и возвращает DOM-элемент попапа
    _getTemplate() {
        const formPopup = document.querySelector(this._popupSelector).content
        .querySelector('.popup')
        .cloneNode(true);
        return formPopup;
    }

    open() {
        this._popup = this._getTemplate(); // создаём элемент
        this._popup.classList.add('popup_opened'); 
        this.setEventListeners(); 
        document.querySelector('.page').append(this._popup); 
        const profileFormValidator = new FormValidator(object, this._popup); //добавляем валидацию инпутов
        profileFormValidator.enableValidation(this._popup);
    }

    _handleEscClose() { // обработчик клика на Esc
            if (event.key === 'Escape') {
                this.close();
            };
        };
    // слушатели
    setEventListeners(){
        this._popup.querySelector('.popup__close').addEventListener('click', () => {// слушатель клика на крестик
            this.close();
        });
        this._popup.addEventListener('click', () => { //слушатель клика на оверлей: клик должен быть совершен вне самого модального окна
            if (event.target.classList.contains('popup_opened')) {
                this.close(event.target);
            };
        });
        document.addEventListener('keydown', this._handleEscClose);//добавляем слушатель клика на Esc
    }
     
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);//снятие слушателя клика на Esc
    }
}