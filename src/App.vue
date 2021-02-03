<template>
  <div id="app">
    <div class="wrapper">
      <navbar></navbar>
      <router-view />
      <sidebar></sidebar>
      <fotter></fotter>
    </div>
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
<style></style>
