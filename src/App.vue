<template>
  <div id="app">
    <navbar></navbar>
    <router-view />

    <sidebar></sidebar>
    <fotter></fotter>
  </div>
</template>
<script>
import navbar from "../src/components/navbar";
import sidebar from "../src/components/sidebar";
import fotter from "../src/components/fotter";
export default {
  components: {
    navbar,
    sidebar,
    fotter,
  },
};
</script>
<style>
@import "../src/style/flightPlan.css";
</style>
