<template>
  <router-view />
  <navigation-bar />
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";

export default {
  name: "Dashboard",
  components: {
    "navigation-bar": NavigationBar,
  },
};
</script>
