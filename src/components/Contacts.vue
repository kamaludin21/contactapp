<template>
  <ul class="bg-gray-50 divide-y divide-gray-200 divide-solid z-0">
    <li
      class="flex items-center justify-between space-x-3 px-4 hover:bg-blue-50"
      v-for="contact in contacts"
      :key="contact.id"
    >
      <button class="flex-shrink-0" @dblclick="fullView"> 
        <div class="user-circle">
          <p class="user-initial">{{ getUserInitial(contact.name) }}</p>
        </div>
      </button>
      <div class="w-full py-4">
        <p class="contact-name">
          {{ contact.name }}
        </p>
        <p class="contact-phone">
          {{ contact.phone }}
        </p>
      </div>
      
      <router-link :to="{ name: 'EditKontak', params: {id: contact.id} }" >
        <edit-icon  />
      </router-link>
    </li>
  </ul>
</template>

<script>
import EditIcon from "./icons/EditIcon.vue";

export default {
  name: "Contacts",
  components: {
    'edit-icon': EditIcon,
  },
  props: {
    contacts: Array,
  },
  methods: {
    getUserInitial(username) {
      if(!username) {
        return '00'
      } else {
        const name = username.split(" ");
        return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ""}`;
      }
    },
    fullView: function(){
      // Code full view number
    }
  },
};
</script>

<style lang="postcss" scoped>
.user-circle {
  @apply rounded-full border-2 border-blue-300 h-12 w-12 flex items-center justify-center bg-blue-200 shadow-md;
}

.user-initial {
  @apply font-semibold tracking-wide text-sm uppercase;
}

.contact-name {
  @apply text-lg leading-tight font-medium text-gray-800 capitalize;
}

.contact-phone {
  @apply text-sm text-gray-600;
}

.edit-icon {
  @apply transform hover:scale-125 duration-300 text-gray-400 hover:text-blue-600 cursor-pointer;
}
</style>
