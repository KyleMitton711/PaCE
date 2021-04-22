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

  adminSignIn (payload) {
    return API.post('/api/admin/token', payload)
    .then(result => {
      return result;
    })
    .catch(e => {
      throw e;
    });
  }
}
