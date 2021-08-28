import { createStore } from 'vuex'

export default createStore({
  state: {
    popupDialog: false,
    confirmLogout: false,
    confirmAboutApp: false,
  },
  // getters: {
  //   confirmLogout(state) {
  //     return state.confirmLogout
  //   },
  // },
  mutations: {
    POPUP_DIALOG(state) {
      state.popupDialog = !state.popupDialog
    },
    ABOUT_APP(state) {
      state.confirmAboutApp = !state.confirmAboutApp
    },
    CONFIRM_LOGOUT(state) {
      state.confirmLogout = !state.confirmLogout
    }    
  },
  actions: {
  },
  modules: {
  }
})
