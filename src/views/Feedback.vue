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
      <div class="form-control">
        <hashtag-icon />
        <input
          class="form-input"
          type="text"
          placeholder="Topik atau subject"
        />
      </div>
      <div class="flex-1 flex items-start bg-blue-100 rounded-lg">
        <comment-icon />
        <textarea
          class="form-input"
          rows="3"
          placeholder="Your comment"
        ></textarea>
      </div>
      <div class="flex w-full space-x-2 items-center pt-2">
        <button class="button-form bg-blue-50 ring-inset" @click="Reset()">
          RESET
        </button>
        <button
          @click="saveContact()"
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
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon.vue';

export default {
  name: "Feedback",
  components: { AppBar, HashtagIcon, CommentIcon, ArrowLeftIcon },
  
};
</script>
