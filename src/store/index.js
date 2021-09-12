import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    popupDialog: false,
    confirmLogout: false,
    confirmAboutApp: false,
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    POPUP_DIALOG(state) {
      state.popupDialog = !state.popupDialog;
    },
    ABOUT_APP(state) {
      state.confirmAboutApp = !state.confirmAboutApp;
    },
    CONFIRM_LOGOUT(state) {
      state.confirmLogout = !state.confirmLogout;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
        });
      } else {
        commit("SET_USER", null);
      }
    },
    logout({commit}) {
      commit("SET_USER", null)
    }
  },
});
