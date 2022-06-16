import { address } from "./constants";
import { getCookie } from "./getCookie";

class Auth {
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

  async login(form: {}) {
    return await fetch(`${this._address}/auth/login`, {
      method: "POST",
      headers: this._headers,
      credentials: "same-origin",
      body: JSON.stringify(form),
    } as {}).then(this._handleResponse);
  }

  async register(form: {}) {
    return await fetch(`${this._address}/auth/register`, {
      method: "POST",
      headers: this._headers,
      credentials: "same-origin",
      body: JSON.stringify(form),
    } as {}).then(this._handleResponse);
  }

  async logout(form: {}) {
    return await fetch(`${this._address}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      credentials: "same-origin",
      body: JSON.stringify(form),
    } as {}).then(this._handleResponse);
  }

  async refreshToken(token: string) {
    return await fetch(`${this._address}/auth/token`, {
      method: "POST",
      headers: this._headers,
      credentials: "same-origin",
      body: JSON.stringify({ token }),
    } as {}).then(this._handleResponse);
  }

  getUser() {
    console.log(getCookie("refreshToken"));
    return fetch(`${this._address}/auth/user`, {
      method: "GET",
      credentials: "includes",
      headers: {
        ...this._headers,
        authorization: "Bearer " + getCookie("refreshToken"),
      },
    } as {}).then(this._handleResponse);
  }

  async editUser(form: {}) {
    return await fetch(`${this._address}/auth/user`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "same-origin",
      body: JSON.stringify(form),
    } as {}).then(this._handleResponse);
  }
}

const auth = new Auth(address);

export default auth;
