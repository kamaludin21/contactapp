<template>
  <div class="flex items-center space-x-4 p-4  sticky top-0 bg-gray-100">
      <img
        class="inline object-cover w-20 h-20 ring-4 ring-white border-gray-200 shadow-lg rounded-full"
        :src=photoUrl
        alt="Profile image"
      />
      <div class="flex-1 space-y-1">
        <p class="font-semibold text-xl leading-none">{{ displayName }}</p>
        <p class="flex items-center text-sm font-light">{{ email }}</p>
      </div>
    </div>
</template>
<script>
// :src="(user.data.photoURL) ? user.data.photoURL : 'https://ui-avatars.com/api/?background=2563EB&color=fff&name='+ user.data.displayName +''"
export default {
  name: 'CircleImageProfile',
  props: {
    photoUrl: {
      type: String, 
      default: ''
    },
    displayName: String,
    email: String,
  }
}
</script>