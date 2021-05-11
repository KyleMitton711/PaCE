import APIService from "@/http.js";
const API = new APIService();

export default class UserService {
  async getCurrent () {
    let headers = {};
    let res = await API.get('/api/users/current', headers);
    return res.data;
  }

  async updateCurrent (payload) {
    let headers = {};
    let res = await API.put('/api/users/current', payload, headers);
    return res.data;
  }

  async updateOneSignalForCurrentUser (payload) {
    let headers = {};
    let res = await API.put('/api/users/current/onesignal', payload, headers);
    return res.data;
  }

  async addUser (payload) {
    let headers = {};
    let res = await API.post('/api/admin/users', payload, headers);
    return res.data;
  }

  async updateUser (payload) {
    let headers = {};
    let res = await API.put(`/api/admin/users/${payload.id}`, payload, headers);
    return res.data;
  }

  async deleteUser (id) {
    let headers = {};
    let res = await API.delete(`/api/admin/users/${id}`, headers);
    return res.data;
  }

  async getUsers (payload) {
    let headers = {};
    let url = `/api/admin/users?PageIndex=${payload.PageIndex}&PageSize=${payload.PageSize}`;
    if (payload.SearchText) {
      url += '&SearchText=' + payload.SearchText;
    }
    let res = await API.get(url, headers);
    return res.data;
  }

  async getUserMetrics (payload) {
    let headers = {};
    let res = await API.get(`/api/metric?DayNumber=${payload}`, headers);
    return res.data;
  }
}
