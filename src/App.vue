<template>
  <div class="main-wrapper w-full-center flex flex-col justify-between">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
      document.getElementsByTagName("body")[0].style.setProperty("--vh", `${vh}px`);
    }
  }
}
</script>

<style lang="postcss">
.main-wrapper {
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
}

.w-full-center {
  @apply w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-2
}

.bg-rounded-white {
  @apply bg-white rounded-lg shadow-lg
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
</style>
