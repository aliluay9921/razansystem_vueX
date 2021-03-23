<template>
  <div>
    <div class="loginPage">
      <div class="form">
        <h2>تسجيل دخول الموضف </h2>
        <form @submit.prevent="login">
          <div class="form-group text-right">
            <label for="exampleInputEmail1 ">اسم المستخدم</label>
            <input
              type="text"
              class="form-control"
              id="UserName"
              aria-describedby="emailHelp"
              v-model="UserName"
            />
          </div>
          <div class="form-group text-right">
            <label for="exampleInputEmail1">كلمة المرور</label>
            <input
              type="password"
              class="form-control"
              id="UserName"
              aria-describedby="emailHelp"
              v-model="password"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block"
          >تسجيل دخول</button>
        </form>
      </div>
      <div class="lotte">
        <img src="/img/animation_640_klp8asrd.gif">
      </div>
    </div>
  </div>

  <!--end log form -->
  <!-- <form class="login" @submit.prevent="login">
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
    </form> -->
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
    login: function () {
      let UserName = this.UserName;
      let password = this.password;
      this.$store
        .dispatch("login", { UserName, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
    mounted() {},
  },
};
</script>
<style>
.loginPage {
  display: flex;
  direction: rtl;
  justify-content: space-around;
  margin: 10px;
  min-height: 700px;
}

.loginPage .form {
  margin-top: 100px;
  margin-right: 50px;
  width: 400px;
  height: 300px;
  padding: 20px;
}
.loginPage .form h2 {
  text-align: center;
  padding: 15px;
}

.loginPage .form .btn {
  margin-top: 50px;
}
.loginPage .lotte {
  width: 50%;
  padding: 15px;
}
.loginPage .lotte img {
  width: 100%;
}
</style>
