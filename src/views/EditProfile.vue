<template>
  <app-bar title="Ubah profile">
    <template v-slot:back>
      <div
        class="h-full hover:text-blue-600 text-gray-700 flex items-center pr-1 cursor-pointer"
        @click="$router.go(-1)"
      >
        <arrow-left-icon />
      </div>
    </template>
  </app-bar>
  <div class="bg-rounded-white mb-2"></div>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";
export default {
  components: { AppBar, ArrowLeftIcon },
  name: "EditProfile",
};
</script>
