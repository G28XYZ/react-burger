import { address } from "./constants";

class Api {
  constructor(address) {
    this._address = address;
  }

  _handleResponse(response) {
    return response.ok ? response.json() : Promise.reject("Ошибка получения данных");
  }

  getIngredients() {
    return fetch(this._address).then(this._handleResponse).catch(console.log);
  }
}

const api = new Api(address);

export default api;
