import TagService from "@/services/TagService.js";

const state = {
    tags: []
};

const getters = {
    tags: state => state.tags
};

const mutations = {
    GET_TAGS: (state, payload) => {
        state.tags = Object.assign({}, payload);
    },
    ADD_TAG: (state, payload) => {
        let tags = Object.assign([], state.tags);
        tags.push(payload);
        state.tags = Object.assign([], tags);
    },
};

const actions = {
    async getTags ({ commit }, payload = null) {
        let result = await TagService.getTags(payload);
        commit("GET_TAGS", result.data);
        return result.data;
    },
    async addTag ({ commit }, payload) {
        let result = await TagService.addTag(payload);
        commit("ADD_TAG", result.data);
        return result.data;
    },
    async updateTag ({ commit }, payload) {
        let result = await TagService.updateTag(payload)
        return result.data;
    },
    async deleteTag ({ commit }, payload) {
        let result = await TagService.deleteTag(payload);
        return result.data;
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
