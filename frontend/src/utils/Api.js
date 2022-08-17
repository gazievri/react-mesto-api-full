export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }
  //метод загружает данные пользователя с сервера и возвращает их как объект
  getInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
  //метод запрашивает данные с карточками с сервера
  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
  //Метод отправляет данные пользователя на сервер
  sendNewProfileData(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  //Метод отправляет данные новой карточки на сервер
  sendNewCardData(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  deleteCard(data) {
    return fetch(`${this._url}cards/${data._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
        console.log(res.json());
        const info = res.json();
        console.log(info.data)
        return info.data;
    }
    return Promise.reject(`Error: ${res.status}`)
  }
}

let token = localStorage.getItem('jwt');

export const api = new Api ({
  baseUrl: 'http://api.gazievri.mesto.nomoredomains.sbs/',
  headers: {
    "authorization" : `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
