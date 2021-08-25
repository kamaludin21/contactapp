<template>
  <div class="text-center pb-6">
    <img src="../assets/logo.png" class="w-1/5 mb-4 mx-auto" alt="logo" />
    <p class="text-xl font-bold tracking-tight leading-4">
      Welcome to Contact Books
    </p>
    <p class="font-light text-base">Keep your contact online</p>
  </div>
  <router-view />
  <div class="mt-auto text-center py-4">
    <p v-if="login">
      Don't have account?
      <router-link
        to="/auth/register"
        @click="loginStatus"
        class="font-semibold text-blue-600"
        >Register now</router-link
      >
    </p>
    <p v-if="!login">
      Already have account?
      <router-link
        to="/auth/login"
        @click="loginStatus"
        class="font-semibold text-blue-600"
        >Login now</router-link
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: true,
    };
  },
  methods: {
    loginStatus: function() {
      this.login = !this.login;
    },
  },
};
</script>
