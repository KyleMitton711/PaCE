import APIService from "@/http.js";
const API = new APIService();

export default class AuthService {
  signIn (payload) {
    return API.post('/api/token', payload)
    .then(result => {
      return result;
    })
    .catch(e => {
      throw e;
    });
  }

  register (payload) {
    return API.post('users/register', payload)
    .then(result => {
      return result;
    })
    .catch(e => {
      throw e;
    });
  }

  forgotPassword (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.post("users/forgotPassword", payload, headers).then(res => {
      return res.data;
    }).catch((err) => {
      throw err;
    });
  }

  resetPassword (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.post("users/resetPassword", payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  getCurrent () {
    let headers = {};
    return API.get('users/current', headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }
}
