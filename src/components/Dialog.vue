<template>
  <div class="absolute h-full w-full bg-opacity-90 bg-gray-600 z-20">
    <div class="main-wrapper flex flex-col justify-between w-full-center">
      <div class="h-auto w-72 py-6 px-5 bg-rounded-white m-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  methods: {
    closeDialog: function() {
      this.$store.commit("POPUP_DIALOG")
      this.$store.commit("CONFIRM_LOGOUT");
    },
  },
};
</script>
