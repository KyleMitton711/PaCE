import APIService from "@/http.js";
const API = new APIService();

export default {
  getResourceCount (payload) {
    let url = `/api/resources/total`;
    let headers = {
      accept: 'text/plain'
    };
    return API.post(url, payload, headers)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      throw e;
    });
  },

  filterResources (payload) {
    let headers = { "Content-Type": "application/json" };
    let url = `/api/resources/filter`;
    return API.post(url, payload, headers)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      throw e;
    });
  },

  addResource (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.post('/api/admin/resources', payload, headers)
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
