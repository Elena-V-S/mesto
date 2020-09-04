export default class UserInfo {
    constructor(userNameSelector, userActivitySelector) {
        this._userNameSelector = userNameSelector;
        this._userActivitySelector = userActivitySelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userActivity = document.querySelector(this._userActivitySelector);
      }

      getUserInfo() { //метод возвращает данные пользователя их надо передать в форму при открытии?
            return {
              name: this._name,
              activity: this._activity
            }
      }

      setUserInfo({ name, activity }) { // метод принимает новые данные пользователя и добавляет их на страницу
        this._userName.textContent = name;
        this._userActivity.textContent = activity;
      }
    }