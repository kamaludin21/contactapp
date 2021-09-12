<template>
  <p class="text-lg font-bold">Sign out?</p>
  <p class="text-sm">
    Are you sure want sign out from this device?
  </p>
  <div class="flex space-x-4 mt-6 justify-center">
    <button
      class="flex-1 py-2 text-sm font-bold px-8 text-white bg-blue-600 hover:bg-blue-800 rounded-lg"
      @click="closeDialog"
    >
      CANCEL
    </button>
    <button
      class="flex-1 py-2 px-8 bg-white ring-2 ring-blue-600 ring-inset text-sm font-bold rounded-lg"
      @click="signOut"
    >
      YES
    </button>
  </div>
</template>

<script>
import firebaseApp from "./../firebaseinit"
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);
import store from './../store'

export default {
  name: "ConfirmDialog",
  methods: {
    signOut: function() {
      signOut(auth)
        .then(() => {
          store.dispatch("logout")
          this.$router.replace({ path: "/auth/login" });
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("POPUP_DIALOG");
      this.$store.commit("CONFIRM_LOGOUT");
    },
    closeDialog: function() {
      this.$store.commit("POPUP_DIALOG");
      this.$store.commit("CONFIRM_LOGOUT");
    },
  },
};
</script>
