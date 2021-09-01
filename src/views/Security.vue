<template>
  <app-bar title="Security">
    <template v-slot:back>
      <div
        class="h-full hover:text-blue-700 flex items-center pr-1 cursor-pointer"
        @click="$router.go(-1)"
      >
        <arrow-left-icon />
      </div>
    </template>
  </app-bar>
  <div class="max-h-full overflow-y-auto bg-rounded-white p-4 mb-2">
    <!-- Alert -->
    <form @submit.prevent="changePassword" class="space-y-2">
      <p class="font-medium text-sm">Password lama</p>
      <div
        class="form-control"
        :class="errors.includes('oldPassword') ? 'ring-error' : ''"
      >
        <lock-icon
          class="h-6 w-6 mx-2"
          :class="
            errors.includes('oldPassword') ? 'text-error' : 'text-blue-600'
          "
        />
        <input
          class="form-input"
          type="password"
          v-model="oldPassword"
          placeholder="Old password"
          autocomplete="off"
        />
      </div>
      <error-input
        v-if="errors.length"
        :errors="errors"
        message="Password lama tidak boleh kosong"
        errorUnit="oldPassword"
      />

      <p class="font-medium text-sm">Password baru</p>
      <div
        class="form-control"
        :class="errors.includes('newPassword') ? 'ring-error' : ''"
      >
        <lock-icon
          class="h-6 w-6 mx-2"
          :class="
            errors.includes('newPassword') ? 'text-error' : 'text-blue-600'
          "
        />
        <input
          class="form-input"
          type="password"
          v-model="newPassword"
          placeholder="New password"
          autocomplete="off"
        />
      </div>
      <error-input
        v-if="errors.length"
        :errors="errors"
        message="Password baru tidak boleh kosong"
        errorUnit="newPassword"
      />
      <p class="font-medium text-sm">Konfirmasi password baru</p>
      <div
        class="form-control"
        :class="
          errors.includes('confirmNewPassword') ||
          errors.includes('failconfirm')
            ? 'ring-error'
            : ''
        "
      >
        <lock-icon
          class="h-6 w-6 mx-2"
          :class="
            errors.includes('confirmNewPassword') ||
            errors.includes('failconfirm')
              ? 'text-error'
              : 'text-blue-600'
          "
        />
        <input
          class="form-input"
          type="password"
          v-model="confirmNewPassword"
          placeholder="Confirm new password"
          autocomplete="off"
        />
      </div>
      <error-input
        v-if="errors.length"
        :errors="errors"
        :message="
          errors.includes('confirmNewPassword')
            ? 'Konfirmasi password tidak boleh kosong'
            : errors.includes('failconfirm')
            ? 'Konfirmasi password tidak sama'
            : ''
        "
        :errorUnit="
          errors.includes('confirmNewPassword')
            ? 'confirmNewPassword'
            : errors.includes('failconfirm')
            ? 'failconfirm'
            : ''
        "
      />
      <div class="flex w-full space-x-2 items-center pt-2">
        <button type="reset" class="button-form bg-blue-50 ring-inset" @click=reset>
          RESET
        </button>
        <button
          class="button-form bg-blue-600 hover:bg-blue-700 text-gray-50"
        >
          SIMPAN
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";
import LockIcon from "../components/icons/LockIcon.vue";
import ErrorInput from "../components/states/ErrorInput.vue";

export default {
  name: "Security",
  components: { AppBar, ArrowLeftIcon, LockIcon, ErrorInput },
  data() {
    return {
      errors: [],
      errorFirebase: null,
      success: false,
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    };
  },
  methods: {
    changePassword: function() {
      this.errors = [];
      if (this.oldPassword) {
        // Code
      }
      if (!this.oldPassword) this.errors.push("oldPassword");
      if (!this.newPassword) this.errors.push("newPassword");
      if (!this.confirmNewPassword) this.errors.push("confirmNewPassword");
      if (this.newPassword !== this.confirmNewPassword)
        this.errors.push("failconfirm");
    },
    reset: function() {
      this.errors = [];
      this.errorFirebase = null;
      this.success = false;
      this.oldPassword = null;
      this.newPassword = null;
      this.confirmNewPassword = null;
    },
  },
};
</script>
