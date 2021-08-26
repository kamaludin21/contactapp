<template>
  <app-bar title="Profile" />
  <Loading v-if="loading" />
  <div class="bg-rounded-white">Content</div>
</template>

<script>
import AppBar from "./../components/AppBar.vue";

export default {
  name: "Profile",
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
