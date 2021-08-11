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
                  <span>اضافة عروض</span></a
                >
              </div>
              <div class="discount">
                <h2>العروض</h2>
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover" v-if="render">
            <thead>
              <tr>
                <th>الخطوط الجوية</th>
                <th>تفاصيل</th>
                <th>كود الخصم</th>
                <th>التخفيض</th>
                <th>اكبر عدد</th>
                <th>اقل عدد</th>
                <th>الاكسباير</th>
                <th>وقت الرحيل</th>
                <th>وقت الرجوع</th>
                <th>التفعيل</th>
                <th>النوع</th>
                <th>من</th>
                <th>الى</th>
                <th>العمليات</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(discountFlight, index) in discountFlights"
                :key="index"
              >
                <td>{{ discountFlight.flightline.name }}</td>
                <td>{{ discountFlight.details }}</td>
                <td>{{ discountFlight.code_discount }}</td>
                <td>{{ discountFlight.discount }}</td>
                <td>{{ discountFlight.miximum_number }}</td>
                <td>{{ discountFlight.minimum_number }}</td>
                <td>{{ discountFlight.expair }}</td>
                <td>{{ discountFlight.fromdate }}</td>
                <td>{{ discountFlight.returndate }}</td>
                <td class="text-center mt-5 " v-if="discountFlight.active == 1">
                  <span class="text-white bg-success rounded-pill pl-2 pr-2   "
                    >مفعل</span
                  >
                </td>
                <td class="text-center mt-5" v-else>
                  <div class="text-white bg-danger rounded-pill pl-3 pr-3">
                    <span>غير مفعل</span>
                  </div>
                </td>
                <td v-if="discountFlight.type == 1">ذهاب وعودة</td>
                <td v-else>ذهاب فقط</td>
                <td>{{ discountFlight.from_location.NameArbic }}</td>
                <td>{{ discountFlight.to_location.NameArbic }}</td>
                <td>
                  <a
                    href="#discountModel"
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
                  <a href="#myModal" class="delete" data-toggle="modal"
                    ><i
                      class="material-icons"
                      data-toggle="tooltip"
                      title="Delete"
                      @click="getID(discountFlight)"
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
                            @click="deletePost(discountFlight)"
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
          <div class="clearfix">
            <div class="hint-text">
              Showing <b>5</b> out of <b>25</b> entries
            </div>
            <ul class="pagination">
              <li class="page-item disabled"><a href="#">Previous</a></li>
              <li class="page-item"><a href="#" class="page-link">1</a></li>
              <li class="page-item"><a href="#" class="page-link">2</a></li>
              <li class="page-item active">
                <a href="#" class="page-link">3</a>
              </li>
              <li class="page-item"><a href="#" class="page-link">4</a></li>
              <li class="page-item"><a href="#" class="page-link">5</a></li>
              <li class="page-item"><a href="#" class="page-link">Next</a></li>
            </ul>
          </div>
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
                <h4 class="modal-title">اضافة عروض</h4>
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
                <label for="exampleFormControlSelect2"
                  >اختر الخطوط الجوية</label
                >
                <select
                  class="form-control"
                  id="flightline"
                  v-model="flightline_id"
                >
                  <option>اختر خطوط</option>
                  <option
                    v-for="item in flightlines"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.name }}</option
                  >
                </select>
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">التفاصيل </label>
                <input
                  type="text"
                  class="form-control"
                  id="details"
                  v-model="details"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">كودالخصم</label>
                <input
                  type="text"
                  class="form-control"
                  id="code_discount"
                  v-model="code_discount"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">التخفيض</label>
                <input
                  type="text"
                  class="form-control"
                  id="discount"
                  v-model="discount_add"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">اقصى عدد</label>
                <input
                  type="text"
                  class="form-control"
                  id="miximum_number"
                  v-model="miximum_number"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">اقل عدد</label>
                <input
                  type="text"
                  class="form-control"
                  id="minimum_number"
                  v-model="minimum_number"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">عددالمسجلين</label>
                <input
                  type="text"
                  class="form-control"
                  id="current_user"
                  v-model="current_user"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">تاريخ الانتهاء</label>
                <input
                  type="date"
                  class="form-control"
                  id="expair"
                  v-model="expair"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">وقت الرحلة</label>
                <input
                  type="date"
                  class="form-control"
                  id="fromdate"
                  v-model="fromdate"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">نوع الحجز</label>
                <select class="form-control" v-model="type">
                  <option value="0">ذهاب فقط </option>
                  <option value="1"> ذهاب وعودة </option>
                </select>
              </div>

              <div class="form-group text-right " v-if="this.type == 1">
                <label for="exampleInputEmail1">وقت الرجوع</label>
                <input
                  type="date"
                  class="form-control"
                  id="returndate"
                  v-model="returndate"
                  aria-describedby="emailHelp"
                />
              </div>

              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">التفعيل</label>
                <select class="form-control" v-model="active">
                  <option value="0">غير مفعل </option>
                  <option value="1"> مفعل </option>
                </select>
              </div>
              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">اختر دولة</label>
                <select class="form-control" id="to" v-model="to">
                  <option
                    v-for="countrie in countries"
                    :key="countrie.id"
                    :value="countrie.id"
                    >{{ countrie.NameArbic }}</option
                  >
                </select>
              </div>
              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">اختر دولة</label>
                <select class="form-control" id="from" v-model="from">
                  <option>اختر دولة</option>

                  <option
                    v-for="countrie in countries"
                    :key="countrie.id"
                    :value="countrie.id"
                    >{{ countrie.NameArbic }}</option
                  >
                </select>
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
    <div id="discountModel" class="modal fade" dir="rtl">
      <div class="modal-dialog">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <div class="w-100 d-flex justfiy-content-start">
                <h4 class="modal-title">تعديل العرض</h4>
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
                <label for="exampleFormControlSelect2"
                  >اختر الخطوط الجوية</label
                >
                <select
                  class="form-control p-0"
                  id="flightline"
                  v-model="flightline_id"
                >
                  <option
                    v-for="(flightline_new, index) in flightlines"
                    :key="index"
                    :value="flightline_new.id"
                    >{{ flightline_new.name }}</option
                  >
                </select>
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">التفاصيل </label>
                <input
                  type="text"
                  class="form-control"
                  id="details"
                  v-model="details"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">كودالخصم</label>
                <input
                  type="text"
                  class="form-control"
                  id="code_discount"
                  v-model="code_discount"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">التخفيض</label>
                <input
                  type="text"
                  class="form-control"
                  id="discount"
                  v-model="discount_add"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">اقصى عدد</label>
                <input
                  type="text"
                  class="form-control"
                  id="miximum_number"
                  v-model="miximum_number"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">اقل عدد</label>
                <input
                  type="text"
                  class="form-control"
                  id="minimum_number"
                  v-model="minimum_number"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">عددالمسجلين</label>
                <input
                  type="text"
                  class="form-control"
                  id="current_user"
                  v-model="current_user"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">تاريخ الانتهاء</label>
                <input
                  type="date"
                  class="form-control"
                  id="expair"
                  v-model="expair"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">وقت الرحلة</label>
                <input
                  type="date"
                  class="form-control"
                  id="fromdate"
                  v-model="fromdate"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">نوع الحجز</label>
                <select class="form-control p-0" v-model="type">
                  <option value="0">ذهاب فقط </option>
                  <option value="1"> ذهاب وعودة </option>
                </select>
              </div>
              <div class="form-group text-right">
                <label for="exampleInputEmail1">وقت الرجوع</label>
                <input
                  type="date"
                  class="form-control"
                  id="returndate"
                  v-model="returndate"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">التفعيل</label>
                <select class="form-control p-0" v-model="active">
                  <option value="0">غير مفعل </option>
                  <option value="1"> مفعل </option>
                </select>
              </div>

              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">اختر دولة</label>
                <select class="form-control p-0" id="from" v-model="from">
                  <option
                    v-for="countrie in countries"
                    :key="countrie.id"
                    :value="countrie.id"
                    >{{ countrie.NameArbic }}</option
                  >
                </select>
              </div>
              <div class="form-group text-right">
                <label for="exampleFormControlSelect2">اختر دولة</label>
                <select class="form-control p-0" id="to" v-model="to">
                  <option
                    v-for="countrie in countries"
                    :key="countrie.id"
                    :value="countrie.id"
                    >{{ countrie.NameArbic }}</option
                  >
                </select>
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
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      flightline_id: "",
      details: "",
      code_discount: "",
      discount_add: "",
      miximum_number: "",
      minimum_number: "",
      current_user: "",
      expair: "",
      fromdate: "",
      active: "",
      returndate: "",
      type: "",
      from: "",
      to: "",
      current: -1,
      discount_delete: "",
    };
  },
  computed: {
    ...mapState(["discountFlights", "countries", "flightlines", "render"]),
  },
  methods: {
    ...mapActions(["discount", "loadCountries"]),
    getID(discountFlight) {
      this.discount_delete = discountFlight;
    },
    deletePost() {
      this.$store.dispatch("deleteDiscount", this.discount_delete);
    },

    editPost(index) {
      this.current = index;

      this.flightline_id = this.discountFlights[index].flightline_id;
      this.details = this.discountFlights[index].details;
      this.code_discount = this.discountFlights[index].code_discount;
      this.discount_add = this.discountFlights[index].discount;
      this.miximum_number = this.discountFlights[index].miximum_number;
      this.minimum_number = this.discountFlights[index].minimum_number;
      this.current_user = this.discountFlights[index].current_user;
      this.expair = this.discountFlights[index].expair;
      this.fromdate = this.discountFlights[index].fromdate;
      this.active = this.discountFlights[index].active;
      this.returndate = this.discountFlights[index].returndate;
      this.type = this.discountFlights[index].type;
      this.from = this.discountFlights[index].from;
      this.to = this.discountFlights[index].to;
    },
    saveitem() {
      let discountFlights = this.discountFlights[this.current];
      let data = {
        id: discountFlights.id,
        flightline_id: this.flightline_id,
        details: this.details,
        code_discount: this.code_discount,
        discount: this.discount_add,
        miximum_number: this.miximum_number,
        minimum_number: this.minimum_number,
        current_user: this.current_user,
        expair: this.expair,
        fromdate: this.fromdate,
        active: this.active,
        returndate: this.returndate,
        type: this.type,
        from: this.from,
        to: this.to,
      };

      this.$store.dispatch("updateDiscount", data);
    },

    additem() {
      let data = {
        flightline_id: this.flightline_id,
        details: this.details,
        code_discount: this.code_discount,
        discount: this.discount_add,
        miximum_number: this.miximum_number,
        minimum_number: this.minimum_number,
        current_user: this.current_user,
        expair: this.expair,
        fromdate: this.fromdate,
        active: this.active,
        returndate: this.returndate,
        type: this.type,
        from: this.from,
        to: this.to,
      };

      this.$store.dispatch("createDiscount", data);
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
.row {
  position: relative;
  height: 50px;
}
.row .add_btn {
  position: absolute;
  left: 10px;
  padding: 10px !important;
}
.row .discount {
  position: absolute;
  right: 10px;
}
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
