import APIService from "@/http.js";
const API = new APIService();

export default {
  register (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.post('/api/accounts/signup', payload, headers)
    .then(result => {
      return result;
    })
    .catch(e => {
      throw e;
    });
  },

  forgotPassword (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.post("/api/accounts/forgotPassword", payload, headers).then(res => {
      return res.data;
    }).catch((err) => {
      throw err;
    });
  },

  resetPass (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.post("/api/accounts/resetPass", payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  },

  resetPassword (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.post("/api/accounts/resetPassword", payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  },

  changePassword (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.post("/api/accounts/changePassword", payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }
}
