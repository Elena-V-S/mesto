export default class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl
      this.headers = headers
    }
// запрашиваем данные профиля с сервера
    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
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
            if (res.ok) {
              return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
//запрашиваем карточки 
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
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
            if (res.ok) {
              return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
   // удаление карточки

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
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
            if (res.ok) {
              return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
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
            if (res.ok) {
              return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
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
            if (res.ok) {
              return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

}