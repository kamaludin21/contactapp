<template>
  <div class="flex-shrink-0 flex text-gray-600 mt-auto bg-rounded-white">
    <div class="flex-1 group">
      <router-link to="/beranda" :class="isHome ? 'active': ''" class="link-wrapper">
        <home-icon />
        <span class="link-title">Beranda </span>
        <span class="link-badge"></span>
      </router-link>
    </div>
    <div class="flex-1 group">
      <router-link to="/kontakbaru" class="link-wrapper" router-link-active="active">
        <plus-icon />
        <span class="link-title">Kontak Baru</span>
        <span class="link-badge"></span>
      </router-link>
    </div>
    <div class="flex-1 group">
      <router-link to="/profil" class="link-wrapper" :class="isProfile ? 'active': ''">
        <user-icon />
        <span class="link-title">Profil</span>
        <span class="link-badge"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import HomeIcon from "./icons/HomeIcon.vue";
import PlusIcon from "./icons/PlusIcon.vue";
import UserIcon from "./icons/UserIcon.vue";

export default {
  name: "NavigationBar",
  components: {
    'home-icon': HomeIcon,
    'plus-icon': PlusIcon,
    'user-icon': UserIcon
  },
  computed: {
    isHome() {
      let path = this.$route.path;
      if(path.includes('/kontak/')) {
        return true 
      } else {
        return false
      }
    },
    isProfile() {
      let path = this.$route.path;
      if(path.includes('/profil/')) {
        return true 
      } else {
        return false
      }
    }
  }
};
</script>

<style lang="postcss">
.active {
  @apply text-blue-600 font-bold;
}

.active span:nth-child(3) {
  @apply bg-blue-600;
}

.link-wrapper {
  @apply flex flex-col items-center pt-2 group-hover:text-blue-600;
}

.link-badge {
  @apply w-6 h-1 mx-auto group-hover:bg-blue-600 rounded-full;
}

.link-title {
  @apply block text-xs pb-2 select-none;
}
</style>
