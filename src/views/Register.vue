<template>
  <form class="p-4 space-y-2 bg-rounded-white" @submit.prevent="register">
    <div class="leading-none border-b-2 mb-4 pb-1">
      <h1 class="text-lg font-bold tracking-wide">REGISTER</h1>
      <p class="text-xs tracking-wide font-light">
        Fill with your personal data
      </p>
    </div>
    <div
      v-if="error"
      class="p-2 rounded-lg bg-red-200 leading-5 font-medium text-sm"
    >
      {{ error }}
    </div>
    <div
      class="form-control"
      :class="errors.includes('name') ? 'ring-error' : ''"
    >
      <user-icon
        class="h-6 w-6 mx-2"
        :class="errors.includes('name') ? 'text-error' : 'text-blue-600'"
      />
      <input
        class="form-input"
        type="text"
        v-model="name"
        placeholder="Nama anda"
      />
    </div>
    <error-input
      v-if="errors.length"
      :errors="errors"
      message="Nama tidak boleh kosong"
      errorUnit="name"
    />
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
      title="REGISTER "
      v-bind:isInProcess="isProcess"
      @clicked="register"
    />
  </form>
</template>

<script>
import UserIcon from "./../components/icons/UserIcon.vue";
import LockIcon from "./../components/icons/LockIcon.vue";
import AtIcon from "./../components/icons/AtIcon.vue";
import ErrorInput from "./../components/states/ErrorInput.vue";
import AuthAction from "./../components/AuthAction.vue";
import store from "./../store";
import firebaseApp from "./../firebaseinit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  reload,
} from "firebase/auth";
const auth = getAuth(firebaseApp);

export default {
  name: "Register",
  components: {
    "user-icon": UserIcon,
    "lock-icon": LockIcon,
    "at-icon": AtIcon,
    "error-input": ErrorInput,
    "auth-action": AuthAction,
  },
  data() {
    return {
      error: null,
      errors: [],
      name: null,
      email: null,
      password: null,
      isProcess: false,
    };
  },
  methods: {
    register: function() {
      this.isProcess = !this.isProcess;
      this.error = null;
      this.errors = [];

      if (this.email && this.password) {
        this.isProcess = !this.isProcess;
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: this.name,
            }).then(() => {
              reload(auth.currentUser).then(() => {
                onAuthStateChanged(auth, (user) => {
                  store.dispatch("fetchUser", user);
                });
                this.$router.push({ path: "/beranda" });
              });
            });
          })
          .catch((error) => {
            this.error = error.message;
          });
      }
      if (!this.name) this.errors.push("name");
      if (!this.email) this.errors.push("email");
      if (!this.password) this.errors.push("password");
    },
  },
};
</script>
