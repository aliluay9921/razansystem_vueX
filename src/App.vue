<template>
  <div id="app">
    <div class="wrapper" v-if="isLoggedIn">
      | <a @click="logout">Logout</a>
      <navbar></navbar>
      <router-view />
      <sidebar></sidebar>
      <!-- <fotter></fotter> -->
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import navbar from "../src/components/navbar";
import sidebar from "../src/components/sidebar";
// import fotter from "../src/components/fotter";
export default {
  components: {
    navbar,
    sidebar,
    // fotter,
  },
  mounted() {},
  computed: {
    isLoggedIn: function() {
      console.log(this.$store.getters.isLoggedIn);
      return this.$store.getters.isLoggedIn;
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
