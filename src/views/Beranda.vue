<template>
  <app-bar title="Beranda" />
  <loading v-if="loading" />
  <div class="contact-list-wrapper" v-if="contacts.length && !loading">
    <div class="search-box">
      <div class="form-control">
        <search-icon class="text-blue-600 mx-2" />
        <input
          class="form-input"
          type="search"
          v-model="searchQuery"
          placeholder="Ketik sesuatu"
        />
      </div>
      <button class="adjust-icon">
        <adjustments-icon class="mx-2 my-3" />
      </button>
    </div>
    <contacts :contacts="getContacts" />
  </div>
  <empty-states
    v-if="contacts.length == 0 && !loading"
    title="Anda belum mempunyai daftar kontak"
  />
</template>

<script>
import AppBar from "./../components/AppBar.vue";
import Loading from "./../components/Loading.vue";
import Contacts from "./../components/Contacts.vue";
import EmptyStates from "./../components/states/EmptyStates.vue";
import SearchIcon from "./../components/icons/SearchIcon.vue";
import AdjustmentsIcon from "./../components/icons/AdjustmentsIcon.vue";

export default {
  name: "Beranda",
  components: {
    "search-icon": SearchIcon,
    "adjustments-icon": AdjustmentsIcon,
    "app-bar": AppBar,
    "empty-states": EmptyStates,
    contacts: Contacts,
    loading: Loading,
  },
  computed: {
    getContacts() {
      return this.contacts;
    },
  },
  data() {
    return {
      loading: false,
      contacts: [
        {
          id: 'edi',
          name: 'Sugiman',
          phone: 'failed load'
        }
      ],
      searchQuery: null,
    };
  },
};
</script>

<style lang="postcss">
.contact-list-wrapper {
  @apply max-h-full overflow-y-auto mb-2 rounded-lg shadow-lg;
}
.search-box {
  @apply flex items-center sticky top-0 bg-white border-b-2 p-4 space-x-2 z-10;
}
.adjust-icon {
  @apply focus:bg-gray-200 focus:outline-none focus:text-blue-600 rounded-lg cursor-pointer;
}
</style>
