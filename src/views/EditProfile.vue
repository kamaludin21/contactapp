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
  <div class="max-h-full overflow-y-auto bg-rounded-white px-4 py-2 mb-2  ">
    <p class="font-medium tracking-wide text-gray-600 pt-2">Photo</p>
    <div class="flex items-center py-4 space-x-4">
      <img
        v-if="!previewUrl"
        class="inline object-cover w-20 h-20 ring-4 ring-gray-200 border-gray-200 shadow-lg rounded-full"
        :src="
          photoURL
            ? photoURL
            : 'https://ui-avatars.com/api/?background=2563EB&color=fff&name=' +
              nama
        "
        alt="Profile image"
      />
      <img
        v-if="previewUrl"
        class="inline object-cover w-20 h-20 ring-4 ring-gray-200 border-gray-200 shadow-lg rounded-full"
        :src="previewUrl"
        alt="Profile image"
      />
      <div class="w-full h-auto space-y-3">
        <input
          type="file"
          name="file"
          id="file"
          @change="onFileChange"
          class="input-file"
        />
        <label for="file" class="input-button">{{
          files ? files : "Change avatar"
        }}</label>

        <div class="space-y-1">
          <p class="text-xs font-medium text-blue-700" v-if="previewUrl">
            Upload: 0%
          </p>
          <div
            class="h-2 relative w-full rounded-full overflow-hidden"
            v-if="previewUrl"
          >
            <div class="w-full h-full bg-blue-200 absolute"></div>
            <div
              style="width: 0%"
              id="bar"
              class="h-full bg-blue-600 relative"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <p class="font-medium tracking-wide text-gray-600">Nama</p>
      <div
        class="form-control"
        :class="errors.includes('nama') ? 'ring-error' : ''"
      >
        <user-icon
          class="h-6 w-6 mx-2"
          :class="errors.includes('nama') ? 'text-error' : 'text-blue-600'"
        />
        <input
          class="form-input"
          type="text"
          placeholder="Nama"
          v-model="nama"
        />
      </div>
      <error-input
        v-if="errors.length"
        :errors="errors"
        message="Nama tidak boleh kosong"
        errorUnit="nama"
      />
      <div class="flex justify-center items-center text-center py-4 space-x-4">
        <button
          @click="reset"
          class="flex-1 font-semibold py-3 rounded-lg text-blue-600 hover:bg-gray-200"
        >
          RESET
        </button>
        <button
          @click="updateProfile"
          class=" flex-1 bg-blue-600 py-3 rounded-lg font-semibold text-white"
        >
          SIMPAN
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";
import UserIcon from "../components/icons/UserIcon.vue";
import ErrorInput from "../components/states/ErrorInput.vue";

import { getAuth } from "firebase/auth";

export default {
  components: { AppBar, ArrowLeftIcon, ErrorInput, UserIcon },
  name: "EditProfile",
  data() {
    return {
      errors: [],
      photoURL: null,
      nama: null,
      files: null,
      previewUrl: null,
    };
  },
  mounted() {
    this.currentUser();
  },
  methods: {
    currentUser: function() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        this.nama = user.displayName;
        this.photoURL = user.photoURL;
      }
    },
    updateProfil: function() {
      // import { getAuth, updateProfile } from "firebase/auth";
      // const auth = getAuth();
      // updateProfile(auth.currentUser, {
      //   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
      // }).then(() => {
      // Profile updated!
      // ...
      // }).catch((error) => {
      // An error occurred
      // ...
      // });
    },

    onFileChange: function(e) {
      this.files = e.target.files[0].name;
      const file = e.target.files[0];
      this.previewUrl = URL.createObjectURL(file);
    },
    updateProfile: function() {
      this.errors = [];
      if (this.nama) {
        // Code
      }
      if (!this.title) this.errors.push("nama");
    },
    reset: function() {
      (this.files = null), (this.previewUrl = null);
    },
  },
};
</script>

<style lang="postcss">
.input-file {
  @apply w-0.5 h-0.5 opacity-0 overflow-hidden absolute z-0;
}

.input-button {
  @apply bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-full font-semibold text-xs text-white cursor-pointer;
}
</style>
