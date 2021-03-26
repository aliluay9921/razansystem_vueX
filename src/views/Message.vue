<template>
  <div class="content-wrapper">
    <div class="details">
      <h2>التبليغات</h2>
    </div>
    <div class="container mt-5 mr-5">
      <div class="row">
        <div class="col-md-10">
          <div class="card">
            <h5 class="card-header">ارسال تبليغ</h5>
            <div class="card-body">
              <div class="form-group">
                <label for="exampleInputEmail1" class="float-right text-lg"
                  >عنوان الرسالة</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  v-model="name"
                />
              </div>
              <div class="form-group">
                <label
                  for="exampleFormControlTextarea1"
                  class="float-right text-lg"
                >
                  ...اكتب هنا
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="message"
                ></textarea>
              </div>
              <a
                href="#"
                @click="send_message"
                class="btn btn-info float-right text-lg m-2"
              >
                ارسال الى الموضف</a
              >

              <a
                href="#"
                @click="send_message_brodcast"
                class="btn btn-info float-right text-lg m-2"
              >
                ارسال الى المستخدمين</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      message: "",
    };
  },
  methods: {
    send_message() {
      let data = {
        name: this.name,
        description: this.message,
      };
      this.$store.dispatch("sendMessgae", data);
      this.name = "";
      this.message = "";
    },
    send_message_brodcast() {
      let data = {
        name: this.name,
        description: this.message,
      };
      this.$store.dispatch("sendMessgaeBrodcast", data);
      this.name = "";
      this.message = "";
    },
  },
};
</script>
