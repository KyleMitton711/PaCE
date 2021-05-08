import ResourceService from "@/services/ResourceService.js";

const state = {
    resources: []
};

const getters = {
    unreadMessages: state => state.user.unreadReceivedMessages
};

const mutations = {
    GET_TOTAL_RESOURCES: (state, payload) => {
        state.resources = Object.assign({}, payload);
    }
};

const actions = {
    async getResourceCount ({ commit }, payload = null) {
        let result = await ResourceService.getResourceCount(payload);
        return result.data;
    },
    async filterResources ({ commit }, payload = null) {
        let result = await ResourceService.filterResources(payload);
        commit('GET_TOTAL_RESOURCES', result.data);
        return result.data;
    },
    async getResources ({ commit }, payload = null) {
        let result = await ResourceService.getResources(payload);
        commit('GET_TOTAL_RESOURCES', result.data);
        return result.data;
    },
    async addResource ({ commit }, payload = null) {
        let result = await ResourceService.addResource(payload);
        return result;
    },
    async getResourceDetail ({ commit }, payload = null) {
        let result = await ResourceService.getResourceDetail(payload)
        return result.data;
    },
    async updateResource ({ commit }, payload) {
        let result = await ResourceService.updateResource(payload);
        return result;
    },
    async deleteResource ({ commit }, id) {
        let result = await ResourceService.deleteResource(id)
        return result;
    },
    async bookmarkResource ({ commit }, payload) {
        let result = await ResourceService.bookmarkResource(payload)
        return result;
    },
    async unbookmarkResource ({ commit }, payload) {
        let result = await ResourceService.unbookmarkResource(payload)
        return result;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
