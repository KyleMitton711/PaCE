import APIService from "@/http.js";
const API = new APIService();

export default {
  getTotalResources (payload) {
    let url = `/api/resources/total`;
    return API.post(url, payload)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      throw e;
    });
  },

  addResource (payload) {
    return API.post('/api/admin/resources', payload)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      throw e;
    });
  },

  getResourceDetail (id) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.get(`/api/resources/${id}`, headers).then(res => {
      return res.data;
    }).catch((err) => {
      throw err;
    });
  }
}
