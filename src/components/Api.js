export default class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl
      this.headers = headers
    }

// метод _getResponseData проверяет ответ сервера и преобразовывает его из json 
_getResponseData(res) {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    
}
// запрашиваем данные профиля с сервера
    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }
// Редактирование профиля /отправляем данные профиля на сервер
    patchUserData({name, about}) {
        return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        body: JSON.stringify({
            name: name,
            about: about
            }),
        headers: this.headers,
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }
//запрашиваем карточки 
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }
    
    getAllDates() {
        return Promise.all([this.getUserData(), this.getInitialCards()])
    }
    
    // Добавление новой карточки /отправляем новую карточку на сервер
    addNewCard({name, link}) {
        return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            link: link
        }),
        headers: this.headers
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }
   // удаление карточки

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
        })
        .then(res => {
            return this._getResponseData(res);
        })
}
// постановка лайка
addLike (cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        body: JSON.stringify({
            // likes: likes + 1
            }),
        headers: this.headers,
        })
        .then(res => {
            return this._getResponseData(res);
        })

}
//снятие лайка
deleteLike (cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: cardId,
            }),
        headers: this.headers,
        })
        .then(res => {
            return this._getResponseData(res);
        })
    
}
// смена аватара
updateAvatar (avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: avatar
            }),
        headers: this.headers,
        })
        .then(res => {
            return this._getResponseData(res);
        })
}

}