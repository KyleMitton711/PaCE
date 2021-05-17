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
                throw e;
            });
    },
    forgotPassword: ({ commit }, payload) => {
        return AccountService.forgotPassword(payload)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                throw e;
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
                throw e;
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
