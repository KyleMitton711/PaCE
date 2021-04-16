import APIService from "@/http.js";
const API = new APIService();

export default {
  getProjects (SearchText) {
    let url = `/api/admin/projects`;
    if (SearchText) {
      url += `?SearchText=${SearchText}`;
    }
    return API.get(url)
    .then(result => {
      return result;
    })
    .catch(e => {
      throw e;
    });
  },

  addProject (payload) {
    return API.post('/api/admin/projects', payload)
    .then(result => {
      return result;
    })
    .catch(e => {
      throw e;
    });
  },

  getProject (id) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.get(`/api/admin/projects?id=${id}`, headers).then(res => {
      return res.data;
    }).catch((err) => {
      throw err;
    });
  }
}
