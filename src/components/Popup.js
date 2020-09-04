
export default class Popup {
    constructor( popupSelector ) {
      this._popupSelector = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this);
      this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened'); 
       
    }

    _handleEscClose() { // обработчик клика на Esc
            if (event.key === 'Escape') {
                this.close();
            };
        };

    _handleOverlayClose() {  // обработчик клика на Overlay
        if (event.target.classList.contains('popup_opened')) {
            this.close(event.target);
        };
    }
    // слушатели
    setEventListeners(){
        this._popup.querySelector('.popup__close').addEventListener('click', () => {// слушатель клика на крестик
            this.close();
        });
        this._popup.addEventListener('click', () => { //слушатель клика на оверлей: клик должен быть совершен вне самого модального окна
            this._handleOverlayClose();  
        });
        document.addEventListener('keydown', this._handleEscClose);//добавляем слушатель клика на Esc
    }
     
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);//снятие слушателя клика на Esc
    }
}