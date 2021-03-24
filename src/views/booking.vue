<template>
  <div class="content-wrapper">
    <div class="details">
      <h2>معلومات الحجز</h2>
    </div>
    <section class="view">
      <div class="ui left labeled button" tabindex="0">
        <a class="ui basic right pointing label">
          {{ data.order.to_location.longName }}
        </a>
        <div class="ui button">
          <i class="map marker alternate icon"></i> الى
        </div>
      </div>
      <div class="ui left labeled button" tabindex="0">
        <a class="ui basic right pointing label">
          {{ data.order.from_location.longName }}
        </a>
        <div class="ui button">
          <i class="map marker alternate icon"></i> من
        </div>
      </div>
    </section>
    <section class="view-date">
      <div class="ui left labeled button " tabindex="0">
        <a class="ui basic right pointing label">
          {{ data.order.flightplans[0].Arrival_time }}
        </a>
        <div class="ui button">
          <i class="calendar minus outline icon"></i> تاريخ الوصول
        </div>
      </div>
      <div class="ui left labeled button" tabindex="0">
        <a class="ui basic right pointing label">
          {{ data.order.flightplans[0].Time_to_go }}
        </a>
        <div class="ui button">
          <i class="calendar minus outline icon"></i>تاريخ الاقلاع
        </div>
      </div>
    </section>
    <section class="view-type">
      <div class="ui left labeled button" tabindex="0">
        <a v-if="data.order.cabin == 1" class="ui basic right pointing label">
          درجة اولى
        </a>
        <a v-else class="ui basic right pointing label">
          سياحي
        </a>
        <div class="ui button">
          نوع درجة الطيران
        </div>
      </div>
      <div class="ui left labeled button" tabindex="0">
        <a class="ui basic right pointing label">
          {{ data.order.flightplans[0].price }}
        </a>
        <div class="ui button">
          <i class=" dollar sign icon "></i> السعر المطلوب
        </div>
      </div>
    </section>

    <section class="view-plane">
      <div class="ui left labeled button" tabindex="0">
        <a class="ui basic right pointing label">
          {{ data.flight_line.name }}
        </a>
        <div class="ui button">
          شركة الطيران
        </div>
      </div>
    </section>

    <div class="pnr">
      <div class="form-inline">
        <div class="form-group mx-sm-3 mb-2">
          <input
            type="text"
            v-model="PNR"
            class="form-control"
            placeholder="PNR"
          />
        </div>
        <button @click="savedata" type="submit" class="btn btn-primary mb-2">
          PNR ارسل
        </button>
      </div>
    </div>

    <section class="table">
      <table class="ui celled table">
        <thead>
          <tr>
            <th>الاسم الاؤل</th>
            <th>الاسم الثاني</th>
            <th>تاريخ الولادة</th>
            <th>الجنس</th>
            <th>النوع</th>
            <th>رقم الجواز</th>
            <th>صورة الجواز</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in data.order.passengers" :key="index">
            <td data-label="firstName">{{ person.first_name }}</td>
            <td data-label="lastName">{{ person.last_name }}</td>
            <td data-label="Age">{{ person.birth_day }}</td>
            <td data-label="Job">{{ person.gender }}</td>
            <td data-label="Name">{{ person.type }}</td>
            <td data-label="Age">{{ person.passport_No }}</td>
            <td data-label="Job">
              <a href="1.jpg">
                <img
                  :src="local + person.picture_passport"
                  alt="image"
                  height="50px"
                  width="50px"
                />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      local: "http://127.0.0.1:8000",
      PNR: "",
    };
  },

  computed: {
    data() {
      return this.$store.state.select_booking;
    },
  },
  methods: {
    savedata() {
      let data = {
        PNR: this.PNR,
        id: this.data.order.id,
      };
      this.$store.dispatch("create_pnr", data);
      this.PNR = "";
    },
  },
};
</script>
<style>
.pnr {
  margin-top: 50px;
  margin-left: 500px;
}
.details {
  text-align: right;
  padding: 20px;
  background-color: #f7ffff;
  border: 1px solid #02b7b2;
}
.view {
  position: relative;
  left: 35%;
  top: 20%;
  margin-top: 50px;
}
.ui.labeled.button:not(.icon) {
  margin-right: 35px;
  margin-left: 35px;
}
.ui[class*="left labeled"].button > .button {
  background-color: #42d4d0;
}
.ui.button:not(.icon) > .icon:not(.button):not(.dropdown),
.ui.button:not(.icon) > .icons:not(.button):not(.dropdown) {
  color: red;
}
.ui.basic.label:not(.tag):not(.image):not(.ribbon),
.ui.basic.labels:not(.tag):not(.image):not(.ribbon) .label {
  background-color: #dcfafa;
}
.view-date {
  position: relative;
  left: 23.7%;
  top: 20%;
  margin-top: 40px;
}
.view-type {
  position: relative;
  left: 29%;
  top: 20%;
  margin-top: 40px;
}
.view-plane {
  position: relative;
  left: 40%;
  top: 20%;
  margin-top: 40px;
}
.table {
  width: 50%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  direction: rtl;
}
.ui.celled.table > tbody > tr > td:first-child,
.ui.celled.table > tbody > tr > th:first-child,
.ui.celled.table > tfoot > tr > td:first-child,
.ui.celled.table > tfoot > tr > th:first-child,
.ui.celled.table > thead > tr > th:first-child,
.ui.celled.table > tr > td:first-child,
.ui.celled.table > tr > th:first-child {
  text-align: right;
  border-left: 1px solid rgba(34, 36, 38, 0.1);
}
.ui.celled.table > tbody > tr > td,
.ui.celled.table > tbody > tr > th,
.ui.celled.table > tfoot > tr > td,
.ui.celled.table > tfoot > tr > th,
.ui.celled.table > thead > tr > th,
.ui.celled.table > tr > td,
.ui.celled.table > tr > th {
  text-align: right;
}
tr img {
  margin-left: auto;
  margin-right: auto;
}
</style>
