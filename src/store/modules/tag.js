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
    getTags: ({ commit }, payload = null) => {
        return TagService.getTags(payload)
            .then(result => {
                commit("GET_TAGS", result.data);
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    addTag: ({ commit }, payload) => {
        return TagService.addTag(payload)
            .then(result => {
                commit("ADD_TAG", result.data);
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    updateTag: ({ commit }, payload) => {
        return TagService.updateTag(payload)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    deleteTag: ({ commit }, payload) => {
        return TagService.deleteTag(payload)
            .then(result => {
                return result.data;
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
