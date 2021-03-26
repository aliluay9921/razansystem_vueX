<template>
  <div class="content-wrapper">
    <div class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-6">
                <h2>خطوط <b>الطيران</b></h2>
              </div>
              <div class="col-sm-6">
                <a
                  href="#addEmployeeModal"
                  class="btn btn-success"
                  data-toggle="modal"
                  @click="addEmpty"
                  ><i class="material-icons">&#xE147;</i>
                  <span>اضافة خطوط طيران</span></a
                >
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover" v-if="render">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الصورة</th>
                <th>العمليات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(flightline, index) in flightlines" :key="index">
                <td>{{ flightline.name }}</td>
                <td>
                  <img :src="local + flightline.image" alt="image" />
                </td>
                <td>
                  <a
                    href="#flightModal"
                    @click="editPost(index)"
                    class="edit"
                    data-toggle="modal"
                    ><i
                      class="material-icons"
                      data-toggle="tooltip"
                      title="Edit"
                      >&#xE254;</i
                    ></a
                  >
                  <a href="#" class="delete" @click="deletePost(flightline)"
                    ><i
                      class="material-icons"
                      data-toggle="tooltip"
                      title="Delete"
                      >&#xE872;</i
                    ></a
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div class="clearfix">
            <ul class="pagination">
              <li class="page-item disabled">
                <a href="#" class="page-link" @click="previous">Previous</a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link" @click="plus_one">1</a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link" @click="plus_two">2</a>
              </li>
              <li class="page-item">
                <a href="#" @click="next" class="page-link">Next</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- add Modal HTML -->
    <div id="addEmployeeModal" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <h4 class="modal-title">اضافة خطوط طيران</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
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
              <input
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
              />
              <input
                type="button"
                @click="additem"
                data-dismiss="modal"
                class="btn btn-success"
                value="Add"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Edit Modal HTML -->
    <div id="flightModal" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <h4 class="modal-title">تعديل خطوط الطيران</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="exampleInputEmail1">الاسم</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="image-upload">الصورة</label>
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
              <input
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
              />
              <input
                type="button"
                @click="saveitem"
                class="btn btn-info"
                value="Save"
                data-dismiss="modal"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Delete Modal HTML -->
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
      skip: 0,
    };
  },
  computed: {
    ...mapState(["flightlines", "render"]),
  },
  methods: {
    ...mapActions(["flightline"]),
    previous() {
      this.skip = this.skip - 5;
      this.$store.dispatch("flightline", this.skip);
      console.log(this.skip);
    },
    plus_one() {
      this.skip = 5;
      this.$store.dispatch("flightline", this.skip);
      console.log(this.skip);
    },
    plus_two() {
      this.skip = 10;
      this.$store.dispatch("flightline", this.skip);
      console.log(this.skip);
    },
    next() {
      this.skip = this.skip + 5;
      this.$store.dispatch("flightline", this.skip);
      console.log(this.skip);
    },
    editPost(index) {
      this.current = index;
      this.name = this.flightlines[index].name;
    },
    addEmpty() {
      console.log("here");
      this.name = "";
      this.image = "";
      this.current = -1;
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
  mounted() {
    $("document").ready(function() {
      // Activate tooltip
      $('[data-toggle="tooltip"]').tooltip();

      // Select/Deselect checkboxes
      var checkbox = $('table tbody input[type="checkbox"]');
      $("#selectAll").click(function() {
        if (this.checked) {
          checkbox.each(function() {
            this.checked = true;
          });
        } else {
          checkbox.each(function() {
            this.checked = false;
          });
        }
      });
      checkbox.click(function() {
        if (!this.checked) {
          $("#selectAll").prop("checked", false);
        }
      });
    });
  },
};
</script>

<style>
.table {
  width: 100%;
  text-align: center;
}
.table-responsive {
  margin: 30px 0;
}
.table-wrapper {
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  min-width: 1000px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  background: #435d7d;
  color: #fff;
  padding: 16px 30px;
  min-width: 100%;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
.table-title .btn-group {
  float: right;
}
.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: 60px;
}
table.table tr th:last-child {
  width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}
table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.edit {
  color: #ffc107;
}
table.table td a.delete {
  color: #f44336;
}
table.table td i {
  font-size: 19px;
}
table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.pagination {
  float: right;
  margin: 0 0 5px;
}
.pagination li a {
  border: none;
  font-size: 13px;
  min-width: 30px;
  min-height: 30px;
  color: #999;
  margin: 0 2px;
  line-height: 30px;
  border-radius: 2px !important;
  text-align: center;
  padding: 0 6px;
}
.pagination li a:hover {
  color: #666;
}
.pagination li.active a,
.pagination li.active a.page-link {
  background: #03a9f4;
}
.pagination li.active a:hover {
  background: #0397d6;
}
.pagination li.disabled i {
  color: #ccc;
}
.pagination li i {
  font-size: 16px;
  padding-top: 6px;
}
.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}
/* Custom checkbox */
.custom-checkbox {
  position: relative;
}
.custom-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  margin: 5px 0 0 3px;
  z-index: 9;
}
.custom-checkbox label:before {
  width: 18px;
  height: 18px;
}
.custom-checkbox label:before {
  content: "";
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  background: white;
  border: 1px solid #bbb;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 2;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 11px;
  border: solid #000;
  border-width: 0 3px 3px 0;
  transform: inherit;
  z-index: 3;
  transform: rotateZ(45deg);
}
.custom-checkbox input[type="checkbox"]:checked + label:before {
  border-color: #03a9f4;
  background: #03a9f4;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
  border-color: #fff;
}
.custom-checkbox input[type="checkbox"]:disabled + label:before {
  color: #b8b8b8;
  cursor: auto;
  box-shadow: none;
  background: #ddd;
}
/* Modal styles */
.modal .modal-dialog {
  max-width: 400px;
}
.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
  padding: 20px 30px;
}
.modal .modal-content {
  border-radius: 3px;
  font-size: 14px;
}
.modal .modal-footer {
  background: #ecf0f1;
  border-radius: 0 0 3px 3px;
}
.modal .modal-title {
  display: inline-block;
}
.modal .form-control {
  border-radius: 2px;
  box-shadow: none;
  border-color: #dddddd;
}
.modal textarea.form-control {
  resize: vertical;
}
.modal .btn {
  border-radius: 2px;
  min-width: 100px;
}
.modal form label {
  font-weight: normal;
}
</style>
