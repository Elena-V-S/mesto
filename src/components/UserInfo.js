export default class UserInfo {
    constructor(userNameSelector, userActivitySelector, userAvatarSelector) {
        this._userNameSelector = userNameSelector;
        this._userActivitySelector = userActivitySelector;
        this._userAvatarSelector = userAvatarSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userActivity = document.querySelector(this._userActivitySelector);
        this._userAvatar = document.querySelector(this._userAvatarSelector);
      }

      getUserInfo() { //метод возвращает данные пользователя их надо передать в форму при открытии
        return {
          name: this._userName.value,
          about: this._userActivity.value,
          avatar: this._userAvatar
        } 
      }

      setUserInfo({ name, about, avatar }) { // метод принимает новые данные пользователя и добавляет их на страницу
        this._userName.textContent = name;
        this._userActivity.textContent = about;
        this._userAvatar.src = avatar;
      }
    }