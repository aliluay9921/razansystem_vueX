<template>
  <div class="content-wrapper">
    <div class="details">
      <h2>الحجوزات</h2>

      <p>قم بالبحث على الحجوزات لأصدار التكت الخاص بالمستخدم</p>
    </div>

    <div>
      <div class="d-flex justify-content-center mt-5">
        <div class="form-group col-8">
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :pagination-options="{
              enabled: true,
            }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'ticket'">
                <button
                  type="button"
                  @click="ticketIssue(props.row)"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#addticket"
                >
                  اصدار تكت
                </button>

                <div id="addticket" class="modal fade" dir="rtl">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <div class="w-100 d-flex justfiy-content-start">
                          <h4 class="modal-title">اضافة رقم تكت</h4>
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
                          <label for="exampleInputPassword1">رقم التكت</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="ticket_id"
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
                          @click="add_ticket"
                          data-dismiss="modal"
                          class="btn btn-success"
                          value="اضافة"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </span>
              <span v-else> {{ props.formattedRow[props.column.field] }} </span>
            </template>
          </vue-good-table>
        </div>
      </div>
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
        {
          label: "ticket",
          field: "ticket",

          // type: "string",
        },
      ],
      // rows: [],
      search: "",
      tecket_number: "",
      current: -1,
      ticket_id: "",
      data: "",
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
          id: element.id,
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
    ticketIssue(data) {
      this.data = data;
    },
    add_ticket() {
      let data = {
        order_id: this.data.id,
        ticket_id: this.ticket_id,
      };
      console.log(data);
      this.$store.dispatch("create_ticket", data);
      this.$router.push("/issusTickets");
    },
    // ticket_issus() {
    //   let order = this.orderPnr[this.current];
    //   let data = {
    //     order_id: order.id,
    //     ticket_id: this.tecket_number,
    //   };
    //   console.log(data);
    //   this.$store.dispatch("create_ticket", data);
    // },
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
