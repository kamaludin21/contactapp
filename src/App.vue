<template>
  <dialog-popup v-if="popupDialog">
    <!-- CONTENT HERE -->
    <about-app v-if="aboutapp" />
    <confirm-logout v-if="logout" />
  </dialog-popup>
  <div class="main-wrapper w-full-center flex flex-col justify-between">
    <router-view />
  </div>
</template>

<script>
import Dialog from "./components/Dialog.vue";
import AboutApp from "./components/AboutApp";
import ConfirmLogout from './components/ConfirmLogout.vue';

export default {
  components: { "dialog-popup": Dialog, AboutApp, ConfirmLogout },
  name: "App",
  mounted() {
    this.setFullHeight();
  },
  created() {
    window.addEventListener("resize", this.setFullHeight);
  },
  unmounted() {
    window.removeEventListener("resize", this.setFullHeight);
  },
  methods: {
    setFullHeight: function() {
      let vh = window.innerHeight * 0.01;
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--vh", `${vh}px`);
    },
  },
  computed: {
    popupDialog(){
      return this.$store.state.popupDialog
    },
    aboutapp() {
      return this.$store.state.confirmAboutApp
    },
    logout() {
      return this.$store.state.confirmLogout
    }
  }
};
</script>

<style lang="postcss">
.main-wrapper {
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
}

.w-full-center {
  @apply w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-2;
}

.bg-rounded-white {
  @apply bg-white rounded-lg shadow-lg;
}

.form-control {
  @apply flex-1 flex items-center bg-blue-100 rounded-lg;
}

.form-input {
  @apply w-full pr-2 py-3 placeholder-gray-400 text-gray-600 focus:outline-none font-medium bg-transparent;
}

.ring-error {
  @apply ring-2 ring-red-400;
}
.text-error {
  @apply text-red-400;
}

.button-form {
  @apply flex-1 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg font-semibold tracking-wide hover:shadow-lg;
}

/* SCROLLBAR */
::-webkit-scrollbar {
  margin-top: 10;
  width: 1px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0);
  border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
  border-radius: 0px;
  box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0);
}

/* NUMBER SPIN BUTTON */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
