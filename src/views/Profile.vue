<template>
  <app-bar title="Profile" />
  <div class="max-h-full overflow-y-auto bg-rounded-white mb-2">
    <circle-image-profile
      :displayName="user.data.displayName"
      :email="user.data.email"
      :photoUrl="
        user.data.photoURL
          ? user.data.photoURL
          : 'https://ui-avatars.com/api/?background=2563EB&color=fff&name=' +
            user.data.displayName +
            ''
      "
    />
    <p class="section-title">Akun</p>
    <div class="border-t border-b border-gray-200">
      <ul class="divide-y divide-gray-200 divide-solid">
        <router-link class="profile-menu-wrapper group" to="/profil/edit">
          <circle-user-icon class="profile-menu-icon" />
          <p class="profile-menu-title">Change Profile</p>
        </router-link>
        <router-link to="/profil/security" class="profile-menu-wrapper group">
          <lock-icon class="profile-menu-icon" />
          <p class="profile-menu-title">Security</p>
        </router-link>
      </ul>
    </div>
    <p class="section-title">Lainnya</p>
    <div class="border-t border-gray-200">
      <ul class="divide-y divide-gray-200 divide-solid">
        <router-link to="/profil/feedback" class="profile-menu-wrapper group">
          <analytic-icon class="profile-menu-icon" />
          <p class="profile-menu-title">Report &#38; Feedback</p>
        </router-link>
        <li class="profile-menu-wrapper group" @click="showDialog('about')">
          <info-icon class="profile-menu-icon" />
          <p class="profile-menu-title">About</p>
        </li>
        <li class="profile-menu-wrapper group" @click="showDialog('logout')">
          <exit-icon class="profile-menu-icon" />
          <p class="profile-menu-title">Log Out</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CircleImageProfile from "../components/CircleImageProfile.vue";
import LockIcon from "../components/icons/LockIcon.vue";
import AppBar from "./../components/AppBar.vue";
import CircleUserIcon from "./../components/icons/CircleUserIcon.vue";
import AnalyticIcon from "./../components/icons/AnalyticIcon.vue";
import InfoIcon from "./../components/icons/InfoIcon.vue";
import ExitIcon from "./../components/icons/ExitIcon.vue";

import { mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  components: {
    AppBar,
    CircleImageProfile,
    CircleUserIcon,
    LockIcon,
    AnalyticIcon,
    InfoIcon,
    ExitIcon,
  },
  methods: {
    showDialog: function(type) {
      this.$store.commit("POPUP_DIALOG");
      if (type == "about") return this.$store.commit("ABOUT_APP");
      if (type == "logout") return this.$store.commit("CONFIRM_LOGOUT");
    },
  },
};
</script>

<style lang="postcss" scoped>
.section-title {
  @apply p-4 pb-2 font-medium tracking-wide text-gray-600;
}
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
