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
    async getProjects ({ commit }, payload = null) {
        let result = await ProjectService.getProjects(payload);
        commit("GET_PROJECTS", result.data);
        return result.data;
    },
    async addProject ({ commit }, payload) {
        return ProjectService.addProject(payload).then(res => {
            return res.data;
        }).catch(error => {
            return error.data;
        });
    },
    async editProject ({ commit }, payload) {
        let result = await ProjectService.editProject(payload);
        commit("ADD_PROJECT", result.data);
        return result.data;
    },
    async deleteProject ({ commit }, payload) {
        let result = await ProjectService.deleteProject(payload);
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
