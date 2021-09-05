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
      <!-- <button class="adjust-icon">
        <adjustments-icon class="mx-2 my-3" />
      </button> -->
    </div>
    <contacts :contacts="getContacts" />
  </div>
  <empty-states
    v-if="contacts.length == 0 && !loading"
    title="Anda belum mempunyai daftar kontak"
  />
</template>

<script>
import app from "./../firebaseinit";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
const db = getFirestore(app);

import AppBar from "./../components/AppBar.vue";
import Loading from "./../components/Loading.vue";
import Contacts from "./../components/Contacts.vue";
import EmptyStates from "./../components/states/EmptyStates.vue";
import SearchIcon from "./../components/icons/SearchIcon.vue";

export default {
  name: "Beranda",
  components: {
    SearchIcon,
    AppBar,
    EmptyStates,
    Contacts,
    Loading,
  },
  data() {
    return {
      loading: false,
      contacts: [],
      searchQuery: null,
    };
  },
  mounted() {
    this.readContacts();
  },
  computed: {
    getContacts() {
      if (this.searchQuery) {
        return this.contacts.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.name.toLowerCase().includes(v) || item.phone.includes(v)
            );
        });
      } else {
        return this.contacts;
      }
    },
  },
  methods: {
    readContacts: async function() {
      this.loading = true;
      const q = query(collection(db, "contacts"));
      await getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.contacts.push({
              id: doc.id,
              name: doc.data().name,
              phone: doc.data().phone,
            });
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          // console.log("Error getting documents, " + error);
        });
    },
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
