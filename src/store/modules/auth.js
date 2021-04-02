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
};

const actions = {
    setUnreadMessageCount: ({ commit }, payload) => {
        commit('setMessageCount', payload)
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
