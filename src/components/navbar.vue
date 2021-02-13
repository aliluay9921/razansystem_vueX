<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a class="nav-link"> <router-link to="/">Home</router-link></a>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input
          class="form-control form-control-navbar"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-comments"></i>
          <span class="badge badge-danger navbar-badge">{{
            adminNotification.length
          }}</span>
        </a>
        <notificationAdmin></notificationAdmin>
      </li>
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">{{
            items.length
          }}</span>
        </a>
        <notificationOrder></notificationOrder>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-address-card"></i>
          <span class="badge badge-warning navbar-badge">{{
            bookingInfo.length
          }}</span>
        </a>
        <notificationBooking></notificationBooking>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          href="#"
          role="button"
        >
          <i class="fas fa-th-large"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>
<script>
import { mapActions } from "vuex";
import notificationOrder from "./notificationOrder";
import notificationAdmin from "./notificationAdmin";
import notificationBooking from "./notificationBooking";
export default {
  name: "navbar",
  components: {
    notificationOrder,
    notificationAdmin,
    notificationBooking,
  },
  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    adminNotification() {
      return this.$store.state.adminNotification;
    },
    bookingInfo() {
      return this.$store.state.bookingInfo;
    },
  },
  methods: {
    getinfo(index, item) {
      // console.log(item);
      this.$store.commit("getinfo", [index, item]);
    },
    ...mapActions([
      "loadItems",
      "flightline",
      "loadAdminNotification",
      "loadCountries",
      "socketAdmin",
      "loadnotificationBooking",
    ]),
  },

  created() {
    this.loadItems();
    this.flightline();
    this.loadAdminNotification();
    this.loadCountries();
    this.loadnotificationBooking();
  },
  mounted() {
    let scriptSemantic = document.createElement("script");
    scriptSemantic.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.js"
    );
    document.head.appendChild(scriptSemantic);
    let linkSemantic = document.createElement("link");

    linkSemantic.setAttribute(
      "href",
      "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.css"
    );
    document.head.appendChild(linkSemantic);
    let channel = this.$pusher.subscribe("private-notification-admin");

    channel.bind("App\\Events\\AdminNotificationEvent", (data) => {
      this.socketAdmin(data[0]);
    });

    // //Subscribe to the channel we specified in our Adonis Application
  },
};
</script>
<style scoped>
.extra-mini {
  font-size: 0.48571429rem;
}
</style>
