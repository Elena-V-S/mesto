// popupProfile 

const openPopupProfile = document.querySelector('.profile__edit'); // находим кнопку редактирования профиля в DOM
const popupProfileEdit = document.querySelector('.popup_type_edit'); //всплывающее окно popup редактирования профиля
const closePopupProfile = popupProfileEdit.querySelector('.popup__close');// кнопка закрывающая popup
const formProfile = popupProfileEdit.querySelector('.form'); // форма для редактирования профиля в DOM
const nameInput = popupProfileEdit.querySelector('.form__input_type_name'); // находим поле формы для имени в DOM
const activityInput = popupProfileEdit.querySelector('.form__input_type_activity');  // находим поле формы для профессии в DOM
const saveProfile = popupProfileEdit.querySelector('form__button');// находим кнопку сохранения внесенных в форму данных

// popupCard 

const openPopupCard = document.querySelector('.profile__card-edit');// находим кнопку добавления карточки в DOM
const popupCardEdit = document.querySelector('.popup_type_new-card'); //всплывающее окно popup добавления карточки
const closePopupCard = popupCardEdit.querySelector('.popup__close');// кнопка закрывающая popup
const formCard = popupCardEdit.querySelector('.form'); // форма для добавления карточки в DOM
const saveCard = popupCardEdit.querySelector('form__button');// находим кнопку сохранения новой карточки
const placeInput = popupCardEdit.querySelector('.form__input_type_name'); // находим поле формы для добавления названия места
const linkInput = popupCardEdit.querySelector('.form__input_type_activity');  // находим поле для добавления ссылки на картинку

// popupImage

const popupImage = document.querySelector('.popup-image'); //всплывающее окно popup картинки
const closeImage = popupImage.querySelector('.popup__close');// кнопка закрывающая popupImage


// находим элементы страницы куда записываются новые данные или из которых считываются данные профиля

const profileName = document.querySelector('.profile__name'); // находим элемент старницы куда записывается имя
const profileActivity = document.querySelector('.profile__activity'); // находим элемент старницы куда записывается профессия


// функци открытия / закрытия окна popup

function togglePopup(type) {
    if  (type === popupProfileEdit && !(type.classList.contains('popup_opened'))) {// в момент открытия модального окна popupProfileEdit данные со страницы вставляются в поля формы 
        nameInput.value = profileName.textContent; //Получаем значение элемента страницы, содержащее имя, с помощью свойства textContent и вставляяем его в поле формы для имени с помощью свойства value
        activityInput.value = profileActivity.textContent; // аналогично для профессии
    } else if  (type === popupCardEdit && !(type.classList.contains('popup_opened'))) { // в момент открытия модального окна popupCardeEdit  происходит сброс заполненных полей формы 
        formCard.reset();
   }
    
    type.classList.toggle('popup_opened');// добавляет или удаляет класс отвечающий за скрытие попапа
}

// Функция - обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); //отменяем стандартную отправку формы
    profileName.textContent = nameInput.value; // Получаем значение поля формы редактирования для имени с помощью свойства value и вставляем его на страницу 
    profileActivity.textContent = activityInput.value; // аналогично для профессии
    togglePopup(popupProfileEdit);

}

//функция клонирование и заполнение карточек
function createCard(elem) {
    const cardList = document.querySelector('.elements__list');// находим элемент DOM - список карточек, куда будем добавлять карточки
    const cardTemplate = document.querySelector('#card-template').content;//получаем шаблон template, его содержимое
    const cardElement = cardTemplate.cloneNode(true); // клонируем шаблон template
    //в созданной карточке находим ее картинку, сердечо, корзину и название места
    const openPopupImage = cardElement.querySelector('.card__image');
    const cardDelete = cardElement.querySelector('.card__delete');
    const cardLike = cardElement.querySelector('.card__like'); 
    const cardTitle = cardElement.querySelector('.card__title'); 

    // наполняем содержимым
    cardElement.querySelector('.card__image').src = elem.link;
    cardTitle.textContent = elem.name;

    // навешиваем слушатель на лайк, корзину, картинку и кнопку закрытия попапа

    openPopupImage.addEventListener('click', (evt) => {   // клик по карточке - открытие popupImage
        popupImage.querySelector('.popup-image__img').src = evt.target.closest('img').getAttribute('src');  //вызываем ту фотографию которая на карточке
        popupImage.querySelector('.popup-image__title').textContent = cardTitle.textContent; //выводим подпись к вартинке
        togglePopup(popupImage);
    });

    cardDelete.addEventListener('click', (evt) => {  //корзина - удаление карточки
        evt.target.closest(".card").remove();

    });

    cardLike.addEventListener('click', (evt) => {         //при клике на сердечко меняется его цвет
        evt.target.classList.toggle('card__like_color');
    });
    
    // добавляем карточки на страницу
    cardList.prepend(cardElement);
};


//слушатели
openPopupProfile.addEventListener('click', () => togglePopup(popupProfileEdit)); //кнопка открытия редактирования профиля
openPopupCard.addEventListener('click', () => togglePopup(popupCardEdit)); //кнопка открытия добавления карточки
closePopupProfile.addEventListener('click', () => togglePopup(popupProfileEdit)); // кнопка закрытия редактирования профиля
closePopupCard.addEventListener('click', () => togglePopup(popupCardEdit));// кнопка закрытия добавления карточки
formProfile.addEventListener('submit', formSubmitHandler); //сохранения данных профиля
formCard.addEventListener('submit', (elem) => {                // сохранение добавленной карточки
    elem.preventDefault(); //отменяем стандартную отправку формы
    let el = {name: placeInput.value, link: linkInput.value};//достаем значения полей из формы
    createCard(el);  // вызываем функцию и создаем карточкиу с полученными значениями
    togglePopup(popupCardEdit);// закрываем попап
});

closeImage.addEventListener('click', () => togglePopup(popupImage));// кнопка закрытия popupImage


// массив картинок-карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//переберем элементы массива initialCards и вызовем функцию создания карточки на каждом элементе
initialCards.forEach(createCard);



//функция клонирование и заполнение карточек
function createCard(elem) {
    const cardList = document.querySelector('.elements__list');// находим элемент DOM - список карточек, куда будем добавлять карточки
    const cardTemplate = document.querySelector('#card-template').content;//получаем шаблон template, его содержимое
    const cardElement = cardTemplate.cloneNode(true); // клонируем шаблон template
    //в созданной карточке находим ее картинку, сердечо, корзину и название места
    const openPopupImage = cardElement.querySelector('.card__image');
    const cardDelete = cardElement.querySelector('.card__delete');
    const cardLike = cardElement.querySelector('.card__like'); 
    const cardTitle = cardElement.querySelector('.card__title'); 

    // наполняем содержимым
    cardElement.querySelector('.card__image').src = elem.link;
    cardTitle.textContent = elem.name;

    // навешиваем слушатель на лайк, корзину, картинку и кнопку закрытия попапа

    openPopupImage.addEventListener('click', (evt) => {   // клик по карточке - открытие popupImage
        popupImage.querySelector('.popup-image__img').src = evt.target.closest('img').getAttribute('src');  //вызываем ту фотографию которая на карточке
        popupImage.querySelector('.popup-image__title').textContent = cardTitle.textContent; //выводим подпись к вартинке
        togglePopup(popupImage);
    });

    cardDelete.addEventListener('click', (evt) => {  //корзина - удаление карточки
        evt.target.closest(".card").remove();

    });

    cardLike.addEventListener('click', (evt) => {         //при клике на сердечко меняется его цвет
        evt.target.classList.toggle('card__like_color');
    });
    
    // добавляем карточки на страницу
    cardList.prepend(cardElement);
};
