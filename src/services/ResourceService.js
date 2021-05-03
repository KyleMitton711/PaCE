import APIService from "@/http.js";
const API = new APIService();

export default {
  getResourceCount (payload) {
    let url = `/api/resources/total`;
    let headers = { "Content-Type": "application/json" };
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

  getResources (payload) {
    let headers = { "Content-Type": "application/json" };
    let url = `/api/resources`;
    if (payload && payload.isProgram != null) {
      url += `?IsProgram=${payload.isProgram}`;
    }
    return API.get(url, headers)
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
  },

  updateResource (payload) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.put(`/api/admin/resources/${payload.id}`, payload, headers)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      throw e;
    });
  },

  deleteResource (id) {
    let headers = { "Content-Type": "application/json-patch+json" };
    return API.delete(`/api/admin/resources/${id}`, headers)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      throw e;
    });
  }
}
