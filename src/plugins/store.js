import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState({ storage: window.sessionStorage })],
    state: {
        user: {
            displayName: "",
            email: "",
            uid: "",
        },
        status: false,
    },
    mutations: {
        onAuthStateChanged(state, user) {
            if (!user) {
                state.user = {};
                state.status = false;
                return;
            }
            state.user = user;
            state.status = true;
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        isSignedIn(state) {
            return state.status;
        },
    },
    actions: {
    },
    modules: {},
})

export default store