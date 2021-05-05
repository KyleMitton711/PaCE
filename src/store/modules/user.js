import UserService from "@/services/UserService.js";
const User = new UserService();

const state = {
    user: {
        firstName: '',
        lastName: ''
    }
};

const getters = {
    unreadMessages: state => state.user.unreadReceivedMessages
};

const mutations = {
    setMessageCount: (state, payload) => {
        state.user.unreadReceivedMessages = payload;
    },
    SET_USER: (state, payload) => {
        state.user = Object.assign({}, payload);
    }
};

const actions = {
    async getCurrent ({ commit }) {
        let result = await User.getCurrent();
        commit('auth/SET_USER', result.data, {root:true});
        return result.data;
    },
    async getUsers ({ commit }) {
        let result = await  User.getUsers();
        return result;
    },
    async addUser ({ commit }, payload) {
        let result = await  User.addUser(payload);
        commit("ADD_TAG", result.data); // is ADD_TAG correct mutation name for this function?
        return result.data;
    },
    async updateUser ({ commit }, payload) {
        let result = await  User.updateUser(payload);
        return result.data;
    },
    async deleteUser ({ commit }, payload) {
        let result = await  User.deleteUser(payload);
        return result.data;
    },
    async getUserMetrics ({ commit }, payload) {
        let result = await  User.getUserMetrics(payload);
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
