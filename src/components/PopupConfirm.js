import Popup from '../components/Popup.js';

export default class PopupConfirm extends Popup {
    constructor( popupSelector, submitAction ) {
        super(popupSelector);
        this.submitAction = submitAction;

    }
      
    setSubmitAction(submitAction) {
        this._handleSubmitPopup = submitAction;
    };
 
    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault(); //отменяем стандартную отправку формы
            this._handleSubmitPopup();//вызываем обработчик
        });
    }
  }