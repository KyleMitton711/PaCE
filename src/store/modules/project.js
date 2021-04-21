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
    },
    ADD_PROJECT: (state, payload) => {
        let projects = Object.assign([], state.projects);
        projects.push(payload);
        state.projects = Object.assign([], projects);
    },
};

const actions = {
    getProjects: ({ commit }, payload = null) => {
        return ProjectService.getProjects(payload)
            .then(result => {
                commit("GET_PROJECTS", result.data);
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    addProject: ({ commit }, payload) => {
        return ProjectService.addProject(payload)
            .then(result => {
                commit("ADD_PROJECT", result.data);
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    editProject: ({ commit }, payload) => {
        return ProjectService.editProject(payload)
            .then(result => {
                commit("ADD_PROJECT", result.data);
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    deleteProject: ({ commit }, payload) => {
        return ProjectService.deleteProject(payload)
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
