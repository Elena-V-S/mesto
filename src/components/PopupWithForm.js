import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor( {popupSelector, handleSubmitPopup }) {
        super(popupSelector);
        this._handleSubmitPopup = handleSubmitPopup;  
      }
 // собираем данные
      _getInputValues() {
          this._inputList =  this._popup.querySelectorAll('.form__input'); //// достаём все элементы полей
          this._formValues = {};   // создаём пустой объект
          this._inputList.forEach(input => {  // добавляем в этот объект значения всех полей
              this._formValues[input.name] = input.value;
            });
        return this._formValues;  // возвращаем объект значений
      
        }
        
        setEventListeners() {
            super.setEventListeners();
            this._form = this._popup.querySelector('.form');
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault(); //отменяем стандартную отправку формы
                this._handleSubmitPopup(this._getInputValues());//вызываем обработчик который создает карточку
                
            })
        }
    
        close() {
            this._form.reset();
            super.close();
        }
    }