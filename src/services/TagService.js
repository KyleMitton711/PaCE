import APIService from "@/http.js";
const API = new APIService();

let headers = { "Content-Type": "application/json" };
export default {
  getTags(TagType) {
    let url = `/api/tags`;
    if (TagType) {
      url += `?TagType=${TagType}`;
    }

    return API.get(url, headers)
      .then(result => {
        return result;
      })
      .catch(e => {
        throw e;
      });
  },

  addTag(payload) {
    return API.post('/api/admin/tags', payload, headers)
      .then(result => {
        return result;
      })
      .catch(e => {
        throw e;
      });
  },

  deleteTag(payload) {
    return API.delete(`/api/admin/tags/${payload.id}?tagType=${payload.tagType}`, headers)
      .then(result => {
        return result;
      })
      .catch(e => {
        throw e;
      });
  },

  updateTag(payload) {
    return API.put(`/api/admin/tags/${payload.id}`, payload, headers)
      .then(result => {
        return result;
      })
      .catch(e => {
        throw e;
      });
  },

  getTagDetail(id) {
    return API.get(`/api/tags/${id}`, headers).then(res => {
      return res.data;
    }).catch((err) => {
      throw err;
    });
  }
}
