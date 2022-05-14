import { address } from "./constants";

class Api {
  constructor(address) {
    this.address = address;
  }

  handleResponse(response) {
    return response.ok ? response.json() : Promise.reject("Ошибка получения данных");
  }

  getIngredients() {
    return fetch(this.address).then(this.handleResponse).catch(console.log);
  }
}

const api = new Api(address);

export default api;
