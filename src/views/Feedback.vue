<template>
  <app-bar title="Report and Feedback">
    <template v-slot:back>
      <div
        class="h-full hover:text-blue-600 text-gray-700 flex items-center pr-1 cursor-pointer"
        @click="$router.go(-1)"
      >
        <arrow-left-icon />
      </div>
    </template>
  </app-bar>
  <div class="max-h-full overflow-y-auto bg-rounded-white p-4">
    <div class="space-y-2">
      <div
        class="form-control"
        :class="errors.includes('title') ? 'ring-error' : ''"
      >
        <hashtag-icon
          class="h-6 w-6 mx-2"
          :class="errors.includes('title') ? 'text-error' : 'text-blue-600'"
        />
        <input
          class="form-input"
          type="text"
          v-model="title"
          placeholder="Judul"
        />
      </div>
      <error-input
        v-if="errors.length"
        :errors="errors"
        message="Judul tidak boleh kosong"
        errorUnit="title"
      />
      <div
        class="flex-1 flex items-start bg-blue-100 rounded-lg"
        :class="errors.includes('description') ? 'ring-error' : ''"
      >
        <comment-icon
          :class="
            errors.includes('description') ? 'text-error' : 'text-blue-600'
          "
        />
        <textarea
          class="form-input"
          rows="3"
          v-model="description"
          placeholder="Your comment"
        ></textarea>
      </div>
      <error-input
        v-if="errors.length"
        :errors="errors"
        message="Deskripsi tidak boleh kosong"
        errorUnit="description"
      />
      <div class="flex w-full space-x-2 items-center pt-2">
        <button class="button-form bg-blue-50 ring-inset" @click="reset">
          RESET
        </button>
        <button
          @click="feedback"
          class="button-form bg-blue-600 hover:bg-blue-700 text-gray-50"
        >
          KIRIM
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import HashtagIcon from "./../components/icons/HashtagIcon.vue";
import CommentIcon from "./../components/icons/CommentIcon.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";
import ErrorInput from '../components/states/ErrorInput.vue';

export default {
  name: "Feedback",
  components: { AppBar, HashtagIcon, CommentIcon, ArrowLeftIcon, ErrorInput },
  data() {
    return {
      errors: [],
      title: "",
      description: "",
    };
  },
  methods: {
    feedback: function() {
      this.errors = [];
      if (this.title && this.description) {
        // SEND DATA TO API
      }
      if (!this.title) this.errors.push("title");
      if (!this.description) this.errors.push("description");
    },
    reset: function() {
      this.errors = [];
      this.title = "";
      this.description = "";
    },
  },
};
</script>
