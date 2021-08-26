<template>
  <form class="p-4 space-y-2 bg-rounded-white" @submit.prevent="login">
    <div class="leading-none border-b-2 mb-4 pb-1">
      <h1 class="text-lg font-bold tracking-wide">LOGIN</h1>
      <p class="text-xs font-light">Sign in with your credential</p>
    </div>
    <div v-if="error" class="p-2 rounded-lg bg-red-200 leading-5 font-medium text-sm">
      {{ error }}
    </div>
    <div
      class="form-control"
      :class="errors.includes('email') ? 'ring-error' : ''"
    >
      <at-icon
        class="h-6 w-6 mx-2"
        :class="errors.includes('email') ? 'text-error' : 'text-blue-600'"
      />
      <input
        class="form-input"
        type="email"
        v-model="email"
        placeholder="Email"
      />
    </div>
    <error-input
      v-if="errors.length"
      :errors="errors"
      message="Alamat email tidak boleh kosong"
      errorUnit="email"
    />
    <div
      class="form-control"
      :class="errors.includes('password') ? 'ring-error' : ''"
    >
      <lock-icon
        class="h-6 w-6 mx-2"
        :class="errors.includes('password') ? 'text-error' : 'text-blue-600'"
      />
      <input
        class="form-input"
        type="password"
        v-model="password"
        placeholder="Password"
        autocomplete="on"
      />
    </div>
    <error-input
      v-if="errors.length"
      :errors="errors"
      message="Password tidak boleh kosong"
      errorUnit="password"
    />
    <auth-action
      title="LOGIN"
      v-bind:isInProcess="isProcess"
      @clicked="login"
    />
  </form>
  
</template>

<script>
import AtIcon from "./../components/icons/AtIcon.vue";
import LockIcon from "./../components/icons/LockIcon.vue";
import ErrorInput from "./../components/states/ErrorInput.vue";
import AuthAction from "./../components/AuthAction.vue";

export default {
  name: "Login",
  components: {
    "at-icon": AtIcon,
    "lock-icon": LockIcon,
    "error-input": ErrorInput,
    "auth-action": AuthAction,
  },
  data() {
    return {
      error: null,
      errors: [],
      email: null,
      password: null,
      isProcess: false,
    };
  },
  methods: {
    login: function() {
      this.isProcess = !this.isProcess;
      this.error = null;
      this.errors = [];

      if (this.email && this.password) {
        console.log("process");
      }
      if (!this.email) this.errors.push("email");
      if (!this.password) this.errors.push("password");
    },
  },
};
</script>
