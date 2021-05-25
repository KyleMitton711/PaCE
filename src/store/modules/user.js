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
    async getUsers ({ commit }, payload) {
        let result = await User.getUsers(payload);
        return result.data;
    },
    async addUser ({ commit }, payload) {
        return User.addUser(payload).then(res => {
            return res.data;
        }).catch(e => {
            return e.data;
        });
    },
    async updateUser ({ commit }, payload) {
        return User.updateUser(payload).then(res => {
            return res.data;
        }).catch(e => {
            return e.data;
        });
    },
    async deleteUser ({ commit }, payload) {
        let result = await User.deleteUser(payload);
        return result.data;
    },
    async getUserMetrics ({ commit }, payload) {
        let result = await User.getUserMetrics(payload);
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
