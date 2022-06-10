import { address } from "./constants";

class Api {
  constructor(address) {
    this._address = address;
    this._headers = {
      "Content-type": "application/json",
    };
  }

  _handleResponse(response) {
    return response.ok ? response.json() : Promise.reject(response.status);
  }

  getIngredients() {
    return fetch(`${this._address}/ingredients`).then(this._handleResponse);
  }

  getOrder(ingredients) {
    return fetch(`${this._address}/orders`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(ingredients),
    }).then(this._handleResponse);
  }
}

const api = new Api(address);

export default api;
