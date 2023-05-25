const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.wtwr.jumpingcrab.com'
    : 'http://localhost:3001';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getItems() {
    return this._request(`${this._baseUrl}/items`);
  }

  getUser(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  }

  addItem({ name, imageUrl, weather }, token) {
    return this._request(`${this._baseUrl}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        weather,
        imageUrl,
      }),
    });
  }

  deleteItem({ itemId }, token) {
    return this._request(`${this._baseUrl}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  updateUserProfile({ name, avatar }, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    });
  }

  addCardLike({ itemId }, token) {
    return this._request(`${this._baseUrl}/items/${itemId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  removeCardLike({ itemId }, token) {
    return this._request(`${this._baseUrl}/items/${itemId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

export const api = new Api({ baseUrl });
