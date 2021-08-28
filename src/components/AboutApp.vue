<template>
  <p class="text-lg font-bold pb-2">About App</p>
  <p class="text-sm">
    Name: Contact Book
  </p>
  <p class="text-sm">
    Version: v1.0 (beta)
  </p>
  <p class="text-sm">Github: <span class="font-medium">@kamaludin21</span></p>
  <p class="pt-2 font-light">
    Made With ⚡ and 💻
  </p>
  <div class="flex space-x-4 justify-end mt-4">
    <button class="p-2 text-blue-600 text-sm font-bold" @click=closeDialog>
      CLOSE
    </button>
  </div>
</template>

<script>
export default {
  name: 'AboutApp',
  methods: {
    closeDialog: function() {
      this.$store.commit("POPUP_DIALOG")
      this.$store.commit("ABOUT_APP");
    },
  },
}
</script>