<template>
  <div
    :class="backgroundStatus(isAction)"
    class="flex items-center rounded-lg shadow-lg text-gray-900 p-2 mb-2 space-x-1"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="flex-0 h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <!-- CHECK PATH -->
      <path
        v-if="isAction == 'success'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      />
      <path
        v-if="isAction == 'warning'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
      <!-- INFO CIRCLE PATH -->
      <path
        v-if="isAction == 'error'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <div class="flex-1">
      <p class="font-medium text-sm tracking-wide leading-4">
        {{ title }}
      </p>
    </div>
    <svg
      @click="onClick"
      xmlns="http://www.w3.org/2000/svg"
      class="flex-0 h-5 w-5 hover:text-white cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "AlertStates",
  props: {
    title: String,
    isAction: String,
  },
  methods: {
    onClick: function() {
      this.$emit("onClick");
    },
    backgroundStatus: function(state) {
      if (state == "warning") {
        return "bg-yellow-400";
      } else if (state == "success") {
        return "bg-green-400";
      } else if (state == "error") {
        return "bg-red-400";
      } else {
        return "bg-white";
      }
    },
  },
};
</script>
