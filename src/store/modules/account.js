import AccountService from "@/services/AccountService.js";

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
    register: ({ commit }, payload = null) => {
        return AccountService.register(payload)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                return e.data;
            });
    },
    forgotPassword: ({ commit }, payload) => {
        return AccountService.forgotPassword(payload)
            .then(result => {
                return result;
            })
            .catch(e => {
                return e.data;
            });
    },
    resetPass: ({ commit }, payload) => {
        return AccountService.resetPass(payload)
            .then(result => {
                return result;
            })
            .catch(e => {
                throw e;
            });
    },
    resetPassword: ({ commit }, payload) => {
        return AccountService.resetPassword(payload)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                return e.data;
            });
    },
    changePassword: ({ commit }, payload) => {
        return AccountService.changePassword(payload)
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
