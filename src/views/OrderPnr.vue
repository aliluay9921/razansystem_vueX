<template>
  <div class="content-wrapper">
    <div class="details">
      <h2>الحجوزات</h2>

      <p>قم بالبحث على الحجوزات لأصدار التكت الخاص بالمستخدم</p>
    </div>
    <!-- <div class="search">
      <div class="form-group">
        <label for="">البحث عن حجز</label>
        <input type="text" v-model="search" class="form-control" />
      </div>
    </div>
    <section class="table table-hover table-bordered mt-3">
      <table class="ui celled table">
        <thead>
          <tr>
            <th>pnr</th>
            <th>من</th>
            <th>الى</th>
            <th>نوع درجة الطيران</th>
            <th>عمليات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orderPnr" :key="index">
            <td>{{ order.PNR }}</td>
            <td>{{ order.from_location.longName }}</td>
            <td>{{ order.to_location.longName }}</td>
            <td v-if="order.cabin == 1">درجة اولى</td>
            <td v-else>سياحي</td>
            <td class="operations">
              <button
                class="btn btn-success"
                data-toggle="modal"
                data-target="#issus_ticket"
                @click="getData(index)"
              >
                اصدار بطاقة
              </button>
            </td>
          </tr>
        </tbody>
        <div
          class="modal fade"
          id="issus_ticket"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  اصدار بطاقة
                </h5>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">رقم البطاقة</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model="tecket_number"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  اغلاق
                </button>
                <button
                  type="button"
                  @click="ticket_issus"
                  class="btn btn-primary"
                >
                  اصدار
                </button>
              </div>
            </div>
          </div>
        </div>
      </table>
    </section> -->
    <div>
      <div class="d-flex justify-content-center mt-5">
        <div class="form-group col-8">
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :pagination-options="{
              enabled: true,
            }"
          ></vue-good-table>
        </div>
      </div>

      <!-- 
:search-options="{
          enabled: true,
          trigger: 'key-up',
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"

       -->
    </div>
  </div>
</template>
<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

import { mapState } from "vuex";
import Vue from "vue";
export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      columns: [
        {
          label: "من",
          field: "from",
          filterOptions: { enabled: false },
        },
        {
          label: "الى",
          field: "to",
          filterOptions: { enabled: false },
          // type: "string",
        },
        {
          label: "درجة طيران",
          field: "flight_type",
          filterOptions: { enabled: false },
          // type: "date",
          // dateInputFormat: "yyyy-MM-dd",
          // dateOutputFormat: "MMM do yy",
        },
        {
          label: "PNR كود الـ",
          field: "pnr",
          filterOptions: { enabled: true },
          // type: "string",
        },
      ],
      // rows: [],
      search: "",
      tecket_number: "",
      current: -1,
    };
  },
  computed: {
    ...mapState(["orderPnr"]),
    searchData() {
      return this.orderPnr.filter((data) => {
        return data.orderPnr.PNR.match(this.search);
      });
    },
    rows() {
      let row_data = Array();
      this.orderPnr.forEach((element) => {
        let item = {
          from: element.from_location.longName,
          to: element.to_location.longName,
          flight_type: element.cabin == 0 ? "أقتصادي" : "رجال أعمال",
          pnr: element.pnr,
        };
        Vue.set(row_data, 0, item);
      });
      return row_data;
    },
  },

  methods: {
    getData(index) {
      this.current = index;
    },
    ticket_issus() {
      let order = this.orderPnr[this.current];
      let data = {
        order_id: order.id,
        ticket_id: this.tecket_number,
      };
      console.log(data);
      this.$store.dispatch("create_ticket", data);
    },
  },
};
</script>
<style>
.operations {
  width: 600px !important;
}
.search {
  margin-top: 50px;
  width: 300px;
  margin-left: 500px;
}
</style>
