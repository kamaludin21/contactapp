<template>
  <app-bar title="Kontak Baru" />
  <loading v-if="loading" />
  <!-- tampilkan pesan response api -->
  <alert-states
    v-if="ifAlert"
    isAction="warning"
    :title="error"
    @onClick="removeAlert"
  />
  <alert-states
    v-if="isSuccess"
    isAction="success"
    title="Berhasil menambah kontak"
    @onClick="removeAlert"
  />
  <div class="bg-rounded-white px-3 py-4 mb-2 space-y-2" v-if="!loading">
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
        @click="saveContact()"
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
import app from "./../firebaseinit";
import { addDoc, getFirestore, collection } from "firebase/firestore";

const db = getFirestore(app);
const { nanoid } = require("nanoid");
export default {
  name: "KontakBaru",
  components: {
    AppBar,
    AlertStates,
    Loading,
    UserIcon,
    PhoneIcon,
    ErrorInput,
  },
  mounted() {
    this.focusForm();
  },
  data() {
    return {
      id: nanoid(10),
      loading: false,
      ifAlert: false,
      isSuccess: false,
      errors: [],
      error: "",
      name: null,
      phone: null,
      searchQuery: null,
      success: false,
    };
  },
  methods: {
    focusForm: function() {
      this.$refs.name.focus();
    },
    saveContact: async function() {
      this.errors = [];
      const uid = this.$store.state.user.data.uid;
      
      if (this.name && this.phone) {
        this.loading = !this.loading;
        try {
          await addDoc(collection(db, uid),{
            id: this.id,
            name: this.name,
            phone: this.phone
          })
          this.name = ""
          this.phone = ""
        } catch (error) {
          this.ifAlert = !this.ifAlert
          this.error = error
        } finally {
          this.loading = !this.loading
          this.isSuccess = !this.isSuccess
        }
      } else {
        if (!this.name) this.errors.push("name");
        if (!this.phone) this.errors.push("phone");
      }
    },
    removeAlert: function() {
      this.ifAlert = false;
      this.isSuccess = false;
    },
    reset: function() {
      (this.name = null), (this.errors = []), (this.phone = null);
    },
  },
};
</script>

<style lang="postcss"></style>
