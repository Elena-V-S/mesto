const object = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',//дезактивация кнопки
    inputErrorClass: 'form__input_type_error',//стили поля ввода, подсветка
    errorClass: 'form__input-error_active',//span
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции, тогда функция будет работать с любым полем внутри формы
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(object.inputErrorClass);//изменяет стили поля с некорректными данными
    errorElement.textContent = errorMessage; // добавяет текст сообщения об ошибке
    errorElement.classList.add(object.errorClass);
  };
  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.remove(object.inputErrorClass);// удаляем стили поля input
    errorElement.classList.remove(object.errorClass);// удаляем сообщение об ошибке
    errorElement.textContent = ''; // очищаем текст сообщения об ошибке
  };
// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError имеет два параметра: форму, в которой находится проверяемое поле, 
      //само поле input и локализованное сообщение об ошибке
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // hideInputError получает параметрами форму и поле input в ней
      hideInputError(formElement, inputElement);
    }
  };
  // Функция проверяет одновременную валидность всех полей одной формы
  const hasInvalidInput = (inputList) => {// принимает массив полей формы
    return inputList.some((inputElement) => { //обходит массив методом some
      return !inputElement.validity.valid;// вернет true если хоть одно поле невалидно
    });
  };
  // Функция активации кнопки ("отправить" или "сохранить")
  const toggleButtonState = (inputList, buttonElement) => {//принимает массив полей и элемент кнопки
    if (hasInvalidInput(inputList)) {//проверяет поля на валидность
      buttonElement.classList.add(object.inactiveButtonClass);//неактивная кнопка
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(object.inactiveButtonClass);//активная кнопка
      buttonElement.disabled = false;
    }
  };
  
//Функция, которая добавляет обработчики всем полям формы и активирует кнопку
const setEventListeners = (formElement) => {
    // Находим все поля внутри формы, и  методом Array.from сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    inputList.forEach((inputElement) => {  // Обойдём массив и каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
        // проверим все поля на валидность и проверим кнопку
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
         });
    });
  };
//Функция валидации всех форм
const enableValidation = (object) => {
     const forms = Array.from(document.querySelectorAll(object.formSelector));//массив форм
     forms.forEach((formElement) => {
       formElement.addEventListener('submit', (event) => {
           event.preventDefault(); //отменяем стандартную отправку формы
       });
       setEventListeners(formElement);
       
   });
 }
enableValidation(object);

