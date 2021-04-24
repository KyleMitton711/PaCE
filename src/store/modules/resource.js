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
    getResourceCount: ({ commit }, payload = null) => {
        return ResourceService.getResourceCount(payload)
            .then(result => {
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
    filterResources: ({ commit }, payload = null) => {
        return ResourceService.filterResources(payload)
            .then(result => {
                commit('GET_TOTAL_RESOURCES', result.data);
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
    addResource: ({ commit }, payload = null) => {
        return ResourceService.addResource(payload)
            .then(result => {
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
    getResourceDetail: ({ commit }, payload = null) => {
        return ResourceService.getResourceDetail(payload)
            .then(result => {
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
    updateResource: ({ commit }, payload) => {
        return ResourceService.updateResource(payload)
            .then(result => {
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
    deleteResource: ({ commit }, id) => {
        return ResourceService.deleteResource(id)
            .then(result => {
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
