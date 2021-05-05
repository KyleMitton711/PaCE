import APIService from "@/http.js";
const API = new APIService();

export default class AuthService {
  async signIn (payload) {
    let res = await API.post('/api/token', payload);
    return res.data;
  }

  async adminSignIn (payload) {
    let res = await API.post('/api/admin/token', payload);
    return res.data;
  }
}
