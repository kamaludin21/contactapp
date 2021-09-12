<template>
  <app-bar title="Edit Kontak">
    <template v-slot:back>
      <div
        class="h-full hover:text-blue-700 flex items-center pr-1 cursor-pointer"
        @click="$router.go(-1)"
        title="Kembali"
      >
        <arrow-left-icon />
      </div>
    </template>
    <template v-slot:actions>
      <div
        class="h-full hover:text-red-700 flex items-center pr-1 cursor-pointer"
        title="Hapus Kontak"
        @click="deleteContact({id})"
      >
        <trash-icon />
        
      </div>
    </template>
  </app-bar>
  <loading v-if="loading" />
  <!-- tampilkan pesan response api -->
  <alert-states
    v-if="ifAlert"
    isAction="warning"
    title="Gagal memperbarui data, silakan coba lagi"
    @onClick="removeAlert"
  />
  <alert-states
    v-if="isSuccess"
    isAction="success"
    title="Data kontak diperbarui"
    @onClick="removeAlert"
  />
  <div class="bg-rounded-white p-4 mb-2 space-y-2" v-if="!loading">
    <div
      class="form-control"
      :class="errors.includes('name') ? 'ring-error' : ''"
    >
      <user-icon
        class="h-6 w-6 mx-2"
        :class="errors.includes('name') ? 'text-error' : 'text-blue-600'"
      />
      <input
        class="form-input"
        type="text"
        ref="name"
        v-model="name"
        placeholder="Nama kontak"
      />
    </div>
    <error-input
      v-if="errors.length"
      :errors="errors"
      message="Nama tidak boleh kosong"
      errorUnit="name"
    />
    <div
      class="form-control"
      :class="errors.includes('phone') ? 'ring-error' : ''"
    >
      <phone-icon
        class="h-6 w-6 mx-2"
        :class="errors.includes('phone') ? 'text-error' : 'text-blue-600'"
      />
      <input
        class="form-input"
        type="number"
        v-model="phone"
        placeholder="Nomor telepon kontak"
      />
    </div>
    <error-input
      v-if="errors.length"
      :errors="errors"
      message="Nomor telepon boleh kosong"
      errorUnit="phone"
    />
    <div class="flex w-full space-x-2 items-center pt-2">
      <button class="button-form bg-blue-50 ring-inset" @click="reset">
        RESET
      </button>
      <button
        @click="saveContact(id)"
        class="button-form bg-blue-600 hover:bg-blue-700 text-gray-50"
      >
        SIMPAN
      </button>
    </div>
  </div>
</template>

<script>
import UserIcon from "../components/icons/UserIcon.vue";
import PhoneIcon from "../components/icons/PhoneIcon.vue";
import Loading from "../components/Loading.vue";
import AlertStates from "../components/states/AlertStates.vue";
import ErrorInput from "../components/states/ErrorInput.vue";
import AppBar from "./../components/AppBar.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";
import TrashIcon from '../components/icons/TrashIcon.vue';

import app from "./../firebaseinit";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(app);

export default {
  name: "EditKontak",
  components: {
    AppBar,
    AlertStates,
    Loading,
    UserIcon,
    PhoneIcon,
    ErrorInput,
    ArrowLeftIcon,
    TrashIcon,
  },
  created() {
    this.getContact(this.$route.params.id);
  },
  mounted() {
    this.focusForm();
  },
  data() {
    return {
      loading: false,
      ifAlert: false,
      isSuccess: false,
      errors: [],
      id: "",
      name: "",
      phone: "",
      searchQuery: null,
    };
  },
  methods: {
    getContact: async function(id) {
      const uid = this.$store.state.user.data.uid;
      const docRef = doc(db, uid, id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.id);
      if (docSnap.exists()) {
        this.id = docSnap.id;
        this.name = docSnap.data().name;
        this.phone = docSnap.data().phone;
      } else {
        console.log("No such document!");
      }
    },
    focusForm: function() {
      this.$refs.name.focus();
    },
    saveContact: async function(id) {
      this.errors = [];
      if (this.name && this.phone) {
        this.loading = !this.loading;
        try {
          const uid = this.$store.state.user.data.uid;
          const docRef = doc(db, uid, id);
          await updateDoc(docRef, {
            name: this.name,
            phone: this.phone,
          }).then(() => {
            this.$router.push({ path: "/beranda" });
          });
        } catch (error) {
          this.ifAlert = !this.ifAlert;
          console.log(error);
        } finally {
          this.loading = !this.loading;
          this.$router.push({ path: "/beranda" });
        }
      } else {
        if (!this.name) this.errors.push("name");
        if (!this.phone) this.errors.push("phone");
      }
    },
    deleteContact: async function(id) {
       this.loading = !this.loading;
        try {
          const uid = this.$store.state.user.data.uid;
          const docRef = doc(db, uid, id);
          await deleteDoc(docRef).then(() => {
            this.$router.push({ path: "/beranda" });
          });
        } catch (error) {
          this.ifAlert = !this.ifAlert;
          console.log(error);
        } finally {
          this.loading = !this.loading;
          this.$router.push({ path: "/beranda" });
        }
    },
    removeAlert: function() {
      this.ifAlert = false;
      this.isSuccess = false;
    },
    reset: function() {
      this.getContact(this.$route.params.id);
    },
  },
};
</script>

<style lang="postcss"></style>
