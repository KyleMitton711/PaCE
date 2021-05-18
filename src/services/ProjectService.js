import APIService from "@/http.js";
const API = new APIService();

export default {
  async getProjects (SearchText) {
    let url = `/api/admin/projects`;
    if (SearchText) {
      url += `?SearchText=${SearchText}`;
    }
    let res = await API.get(url);
    return res.data;
  },

  async addProject (payload) {
    let res = API.post('/api/admin/projects', payload);
    return res;
  },

  async editProject (payload) {
    let res = await API.put('/api/admin/projects/' + payload.id, payload);
    return res;
  },

  async deleteProject (id) {
    let res = await API.delete('/api/admin/projects/' + id);
    return res;
  },

  async getProject (id) {
    let headers = { "Content-Type": "application/json-patch+json" };
    let res = await API.get(`/api/admin/projects?id=${id}`, headers);
    return res;
  }
}
