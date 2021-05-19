import AuthService from "@/services/AuthService.js";
const Auth = new AuthService();

const state = {
    user: null
};

const getters = {
    unreadMessages: state => state.user.unreadReceivedMessages,
    user: state => state.user
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
    async login ({ commit }, payload) {
        return Auth.signIn(payload).then(result => {
            var status;
            console.log(result)
            if (result.data == null) {
                status = { successful: false, error: result.errors[0].errorMessage };
            }
            else {
                var token = result.data.access_token;
                localStorage.setItem("token", token);
                var refreshToken = result.data.refresh_token;
                localStorage.setItem("refreshToken", refreshToken);
                commit("SET_USER", result.data.user);
                status = { successful: true, userType: result.data.user.userType };
            }
            return result;
        }).catch(e => {
            return e.data;
        })
    },
    async adminLogin ({ commit }, payload) {
        let result = await Auth.adminSignIn(payload)
        var status;
        if (result.data == null) {
            status = { successful: false, error: result.errors[0].errorMessage };
        }
        else {
            var token = result.data.access_token;
            localStorage.setItem("token", token);
            var refreshToken = result.data.refresh_token;
            localStorage.setItem("refreshToken", refreshToken)
            commit("SET_USER", result.data.user);
            status = { successful: true, userType: result.data.user.userType }
        }
        return status;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
