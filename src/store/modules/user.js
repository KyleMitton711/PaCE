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
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
