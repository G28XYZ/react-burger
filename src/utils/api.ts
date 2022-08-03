import { apiAddress } from './constants';

class Api {
  _address: string;
  _headers: HeadersInit;

  constructor(address: string) {
    this._address = address;
    this._headers = {
      'Content-type': 'application/json',
    };
  }

  _handleResponse(response: Response) {
    return response.ok ? response.json() : Promise.reject(response.status);
  }

  getIngredients() {
    return fetch(`${this._address}/ingredients`).then(this._handleResponse);
  }

  getOrder(ingredients: string[], token: string) {
    return fetch(`${this._address}/orders`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ ingredients }),
    }).then(this._handleResponse);
  }
}

const api = new Api(apiAddress);

export default api;
