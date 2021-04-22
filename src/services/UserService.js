import APIService from "@/http.js";
const API = new APIService();

export default class UserService {
  getCurrent () {
    let headers = {};
    return API.get('/api/users/current', headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  updateCurrent (payload) {
    let headers = {};
    return API.put('/api/users/current', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  updateOneSignalForCurrentUser (payload) {
    let headers = {};
    return API.put('/api/users/current/onesignal', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }
}
