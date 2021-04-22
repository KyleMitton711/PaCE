import AuthService from "@/services/AuthService.js";
const Auth = new AuthService();

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
    login: ({ commit }, payload) => {
        return Auth.signIn(payload)
            .then(result => {
                var status;
                if (result.data == null) {
                    status = { successful: false, error: result.errors[0].errorMessage };
                }
                else {
                    var token = result.data.access_token;
                    localStorage.setItem("token", token);
                    commit("SET_USER", result.data.user);
                    status = { successful: true, userType: result.data.user.userType }
                }
                return status;
            })
            .catch(e => {
                throw e;
            });
    },
    adminLogin: ({ commit }, payload) => {
        return Auth.adminSignIn(payload)
            .then(result => {
                var status;
                if (result.data == null) {
                    status = { successful: false, error: result.errors[0].errorMessage };
                }
                else {
                    var token = result.data.access_token;
                    localStorage.setItem("token", token);
                    commit("SET_USER", result.data.user);
                    status = { successful: true, userType: result.data.user.userType }
                }
                return status;
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
