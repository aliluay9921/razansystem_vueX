<template>
  <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
    <span class="dropdown-item dropdown-header">اشعارات من الأدمن</span>
    <div class="dropdown-divider"></div>
    <div class="scrollable-menu">
      <div
        class="dropdown-footer"
        style="direction: rtl"
        v-for="(item, index) in items"
        :key="index"
      >
        <!-- Message Start -->
        <div class="media">
          <img
            src="dist/img/user1-128x128.jpg"
            alt="User Avatar"
            class="img-size-50 mr-3 img-circle"
          />
          <div class="media-body" style="text-align: right; padding-right: 5px">
            <h3 class="dropdown-item-title">
              تنبيه من الأدمن
              <span v-if="!item.seen" class="float-left"
                ><button
                  class="ui mini circular inverted green icon button"
                  @click="markSeen(index, item)"
                >
                  <i class="check icon"></i></button
              ></span>
            </h3>
            <p
              class="text-sm"
              :style="[item.seen ? { 'text-decoration': 'line-through' } : {}]"
            >
              {{ item.description }}
            </p>
            <p class="text-sm text-muted float-left">
              <i class="far fa-clock ml-1"></i>
              <timeago :datetime="item.created_at"></timeago>
            </p>
          </div>
        </div>
        <!-- Message End -->
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

  name: "notificationAdmin",
  data() {
    return {
      limit: 0,
    };
  },
  computed: {
    items() {
      return this.$store.state.adminNotification;
    },
    isNotLoading() {
      return this.$store.state.isNotLoading;
    },
  },
  mounted() {
    $(".dropdown-menu").on("click", function (event) {
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
            .each(function () {
              events[i].handler.call(this, event);
            });
        }
      }
      event.stopPropagation(); //Always stop propagation
    });
  },

  methods: {
    markSeen(index, item) {
      // console.log(item);
      this.$store.dispatch("markAsSeen", [index, item]);
    },
    ...mapActions(["loadAdminNotification", "socketAdmin"]),

    infiniteHandler() {
      console.log(this.limit);
      this.limit = this.limit + 10;
      this.$store.dispatch("loadAdminNotification", this.limit);
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
