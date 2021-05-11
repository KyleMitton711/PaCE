import APIService from "@/http.js";
const API = new APIService();

export default {
  async register (payload) {
    let res = await API.post('/api/users/register', payload)
    return res.data;
  },

  async forgotPassword (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    let res = await API.post("/api/accounts/forgotPassword", payload, headers);
    return res.data;
  },

  async resetPass (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    let res = await API.post("/api/accounts/resetPass", payload, headers);
    return res.data;
  },

  async resetPassword (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    let res = await  API.post("/api/accounts/resetPassword", payload, headers);
    return res.data;
  },

  async changePassword (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    let res = await API.post("/api/accounts/changePassword", payload, headers);
    return res.data;
  }
}
