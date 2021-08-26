<template>
  <app-bar title="Kontak Baru" />
  <Loading v-if="loading" />
  <div class="bg-rounded-white">Content</div>
</template>

<script>
import AppBar from "./../components/AppBar.vue";

export default {
  name: "KontakBaru",
  data() {
    return {
      loading: false,
      contacts: [],
      searchQuery: null,
    };
  },
  components: {
    "app-bar": AppBar,
  },
};
</script>
