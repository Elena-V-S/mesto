let openPopupButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__close');
let formProfile = popup.querySelector('.form');
let nameInput = popup.querySelector('.form__input_type_name');
let activityInput = popup.querySelector('.form__input_type_activity');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let saveProfile = popup.querySelector('form__button');

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value;
    popup.classList.remove('popup_opened');

}

formProfile.addEventListener('submit', formSubmitHandler);
