
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {object} from '../utils/configs.js';
import './index.css';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm.js';


// popupProfile 

const openPopupProfile = document.querySelector('.profile__edit'); // находим кнопку редактирования профиля в DOM
const popupProfileEdit = document.querySelector('.popup_type_edit'); //всплывающее окно popup редактирования профиля
const formProfile = popupProfileEdit.querySelector('.form'); // форма для редактирования профиля в DOM
const popupaAvatarUpdate = document.querySelector('.popup_type_avatar'); //всплывающее окно popup редактирования аватара
const formAvatar = popupaAvatarUpdate.querySelector('.form');
const profileFoto = document.querySelector('.profile__avatar-img'); //фото пользователя


// popupCard 

const openPopupCard = document.querySelector('.profile__card-edit');// находим кнопку добавления карточки в DOM
const popupCardEdit = document.querySelector('.popup_type_new-card'); //всплывающее окно popup добавления карточки
const formCard = popupCardEdit.querySelector('.form'); // форма для добавления карточки в DOM


// находим элементы страницы 

const profileName = document.querySelector('.profile__name'); // находим элемент старницы куда записывается имя
const profileActivity = document.querySelector('.profile__activity'); // находим элемент старницы куда записывается профессия


// создадим экземпляр класса Section

const cardsList = new Section({
    data: [],
  },
  '.elements__list'
);

// создадим экземпляры класса FormValidator для каждой из форм и запишем их в отдельные именованные переменные

const profileFormValidator = new FormValidator(object, formProfile);
profileFormValidator.enableValidation(formProfile);

const cardFormValidator = new FormValidator(object, formCard);
cardFormValidator.enableValidation(formCard);

const avatarFormValidator = new FormValidator(object, formAvatar);
avatarFormValidator.enableValidation(formAvatar);


// создадим экземпляр класса Popupconfirm
const confirmPopoup = new PopupConfirm('.popup_type_confirm');


// функция createCard создадает экземпляр класса Card
function createCard(item) {
    const card = new Card({
        data: item, 
        //обработчик клика на карточку
        handleCardClick: (item) => {
           const popupImage = new PopupWithImage('.popup-image');   // Создадим экземпляр попапа-карточки
           popupImage.open(item); 
           popupImage.setEventListeners()
        }, 
        //обработчик клика на корзину
        handleDeleteIconClick: (item) => {
            confirmPopoup.setSubmitAction(() => {
                api.deleteCard(item._id)
                .then((res) => {
                   card.remove();
                })
                .then((res) => {
                   confirmPopoup.close()
                })
            .catch((err) => {
                renderError(`Ошибка: ${err}`);
            });
            }
        );
            confirmPopoup.open();
            confirmPopoup.setEventListeners();  
        },
        
       // обработчик клика на лайк
        handleIconClick: (item) => {  
            if (card._element.querySelector('.card__like').classList.contains('card__like_color')) {
                api.addLike(item._id, item._likes)
                .then((res) => {
                    card._counter.textContent = Object.keys(res.likes).length;
                })
                .catch((err) => {
                    renderError(`Ошибка: ${err}`);
                });
            } else {
                api.deleteLike (item._id)
                .then((res) => {
                    card._counter.textContent = Object.keys(res.likes).length;
                })
                .catch((err) => {
                    renderError(`Ошибка: ${err}`);
                });
            } 
        }
        },
        '#card-template');   
    return card;
}
// создаем экземпляр UserCard передаём ему селекторы трёх классов:
// элемента имени пользователя, элемента информации о пользователе и фото .
    
const user = new UserInfo('.profile__name', '.profile__activity', '.profile__avatar-img');


// создадим экземпляры класса  PopupWithForm для каждого из попапов

// попап редактирования профиля
const popupProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit', 
    handleSubmitPopup: (formData) => {
        popupProfile._form.querySelector('.form__button').textContent = "Сохранение...";
        api.patchUserData(formData)
        .then((res) => {
            user.setUserInfo(res);// добавляем новые данные на страницу
        })
        .then((res) => {
            popupProfile.close();
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        });
    }
});
popupProfile.setEventListeners();

// попап добавления карточки

const popupCardAdd = new PopupWithForm({
    popupSelector: '.popup_type_new-card', 
    handleSubmitPopup: (formData) => { 
        popupCardAdd._form.querySelector('.form__button').textContent = "Сохранение...";
        api.addNewCard(formData)
           .then((res) => {              
            const newCard = createCard(res);  // создаем экземпляр Card передаём ему объект с данными формы
            const cardElement = newCard.generateCard();  // заполняем карточку и возвращаем наружу
            cardsList.addItem(cardElement); // Добавляем в DOM
        })
        .then((res) => {              
            popupCardAdd.close();      
        })
        .catch((err) => {  // обрабатываем ошибку 
            console.log(err); 
        });
    }
});
popupCardAdd.setEventListeners();

// попап замены аватара
const popupAvatarUpdate = new PopupWithForm({
    popupSelector: '.popup_type_avatar', 
    handleSubmitPopup: (formData) => { 
        popupAvatarUpdate._form.querySelector('.form__button').textContent = "Сохранение...";
        api.updateAvatar(formData.link)
        .then((res) => {
            user.setUserInfo(res);// добавляем новые данные на страницу
        })
        .then((res) => {              
            popupAvatarUpdate.close();      
        })
        .catch((err) => {  // обрабатываем ошибку 
            console.log(err); 
        });

    }
})

popupAvatarUpdate.setEventListeners();

//слушатели
openPopupProfile.addEventListener('click', () => { //кнопка открытия попап редактирования профиля
    const nameInput = popupProfile._form.querySelector('#name-input');
    const activityInput = popupProfile._form.querySelector('#activity-input');
    profileFormValidator.hideInputError(nameInput);// сбрасываем стили невалидных полей
    profileFormValidator.hideInputError(activityInput);
    popupProfile._form.querySelector('.form__button').classList.remove('form__button_inactive');
    popupProfile.open();
    
    // заполняем поля попапа при открытии
    nameInput.value = profileName.textContent; //Получаем значение элемента страницы, содержащее имя, с помощью свойства textContent и вставляяем его в поле формы для имени с помощью свойства value
    activityInput.value = profileActivity.textContent; // аналогично для профессии

});

openPopupCard.addEventListener('click', () => {  //кнопка открытия попап добавления карточки
    const placeInput = popupCardAdd._form.querySelector('#place-input');
    const linkInput = popupCardAdd._form.querySelector('#link-input');
    const popupButton = popupCardAdd._form.querySelector('.form__button');
    cardFormValidator.hideInputError(placeInput);// сбрасываем стили невалидных полей
    cardFormValidator.hideInputError(linkInput);
    popupButton.classList.add('form__button_inactive'); //делаем кнопку неактивной
  
    popupCardAdd.open();
});

profileFoto.addEventListener('click', () => { //кнопка открытия попап редактирования аватара
    popupAvatarUpdate.open();
});

// создадим экземпляры класса Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: {
      authorization: 'b190b4e3-5f2a-4dfe-bfc3-000b560121c2',
      'Content-Type': 'application/json'
    }
  });


api.getAllDates()
.then(arg => {  // обрабатываем результат
    const [dataProfile, dataCards] = arg;
    //добавляем данные профиля на страницу
    profileName.textContent = dataProfile.name;
    profileActivity.textContent = dataProfile.about;
    profileFoto.src = dataProfile.avatar;
   
   
    //добавляем карточки на страницу
    const cardsList = new Section({
        items: dataCards,
        renderer: (item) => { 
            const newCard = createCard(item);
            const cardElement = newCard.generateCard(dataProfile._id, item.owner._id );  // заполняем карточку и возвращаем наружу
         
            cardsList.addItem(cardElement); // Добавляем в DOM
        },
      },
      '.elements__list'
    );
    cardsList.renderItems();
})
.catch((err) => {  // обрабатываем ошибку 
    console.log(err); 
  });