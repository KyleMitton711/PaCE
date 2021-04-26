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

  addUser (payload) {
    let headers = {};
    return API.post('/api/admin/users', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  updateUser (payload) {
    let headers = {};
    return API.put(`/api/admin/users/${payload.id}`, payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  deleteUser (id) {
    let headers = {};
    return API.delete(`/api/admin/users/${id}`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getUsers () {
    let headers = {};
    return API.get(`/api/admin/users`, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }
}
