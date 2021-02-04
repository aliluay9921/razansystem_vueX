<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>user</label>
      <input required v-model="UserName" type="text" placeholder="Name" />
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <hr />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      UserName: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      let UserName = this.UserName;
      let password = this.password;
      this.$store
        .dispatch("login", { UserName, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style></style>
