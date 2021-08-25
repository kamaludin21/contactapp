<template>
  <div class="flex space-y-2 flex-shrink-0 p-4 mb-2 bg-rounded-white">
    <slot name="back" />
    <p class="flex-1 text-xl font-bold text-gray-700">
      {{ title }}
    </p>
    <slot name="actions" />
  </div>
</template>

<script>
export default {
  name: "AppBar",
  props: {
    title: String,
  },
};
</script>
