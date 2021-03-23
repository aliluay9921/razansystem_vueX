<template>
  <div class="content-wrapper">
    <div class="card-header">
      <h3 class="card-title">العروض المتوفرة</h3>
    </div>
    <div class="container-fluid ml-2 ">
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
            <th class="pl-5 pr-5">الخطوط الجوية</th>
            <th class="pl-5 pr-4 ">تفاصيل</th>
            <th>كود الخصم</th>
            <th>التخفيض</th>
            <th>اكبر عدد</th>
            <th>اقل عدد</th>
            <th class="pl-5 pr-4">الاكسباير</th>
            <th class="pl-5 pr-4">وقت الرحيل</th>
            <th class="pl-5 pr-4">وقت الرجوع</th>
            <th class="pl-5 pr-4">التفعيل</th>
            <th class="pl-5 pr-5">النوع</th>
            <th>من</th>
            <th>الى</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(discountFlight, index) in discountFlights" :key="index">
            <td class="text-center">{{ discountFlight.flightline.name }}</td>
            <td class="text-center">{{ discountFlight.details }}</td>
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
              <span class="text-white bg-danger rounded-pill pl-2 pr-2 "
                >غير مفعل</span
              >
            </td>
            <td v-if="discountFlight.type == 1">ذهاب وعودة</td>
            <td v-else>ذهاب فقط</td>
            <td>{{ discountFlight.from_location.longName }}</td>
            <td>{{ discountFlight.to_location.longName }}</td>
            <td class="pr-3 pl-3 d-flex">
              <button
                class=" btn btn-danger m-1"
                @click="deletePost(discountFlight)"
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
      <!-- UPDATE DISCOUNT  -->

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
                تعديل العروض
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
                    v-for="flightline in flightlines"
                    :key="flightline.id"
                    :value="flightline.id"
                    >{{ flightline.name }}</option
                  >
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">التفاصيل </label>
                <input
                  type="text"
                  class="form-control"
                  id="details"
                  v-model="details"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">كودالخصم</label>
                <input
                  type="text"
                  class="form-control"
                  id="code_discount"
                  v-model="code_discount"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">التخفيض</label>
                <input
                  type="text"
                  class="form-control"
                  id="discount"
                  v-model="discount"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">اقصى عدد</label>
                <input
                  type="text"
                  class="form-control"
                  id="miximum_number"
                  v-model="miximum_number"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">اقل عدد</label>
                <input
                  type="text"
                  class="form-control"
                  id="minimum_number"
                  v-model="minimum_number"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">عددالمسجلين</label>
                <input
                  type="text"
                  class="form-control"
                  id="current_user"
                  v-model="current_user"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">تاريخ الانتهاء</label>
                <input
                  type="text"
                  class="form-control"
                  id="expair"
                  v-model="expair"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">وقت الرحلة</label>
                <input
                  type="text"
                  class="form-control"
                  id="fromdate"
                  v-model="fromdate"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">التفعيل</label>
                <input
                  type="text"
                  class="form-control"
                  id="active"
                  v-model="active"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">وقت الرجوع</label>
                <input
                  type="text"
                  class="form-control"
                  id="returndate"
                  v-model="returndate"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">نوع الحجز</label>
                <input
                  type="text"
                  class="form-control"
                  id="type"
                  v-model="type"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2">اختر دولة</label>
                <select class="form-control" id="from" v-model="from">
                  <option
                    v-for="countrie in countries"
                    :key="countrie.id"
                    :value="countrie.id"
                    >{{ countrie.NameArbic }}</option
                  >
                </select>
              </div>
              <div class="form-group">
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
                class="btn btn-primary"
                @click="saveitem"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- ADD DISCOUNT -->
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
              <h5 class="modal-title" id="exampleModalLabel">اضافة عرض</h5>
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
                    v-for="flightline in flightlines"
                    :key="flightline.id"
                    :value="flightline.id"
                    >{{ flightline.name }}</option
                  >
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">التفاصيل </label>
                <input
                  type="text"
                  class="form-control"
                  id="details"
                  v-model="details"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">كودالخصم</label>
                <input
                  type="text"
                  class="form-control"
                  id="code_discount"
                  v-model="code_discount"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">التخفيض</label>
                <input
                  type="text"
                  class="form-control"
                  id="discount"
                  v-model="discount"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">اقصى عدد</label>
                <input
                  type="text"
                  class="form-control"
                  id="miximum_number"
                  v-model="miximum_number"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">اقل عدد</label>
                <input
                  type="text"
                  class="form-control"
                  id="minimum_number"
                  v-model="minimum_number"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">عددالمسجلين</label>
                <input
                  type="text"
                  class="form-control"
                  id="current_user"
                  v-model="current_user"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">تاريخ الانتهاء</label>
                <input
                  type="text"
                  class="form-control"
                  id="expair"
                  v-model="expair"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">وقت الرحلة</label>
                <input
                  type="text"
                  class="form-control"
                  id="fromdate"
                  v-model="fromdate"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">التفعيل</label>
                <input
                  type="text"
                  class="form-control"
                  id="active"
                  v-model="active"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">وقت الرجوع</label>
                <input
                  type="text"
                  class="form-control"
                  id="returndate"
                  v-model="returndate"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">نوع الحجز</label>
                <input
                  type="text"
                  class="form-control"
                  id="type"
                  v-model="type"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
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
              <div class="form-group">
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
      discount: "",
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
    };
  },
  computed: {
    ...mapState(["discountFlights", "countries", "flightlines", "render"]),
  },
  methods: {
    ...mapActions(["discount", "loadCountries", "flightline"]),
    deletePost(discountFlight) {
      this.$store.dispatch("deleteDiscount", discountFlight);
    },
    editPost(index) {
      console.log(index);
      this.current = index;

      this.flightline_id = this.discountFlights[index].flightline_id;
      this.details = this.discountFlights[index].details;
      this.code_discount = this.discountFlights[index].code_discount;
      this.discount = this.discountFlights[index].discount;
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
        discount: this.discount,
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
      this.$store.dispatch("forceRerender");
    },

    additem() {
      let data = {
        flightline_id: this.flightline_id,
        details: this.details,
        code_discount: this.code_discount,
        discount: this.discount,
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
};
</script>

<style>
.addbtn {
  margin: 0 50px 10px 0;
}
</style>
