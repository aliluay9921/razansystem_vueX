<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index3.html" class="brand-link">
      <img
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity:.8"
      />
      <span class="brand-text font-weight-light">شركة الرزان</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <a href="#" class="d-block text-left"
            ><h3>{{ userName }}</h3></a
          >
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input
            class="form-control form-control-sidebar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link to="/Countries">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-th"></i>
                <p>
                  الدول
                </p>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/flightLine">
              <a href="#" class="nav-link">
                <i class="nav-icon fa fa-plane"></i>
                <p>
                  شركات الطيران
                </p>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/discount">
              <a href="#" class="nav-link">
                <i class="nav-icon fa fa-envelope-open"></i>
                <p>
                  العروض
                </p>
              </a>
            </router-link>
          </li>
          <li class="nav-item  ">
            <router-link to="/posationAvailable">
              <a href="#" class="nav-link">
                <i class="map marker alternate icon "></i>

                <p>
                  الاماكن المتوفرة
                </p>
              </a>
            </router-link>
          </li>
          <li class="nav-item  ">
            <router-link to="/orderPnr">
              <a href="#" class="nav-link">
                <i class="map marker alternate icon "></i>

                <p>
                  الحجوزات
                </p>
              </a>
            </router-link>
          </li>
          <li class="nav-item" v-if="status == 2">
            <router-link to="/Messgae">
              <a href="#" class="nav-link">
                <i class="map marker alternate icon "></i>

                <p>
                  ارسال تبليغ
                </p>
              </a>
            </router-link>
          </li>

          <li class="nav-item">
            <a @click="logout" class="nav-link">
              <i class="sign in alternate icon"></i>
              تسجيل خروج
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- send message to employee -->
  </aside>
</template>
<script>
export default {
  computed: {
    userName() {
      let first_name = localStorage.getItem("first_name").toUpperCase();
      let last_name = localStorage.getItem("last_name").toUpperCase();
      return first_name + " " + last_name;
    },
    status() {
      return localStorage.getItem("status");
    },
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style></style>
