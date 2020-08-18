
export const popupImage = document.querySelector('.popup-image'); //всплывающее окно popup картинки
export const closeImage = popupImage.querySelector('.popup__close');// кнопка закрывающая popupImage

// функция открытия / закрытия окна popup
export function togglePopup(popupType) {
    if (popupType.classList.contains('popup_opened')) {
        document.removeEventListener('keydown', closePopupWithEscape);
    } else {
        document.addEventListener('keydown', closePopupWithEscape);
    };
    popupType.classList.toggle('popup_opened'); // добавляет или удаляет класс отвечающий за скрытие попапа
    
  };

//функция закрывающая попап при нажатия на клавишу Escape
export function closePopupWithEscape(event) {
    const activePopup = document.querySelector('.popup_opened');
    if (event.key === 'Escape' && activePopup) {
        togglePopup(activePopup);
    };
};

//функция закрытия попапа кликом на оверлей: клик должен быть совершен вне самого модального окна
export function closePopupOverlai(event) {
    if (event.target.classList.contains('popup_opened')) {
        togglePopup(event.target);
    }
}