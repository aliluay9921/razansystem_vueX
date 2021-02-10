<template>
  <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
    <span class="dropdown-item dropdown-header">اشعارات تسجيل حجوزات</span>
    <div class="dropdown-divider"></div>
    <div class="scrollable-menu">
      <div v-for="(item, index) in items" :key="index">
        <router-link to="/flightplan">
          <a href="#" class="dropdown-item" @click="getinfo(index, item.order)">
            <i class="fa fa-user mr-2"></i>
            {{ item.user.FullName == null ? "guest" : item.user.FullName }}
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

  name: "notificationOrder",
  data() {
    return {
      limit: 10,
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    isNotLoading() {
      return this.$store.state.isNotLoading;
    },
  },
  mounted() {
    $(".dropdown-menu > .dropdown-footer").on("click", function (event) {
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
    getinfo(index, item) {
      // console.log(item);
      this.$store.commit("getinfo", [index, item]);
    },
    ...mapActions(["loadItems", "flightline", "loadCountries", "socketAdmin"]),

    infiniteHandler() {
      console.log(this.limit);
      this.limit = this.limit + 10;
      this.$store.dispatch("loadItems", this.limit);
    },
  },
};
</script>
<style >
.scrollable-menu {
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
}
</style>