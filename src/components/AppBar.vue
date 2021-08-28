<template>
  <div class="flex items-center flex-shrink-0 px-4 mb-2 bg-rounded-white">
    <slot name="back" />
    <p class="flex-1 py-4 text-xl font-bold text-gray-700">
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
