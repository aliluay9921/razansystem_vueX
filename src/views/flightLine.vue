<template>
  <div class="content-wrapper">
    <div class="card-header">
      <h3 class="card-title">خطوط الطيران المتوفرة</h3>
    </div>

    <div class="container">
      <div class="add mt-3 mb-3 float-right">
        <button
          class="addbtn btn btn-primary"
          data-toggle="modal"
          data-target="#addModel"
        >
          اضافة خطوط طيران
        </button>
      </div>
      <table class="ui celled table" v-if="render">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الصورة</th>
            <th>اخرى</th>
          </tr>
        </thead>
        <tbody v-for="(flightline, index) in flightlines" :key="index">
          <tr>
            <td>{{ flightline.name }}</td>
            <td>
              <img :src="local + flightline.image" alt="image" />
            </td>
            <td>
              <button class="btn btn-danger" @click="deletePost(flightline)">
                حذف
              </button>

              <button
                @click="editPost(index)"
                class="m-1 w-25 btn btn-success"
                data-toggle="modal"
                data-target="#flightModal"
              >
                تعديل
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="modal fade"
        id="flightModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                تعديل خطوط طيران
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="exampleInputEmail1">name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="image-upload">name</label>
                <input
                  type="file"
                  id="image-upload"
                  chips
                  accept="image/*"
                  label="Image"
                  @change="onFileChange"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                خروج
              </button>
              <button
                type="button"
                data-dismiss="modal"
                @click="saveitem"
                class="btn btn-primary"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="addModel"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                اضافة خطوط طيران
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="exampleInputEmail1">الاسم </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  aria-describedby="emailHelp"
                  placeholder="الاسم"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">صورة</label>
                <input
                  type="file"
                  id="image-upload"
                  chips
                  accept="image/*"
                  label="Image"
                  @change="onFileChange"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                خروج
              </button>
              <button
                type="button"
                data-dismiss="modal"
                @click="additem"
                class="btn btn-primary"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.card-body -->
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      local: "http://127.0.0.1:8000",
      name: "",
      file: null,
      image: null,
      current: -1,
    };
  },
  computed: {
    ...mapState(["flightlines", "render"]),
  },
  methods: {
    ...mapActions(["flightline"]),

    editPost(index) {
      this.current = index;
      this.name = this.flightlines[index].name;
    },
    additem() {
      let data = {
        name: this.name,
        image: this.image,
      };
      //  if (this.image != null) data["image"] = this.image;
      this.$store.dispatch("createPost", data);
    },
    saveitem() {
      let flight = this.flightlines[this.current];
      let data = {
        id: flight.id,
        name: this.name,
      };
      if (this.image != null) data["new_image"] = this.image;
      this.$store.dispatch("updateitem", data);
      this.$store.dispatch("forceRerender");
    },
    deletePost(flightline) {
      this.$store.dispatch("deletePost", flightline);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
        this.image = vm.image;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
.dataTables_filter {
  float: right !important;
}
.addbtn {
  width: 200px !important;
  height: 50px;
  font-size: 20px;
}
</style>
