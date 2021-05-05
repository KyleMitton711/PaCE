import APIService from "@/http.js";
const API = new APIService();

let headers = { "Content-Type": "application/json" };
export default {
  async getTags(TagType) {
    let url = `/api/tags`;
    if (TagType) {
      url += `?TagType=${TagType}`;
    }

    let res = await API.get(url, headers);
    return res.data;
  },

  async addTag(payload) {
    let res = await API.post('/api/admin/tags', payload, headers);
    return res;
  },

  async deleteTag(payload) {
    let res = await API.delete(`/api/admin/tags/${payload.id}?tagType=${payload.tagType}`, headers);
    return res;
  },

  async updateTag(payload) {
    let res = await API.put(`/api/admin/tags/${payload.id}`, payload, headers)
    return res;
  },

  async getTagDetail(id) {
    let res = await API.get(`/api/tags/${id}`, headers);
    return res;
  }
}
