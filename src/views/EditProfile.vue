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
  <alert-states
    v-if="isSuccess"
    isAction="success"
    title="Berhasil memperbarui profil"
    @onClick="removeAlert"
  />
  <loading v-if="loading" />
  <div class="bg-rounded-white px-4 py-2 mb-2" v-if="!loading">
    <p class="font-medium tracking-wide text-gray-600 pt-2">
      Photo
    </p>
    <div class="flex items-center w-full py-4 space-x-4">
      <img
        v-if="!previewUrl"
        class="flex-0 inline object-cover w-20 h-20 ring-4 ring-gray-200 border-gray-200 shadow-lg rounded-full"
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
        class="flex-0 inline object-cover w-20 h-20 ring-4 ring-gray-200 border-gray-200 shadow-lg rounded-full"
        :src="previewUrl"
        alt="Profile image"
      />
      <div class="flex-1 flex items-center h-20 overflow-hidden">
        <input
          type="file"
          name="file"
          id="file"
          @change="onFileChange"
          class="input-file"
        />
        <div class="space-y-1 w-full">
          <label
            for="file"
            class="input-button overflow-hidden inline-block max-w-full"
          >
            <span class="whitespace-pre">
              {{ files ? files : "Change avatar" }}
            </span>
          </label>
          <p class="text-xs font-medium text-blue-700" v-if="previewUrl">
            Upload: {{ progress }}%
          </p>
          <div
            class="h-2 relative w-full rounded-full overflow-hidden"
            v-if="previewUrl"
          >
            <div class="w-full h-full bg-blue-200 absolute"></div>
            <div
              :style="{ width: '' + progress + '%' }"
              id="bar"
              class="duration-300 rounded-full h-full bg-blue-600 relative"
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
          @click="updateProfil"
          class="flex-1 justify-center mx-auto inline-flex items-center  bg-blue-600 py-3 rounded-lg font-semibold text-white"
        >
          <svg
            v-if="isInProcess"
            class="animate-spin mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-30"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>SIMPAN</span>
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
import Loading from "../components/Loading.vue";
import AlertStates from "../components/states/AlertStates.vue";

import store from "./../store";
import {
  reload,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const auth = getAuth();
const user = auth.currentUser;
const storage = getStorage();

export default {
  components: {
    AppBar,
    ArrowLeftIcon,
    ErrorInput,
    UserIcon,
    Loading,
    AlertStates,
  },
  name: "EditProfile",
  data() {
    return {
      loading: false,
      isSuccess: false,
      isInProcess: false,
      error: null,
      errors: [],
      photoURL: null,
      newPhotoURL: null,
      nama: null,
      file: null,
      files: null,
      previewUrl: null,
      extension: null,
      progress: 0,
    };
  },
  mounted() {
    this.currentUser();
  },
  methods: {
    currentUser: function() {
      if (user !== null) {
        this.nama = user.displayName;
        this.photoURL = user.photoURL;
      }
    },
    updateProfil: function() {
      this.errors = [];

      if (this.nama) {
        this.isInProcess = !this.isInProcess;
        try {
          if (this.file) {
            const uid = this.$store.state.user.data.uid;
            const metadata = {
              contentType: "image/jpeg",
            };
            const uploadRef = ref(
              storage,
              "/profile-picture/" + uid + "." + this.extension
            );
            const uploadTask = uploadBytesResumable(
              uploadRef,
              this.file,
              metadata
            );
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.floor(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.progress = progress;
              },
              (error) => {
                this.error = error;
              },
              () => {
                setTimeout(() => {
                  this.loading = !this.loading;
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      this.newPhotoURL = downloadURL;
                      const auth = getAuth();
                      updateProfile(auth.currentUser, {
                        displayName: this.nama,
                        photoURL: this.newPhotoURL,
                      }).then(() => {
                        this.reset();
                        this.loading = !this.loading;
                        this.isSuccess = !this.isSuccess;
                        this.isInProcess = !this.isInProcess;
                        reload(auth.currentUser).then(() => {
                          onAuthStateChanged(auth, (user) => {
                            store.dispatch("fetchUser", user);
                          });
                        });
                      });
                    }
                  );
                }, 500);
              }
            );
          } else {
            this.loading = !this.loading;
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              displayName: this.nama,
              photoURL: this.newPhotoURL,
            }).then(() => {
              this.loading = !this.loading;
              this.isSuccess = !this.isSuccess;
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (!this.nama) this.errors.push("nama");
    },
    onFileChange: function(e) {
      this.file = e.target.files[0];
      const files = e.target.files[0].name;
      this.extension = files.split(".").pop();
      this.previewUrl = URL.createObjectURL(e.target.files[0]);
    },
    removeAlert: function() {
      this.isSuccess = false;
    },
    reset: function() {
      this.photoURL = null;
      this.nama = null;
      this.file = null;

      this.previewUrl = null;
      this.extension = null;
      this.progress = 0;
      this.isSuccess = false;

      this.currentUser();
    },
  },
};
</script>

<style lang="postcss">
.input-file {
  @apply w-0.5 h-0.5 opacity-0 overflow-hidden absolute z-0;
}

.input-button {
  @apply bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full font-semibold text-xs text-white cursor-pointer;
}
</style>
