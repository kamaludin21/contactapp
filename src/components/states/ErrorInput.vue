<template>
  <div v-if="errors.length">
    <div :key="error" v-for="error in errors" class="-mt-1 pb-1">
      <span class="text-sm font-medium text-red-400 pl-2" v-if="error == errorUnit"
        >{{ message }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorInput",
  props: {
    errorUnit: String,
    message: String,
    errors: Array
  },
};
</script>
