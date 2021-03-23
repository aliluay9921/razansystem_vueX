<template>
  <div class="content-wrapper">
    <div class="card-header">
      <h3 class="card-title">العروض المتوفرة</h3>
    </div>
    <div class="container">
      <div class="add mt-3 mb-3 float-right">
        <button
          class="addbtn btn btn-primary"
          data-toggle="modal"
          data-target="#addModel"
        >
          اضافة عروض
        </button>
      </div>
      <table class="table table-hover table-bordered mr-5 ">
        <thead>
          <tr>
            <th class="pl-5 pr-5">الدولة</th>
            <th class="pl-5 pr-4 ">الصورة</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(posationAvailable, index) in posationAvailables"
            :key="index"
          >
            <td class="text-center">
              {{ posationAvailable.countary.NameArbic }}
            </td>

            <td class="text-center">
              <img
                :src="local + posationAvailable.image"
                alt="image"
                width="100px"
                height="30px"
              />
            </td>

            <td class="pr-3 pl-3 d-flex">
              <button
                class=" btn btn-danger m-1"
                @click="deletePost(posationAvailable)"
              >
                <i class="minus icon"></i>
              </button>

              <button
                @click="editPost(index)"
                class="  btn btn-success m-1"
                data-toggle="modal"
                data-target="#editModal"
              >
                <i class="edit icon"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ADD POSATION -->
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
                اضافة اماكن متوفرة
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
                <label for="exampleFormControlSelect2">اختر الدولة</label>
                <select
                  class="form-control"
                  id="countary"
                  v-model="countary_id"
                >
                  <option
                    v-for="countrie in countries"
                    :key="countrie.id"
                    :value="countrie.id"
                    >{{ countrie.NameArbic }}</option
                  >
                </select>
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
      <!-- EDIT POSATION -->
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                تعديل الاماكن المتوفرة
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
                <label for="exampleFormControlSelect2">اختر الدولة</label>
                <select
                  class="form-control"
                  id="countary"
                  v-model="countary_id"
                >
                  <option
                    v-for="countrie in countries"
                    :key="countrie.id"
                    :value="countrie.id"
                    >{{ countrie.NameArbic }}</option
                  >
                </select>
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
                @click="saveitem"
                class="btn btn-primary"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      local: "http://127.0.0.1:8000",
      countary_id: "",
      file: null,
      image: null,
      current: -1,
    };
  },
  computed: {
    ...mapState(["posationAvailables", "countries", "render"]),
  },
  methods: {
    ...mapActions(["posationAvailables", "loadCountries"]),
    deletePost(posationAvailable) {
      this.$store.dispatch("deletePosationAvailables", posationAvailable);
    },
    additem() {
      let data = {
        countary_id: this.countary_id,
        new_image: this.image,
      };
      this.$store.dispatch("createPosationAvailables", data);
    },
    editPost(index) {
      this.current = index;
      this.countary_id = this.posationAvailables[index].countary_id;
    },
    saveitem() {
      let posationAvailable = this.posationAvailables[this.current];
      let data = {
        id: posationAvailable.id,
        countary_id: this.countary_id,
      };
      if (this.image != null) data["new_image"] = this.image;

      this.$store.dispatch("updatePosationAvailables", data);
      this.$store.dispatch("forceRerender");
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
.addbtn {
  margin-top: -100px;
  margin-right: 100px;
}
</style>
