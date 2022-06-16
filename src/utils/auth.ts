import { address } from "./constants";

export type IResponse = Response & {
  success?: boolean;
};

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

  login(form: {}) {
    return fetch(`${this._address}/auth/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(form),
    } as {}).then(this._handleResponse);
  }

  register(form: {}) {
    return fetch(`${this._address}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(form),
    } as {}).then(this._handleResponse);
  }

  logout(form: {}) {
    return fetch(`${this._address}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(form),
    } as {}).then(this._handleResponse);
  }

  refreshToken(form: {}) {
    return fetch(`${this._address}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(form),
    } as {}).then(this._handleResponse);
  }
}

const auth = new Auth(address);

export default auth;
