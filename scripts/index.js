let openPopupButton = document.querySelector('.profile__edit'); // находим кнопку редактирования профиля в DOM
let popup = document.querySelector('.popup'); //всплывающее окно popup
let closePopupButton = popup.querySelector('.popup__close');// кнопка закрывающая popup
let formProfile = popup.querySelector('.form'); // форма для редактирования профиля в DOM
let nameInput = popup.querySelector('.form__input_type_name'); // находим поле формы для имени в DOM
let activityInput = popup.querySelector('.form__input_type_activity');  // находим поле формы для профессии в DOM
let profileName = document.querySelector('.profile__name'); // находим элемент старницы куда записывается имя
let profileActivity = document.querySelector('.profile__activity'); // находим элемент старницы куда записывается профессия
let saveProfile = popup.querySelector('form__button');// находим кнопку сохранения внесенных в форму данных
// функци откратия и закрытия окна popup
function togglePopup() {
    if  (!(popup.classList.contains('popup_opened'))) {
        nameInput.value = profileName.textContent; //Получаем значение элемента страницы, содержащего имя, с помощью свойства value и вставляяем его в поле формы редактирования для имени
        activityInput.value = profileActivity.textContent; // аналогично для профессии
    }
    popup.classList.toggle('popup_opened');
}
// Функция - обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); //отменяем стандартную отправку формы
    profileName.textContent = nameInput.value; // Получаем значение поля формы редактирования для имени с помощью свойства value и вставляем его на страницу 
    profileActivity.textContent = activityInput.value; // аналогично для профессии
    togglePopup();
}
openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formProfile.addEventListener('submit', formSubmitHandler);
