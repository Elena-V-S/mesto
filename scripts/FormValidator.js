class FormValidator {
    constructor(data, formElement) {
        this._formElement = formElement;
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;//дезактивация кнопки
        this._inputErrorClass = data.inputErrorClas;//стили поля ввода, подсветка
        this._errorClass = data.errorClass;
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);//изменяет стили поля с некорректными данными
        errorElement.textContent = errorMessage; // добавяет текст сообщения об ошибке
        errorElement.classList.add(this._errorClass);
    } 
    hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
        inputElement.classList.remove(this._inputErrorClass);// удаляем стили поля input
        errorElement.classList.remove(this._errorClass);// удаляем сообщение об ошибке
        errorElement.textContent = ''; 
    }
    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            // showInputError имеет два параметра: поле input и локализованное сообщение об ошибке
            this._showInputError(inputElement, inputElement.validationMessage);
          } else { 
            this.hideInputError(inputElement); // hideInputError получает параметром поле input
          }
    }
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => { //обходит массив методом some
            return !inputElement.validity.valid;// вернет true если хоть одно поле невалидно
          });

    }
    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {//проверяет поля на валидность
            buttonElement.classList.add(this._inactiveButtonClass);//неактивная кнопка
            buttonElement.disabled = true;
          } else {
            buttonElement.classList.remove(this._inactiveButtonClass);//активная кнопка
            buttonElement.disabled = false;
          }
    }

    //Функция, которая добавляет обработчики всем полям формы и активирует кнопку
    _setEventListeners () {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        // Найдём в текущей форме кнопку отправки
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        inputList.forEach((inputElement) => {  // Обойдём массив и каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
                // Внутри колбэка вызовем checkInputValidity, передав ей проверяемый элемент
                // проверим все поля на валидность и проверим кнопку
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation (formElement) {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); //отменяем стандартную отправку формы
        });
        this._setEventListeners(formElement);
  }
};

export default FormValidator;

