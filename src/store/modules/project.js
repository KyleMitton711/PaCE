import ProjectService from "@/services/ProjectService.js";

const state = {
    projects: []
};

const getters = {
    unreadMessages: state => state.user.unreadReceivedMessages
};

const mutations = {
    GET_PROJECTS: (state, payload) => {
        state.projects = Object.assign({}, payload);
    }
};

const actions = {
    getProjects: ({ commit }, payload = null) => {
        return ProjectService.getProjects(payload)
            .then(result => {
                commit("GET_PROJECTS", result);
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
