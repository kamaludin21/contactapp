<template>
  <div class="pt-2 pb-1">
    <button
    @click="clicked"
    type="button"
    class="w-full bg-blue-600 hover:bg-blue-800 justify-center mx-auto inline-flex items-center px-4 py-3 rounded-lg text-gray-100 transition ease-in-out duration-150"
  > 
    <svg
      v-if="isInProcess"
      class="animate-spin mr-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-30"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span class="text-base leading-6 font-medium">{{ title }}</span>
  </button>
  </div>
</template>

<script>
export default {
  name: "AuthAction",
  props: {
    title: String,
    isInProcess: Boolean,
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
};
</script>
