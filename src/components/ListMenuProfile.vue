<template>
  <router-link class="profile-menu-wrapper group" :to=url>
    <slot></slot>
    <p class="profile-menu-title">{{ title }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'ListMenuProfile',
  props: {
    title: String,
    url: String
  }
}
</script>
<style lang="postcss" scoped>

.profile-menu-wrapper {
  @apply flex items-center text-gray-600 capitalize p-4 space-x-3 hover:bg-blue-100 cursor-pointer;
}
.profile-menu-icon {
  @apply h-6 w-6 text-gray-500 group-hover:text-blue-600;
}
.profile-menu-title {
  @apply group-hover:text-blue-600 text-sm select-none;
}
</style>
