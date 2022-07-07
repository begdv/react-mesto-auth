import {configApiAuth} from './const.js';

class ApiAuth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }    
  register({email, password}) {
    return fetch(`${this._url}signup`, {
      method: 'POST',      
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      })      
    })
      .then((res) => {
          return this._processResult(res);
      });
  }  
  login({email, password}) {
    return fetch(`${this._url}signin`, {
      method: 'POST',      
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      })      
    })
      .then((res) => {
          return this._processResult(res);
      });
  }  
  verifyToken(token) {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
      body: JSON.stringify({
        token: token,
      })      
    })
      .then((res) => {
          return this._processResult(res);
      });
  }    
}  

export const apiAuth = new ApiAuth(configApiAuth);