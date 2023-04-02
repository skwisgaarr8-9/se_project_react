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

  addItem({ name, imageUrl, weather }) {
    return this._request(`${this._baseUrl}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        weather: weather,
        imageUrl: imageUrl,
      }),
    });
  }

  deleteItem({ itemId }) {
    return this._request(`${this._baseUrl}/items/${itemId}`, {
      method: "DELETE",
    });
  }
}

export default new Api({
  baseUrl: "https://my-json-server.typicode.com/skwisgaarr8-9/se_project_react",
});
