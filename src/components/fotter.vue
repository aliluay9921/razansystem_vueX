<template>
  <footer class="main-footer">
    <strong
      >Copyright &copy; 2014-2020
      <a href="https://adminlte.io">AdminLTE.io</a>.</strong
    >
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.1.0-pre
    </div>
  </footer>
</template>
<script>
export default {
  components: {},
  mounted() {
    let scriptSemantic = document.createElement("script");
    scriptSemantic.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.js"
    );
    document.head.appendChild(scriptSemantic);
    let linkSemantic = document.createElement("link");
    linkSemantic.setAttribute("rel", "stylesheet");
    linkSemantic.setAttribute(
      "href",
      "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.css"
    );
    document.head.appendChild(linkSemantic);
  },
};
</script>