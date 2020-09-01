export default class UserInfo {
    constructor(data, userNameSelector, userActivitySelector ) {
        this._name = data.name;
        this._activity = data.activity
        this._userNameSelector = userNameSelector;
        this._userActivitySelector = userActivitySelector;
      }

      getUserInfo() { //метод возвращает данные пользователя их надо передать в форму при открытии?
            return {
              name: this._name,
              activity: this._activity
            }
      }

      setUserInfo() { // метод принимает новые данные пользователя и добавляет их на страницу
        document.querySelector(this._userNameSelector).textContent = this._name;
        document.querySelector(this._userActivitySelector).textContent = this._activity;
      }
    }