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
    getCurrent: ({ commit }) => {
        return User.getCurrent()
            .then(result => {
                commit('auth/SET_USER', result, {root:true});
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
    getUsers: ({ commit }) => {
        return User.getUsers()
            .then(result => {
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
    addUser: ({ commit }, payload) => {
        return User.addUser(payload)
            .then(result => {
                commit("ADD_TAG", result.data);
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    updateUser: ({ commit }, payload) => {
        return User.updateUser(payload)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    deleteUser: ({ commit }, payload) => {
        return User.deleteUser(payload)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                throw e;
            });
    },
    getUserMetrics: ({ commit }, payload) => {
        return User.getUserMetrics(payload)
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
