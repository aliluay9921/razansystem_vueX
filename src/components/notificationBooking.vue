<template>
  <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
    <span class="dropdown-item dropdown-header">اشعارات تسجيل حجوزات</span>
    <div class="dropdown-divider"></div>
    <div class="scrollable-menu">
      <div v-for="(item, index) in items" :key="index">
        <router-link to="/booking">
          <a href="#" class="dropdown-item" @click="sendinfo(index, item)">
            <i class="fa fa-user mr-2"></i>
            {{ item.user.first_name == null ? "guest" : item.user.first_name }}
            {{ item.user.last_name == null ? "guest" : item.user.last_name }}

            <span class="float-right text-muted text-sm"
              ><timeago :datetime="item.created_at"></timeago>
            </span> </a
        ></router-link>
        <div class="dropdown-divider"></div>
      </div>
    </div>

    <div class="dropdown-divider"></div>
    <a class="dropdown-footer" v-if="isNotLoading">
      <img
        src="../assets/loading.svg"
        style="margin: 0 auto; height: 20px; width: 20px"
        alt="loading..."
      />
    </a>
    <a href="#" class="dropdown-footer" v-on:click="infiniteHandler" v-else>
      تحميل المزيد
    </a>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {},

  name: "notificationBooking",
  data() {
    return {
      limit: 0,
    };
  },
  computed: {
    items() {
      return this.$store.state.bookingInfo;
    },
    isNotLoading() {
      return this.$store.state.isNotLoading;
    },
  },
  mounted() {
    $(".dropdown-menu").on("click", function(event) {
      var events = $._data(document, "events") || {};
      events = events.click || [];
      for (var i = 0; i < events.length; i++) {
        if (events[i].selector) {
          //Check if the clicked element matches the event selector
          if ($(event.target).is(events[i].selector)) {
            events[i].handler.call(event.target, event);
          }
          // Check if any of the clicked element parents matches the
          // delegated event selector (Emulating propagation)
          $(event.target)
            .parents(events[i].selector)
            .each(function() {
              events[i].handler.call(this, event);
            });
        }
      }
      event.stopPropagation(); //Always stop propagation
    });
  },

  methods: {
    getinfo(index, item) {
      // console.log(item);
      this.$store.commit("getinfo", [index, item]);
    },
    sendinfo(index, item) {
      this.$store.commit("sendinfo", [index, item]);
    },
    markSeen(index, item) {
      // console.log(item);
      this.$store.dispatch("markAsSeen", [index, item]);
    },
    ...mapActions(["loadnotificationBooking", "socketAdmin"]),

    infiniteHandler() {
      console.log(this.limit);
      this.limit = this.limit + 10;
      this.$store.dispatch("loadnotificationBooking", this.limit);
    },
  },
};
</script>
<style>
.scrollable-menu {
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
}
</style>
