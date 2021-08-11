<template>
  <div class="content-wrapper">
    <div class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="add_btn">
                <a
                  href="#addEmployeeModal"
                  class="btn btn-success"
                  data-toggle="modal"
                  ><i class="material-icons">&#xE147;</i>
                  <span>اضافة اماكن مخصصة</span></a
                >
              </div>
              <div class="airline">
                <h2>اماكن <b>مخصصة</b></h2>
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover" v-if="render">
            <thead>
              <tr>
                <th>الدولة</th>
                <th>الصورة</th>
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

                <td>
                  <a
                    href="#positionAvilable"
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
                  <a href="#myModal" data-toggle="modal" class="delete"
                    ><i
                      class="material-icons"
                      data-toggle="tooltip"
                      title="Delete"
                      @click="getID(posationAvailable)"
                      >&#xE872;</i
                    ></a
                  >
                  <div id="myModal" class="modal fade">
                    <div class="modal-dialog modal-confirm">
                      <div class="modal-content">
                        <div class="modal-header flex-column">
                          <h4 class="modal-title w-100">هل انت متأكد ؟</h4>
                        </div>
                        <div class="modal-body">
                          <p>
                            سوف تقوم بحذف هذا العنصر للتأكيد عملية الحذف يرجى
                            الضغط على <b>حذف</b>
                          </p>
                        </div>
                        <div class="modal-footer justify-content-center">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            غلق
                          </button>
                          <button
                            type="button"
                            @click="deletePost()"
                            class="btn btn-danger"
                            data-dismiss="modal"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- add Modal HTML -->
    <div id="addEmployeeModal" class="modal fade" dir="rtl">
      <div class="modal-dialog">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <div class="w-100 d-flex justfiy-content-start">
                <h4 class="modal-title">اضافة اماكن مخصصة</h4>
              </div>
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
              <div class="form-group text-right">
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
              <div class="form-group text-right">
                <label for="exampleInputPassword1">صورة</label>
                <input
                  type="file"
                  class="form-control-file"
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
                value="غلق"
              />
              <input
                type="button"
                @click="additem"
                data-dismiss="modal"
                class="btn btn-success"
                value="اضافة"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Edit Modal HTML -->
    <div id="positionAvilable" class="modal fade" dir="rtl">
      <div class="modal-dialog">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <div class="w-100 d-flex justfiy-content-start">
                <h4 class="modal-title">تعديل المكان المخصص</h4>
              </div>
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
              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">اختر الدولة</label>
                <select
                  class="form-control p-0"
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
              <div class="form-group text-right">
                <label for="exampleInputPassword1">صورة</label>
                <input
                  type="file"
                  class="form-control-file"
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
                value="غلق"
              />
              <input
                type="button"
                @click="saveitem"
                class="btn btn-info"
                value="تعديل"
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      local: "http://127.0.0.1:8000",
      countary_id: "",
      file: null,
      image: null,
      current: -1,
      skip: 0,
      posationAvailable_delete: "",
    };
  },
  computed: {
    ...mapState(["posationAvailables", "countries", "render"]),
  },
  methods: {
    ...mapActions(["getPosationAvailables", "loadCountries"]),
    getID(posationAvailable) {
      this.posationAvailable_delete = posationAvailable;
    },

    deletePost() {
      this.$store.dispatch(
        "deletePosationAvailables",
        this.posationAvailable_delete
      );
    },
    additem() {
      let data = {
        countary_id: this.countary_id,
      };
      if (this.image != null) {
        data["new_image"] = this.image;
      }
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
      console.log(data);
      this.$store.dispatch("updatePosationAvailables", data);
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
  created() {
    this.getPosationAvailables();
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
