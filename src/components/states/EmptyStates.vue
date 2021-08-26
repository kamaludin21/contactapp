<template>
  <div class="bg-rounded-white p-10">
    <img
      src="./../../assets/empty.png"
      class="mx-auto w-1/3 mb-4"
      alt="Empty"
    />
    <p class="text-xl font-bold text-center">
      {{ title }}
    </p>
  </div>
</template>

<script>
export default {
  name: "EmptyStates",
  props: {
    title: String,
  },
};
</script>
