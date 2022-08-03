import { apiAddress } from './constants';

class Auth {
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

  async login(form: {}) {
    return await fetch(`${this._address}/auth/login`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'same-origin',
      body: JSON.stringify(form),
    }).then(this._handleResponse);
  }

  async register(form: {}) {
    return await fetch(`${this._address}/auth/register`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'same-origin',
      body: JSON.stringify(form),
    }).then(this._handleResponse);
  }

  async logout(token: string) {
    return await fetch(`${this._address}/auth/logout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'same-origin',
      body: JSON.stringify({ token }),
    }).then(this._handleResponse);
  }

  async forgotPassword(email: string) {
    return await fetch(`${this._address}/password-reset`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'same-origin',
      body: JSON.stringify({ email }),
    }).then(this._handleResponse);
  }

  async resetPassword(password: string, token: string) {
    return await fetch(`${this._address}/password-reset/reset`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'same-origin',
      body: JSON.stringify({ password, token }),
    }).then(this._handleResponse);
  }

  async refreshToken(token: string) {
    return await fetch(`${this._address}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: this._headers,
      credentials: 'same-origin',
      body: JSON.stringify({ token }),
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then(this._handleResponse);
  }

  async getUser(token: string) {
    return await fetch(`${this._address}/auth/user`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        ...this._headers,
        Authorization: 'Bearer ' + token,
      },
    }).then(this._handleResponse);
  }

  async editUser(form: {}) {
    return await fetch(`${this._address}/auth/user`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'same-origin',
      body: JSON.stringify(form),
    }).then(this._handleResponse);
  }
}

const auth = new Auth(apiAddress);

export default auth;
