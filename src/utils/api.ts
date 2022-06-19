import { address } from "./constants";

class Api {
  _address: string;
  _headers: { [ket: string]: string | number };

  constructor(address: string) {
    this._address = address;
    this._headers = {
      "Content-type": "application/json",
    };
  }

  _handleResponse(response: Response) {
    return response.ok ? response.json() : Promise.reject(response.status);
  }

  getIngredients() {
    return fetch(`${this._address}/ingredients`).then(this._handleResponse);
  }

  getOrder(ingredients: {}) {
    return fetch(`${this._address}/orders`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(ingredients),
    } as {}).then(this._handleResponse);
  }
}

const api = new Api(address);

export default api;
