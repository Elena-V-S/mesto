const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
const formProfile = popup.querySelector('.form');
const nameInput = popup.querySelector('.form__input_type_name');
const activityInput = popup.querySelector('.form__input_type_activity');
const profileName = popup.querySelector('.profile__name');
const profileActivity = popup.querySelector('.profile__activity');

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value;
}

formProfile.addEventListener('submit', formSubmitHandler);
