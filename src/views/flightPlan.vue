<template>
  <div class="content-wrapper">
    <div class="details">
      <h2>معلومات الحجز</h2>

      <p>قم بالبحث بأستخدام المعلومات ادناه لتسجيل الطلب</p>
    </div>
    <div class="booking">
      <div class="child ui labeled button" tabindex="0">
        <div class="ui basic button">
          {{ selected_order.to }}
        </div>

        <a class="ui teal left pointing label">
          <i class="map marker alternate icon red"></i>
          الى
        </a>
      </div>

      <div class="ui labeled button" tabindex="0">
        <div class="ui basic button">{{ selected_order.from }}</div>
        <a class="ui teal left pointing label"
          ><i class="map marker alternate icon red"></i>

          من
        </a>
      </div>
    </div>
    <div class="booking-one">
      <div class="child ui labeled button" tabindex="0">
        <div class="ui basic button">{{ selected_order.returndate }}</div>
        <a class="ui teal left pointing label">
          <i class="calendar alternate icon red"></i>
          تأريخ الرجوع
        </a>
      </div>
      <div class="ui labeled button" tabindex="0">
        <div class="ui basic button">{{ selected_order.fromdate }}</div>
        <a class="ui teal left pointing label">
          <i class="calendar alternate icon red"></i>

          تأريخ الاقلاع
        </a>
      </div>
    </div>
    <div class="steps-book">
      <div class="ui steps">
        <a class="step">
          <img src="/image/man.svg" alt="" />
          <div class="content">
            <div class="title">البالغين</div>
            <div class="description"><b>5</b></div>
          </div>
        </a>
        <a class="active step">
          <img src="/image/boy.svg" alt="" />
          <div class="content">
            <div class="title">الاطفال</div>
            <div class="description"><b>5</b></div>
          </div>
        </a>
        <a class="step">
          <img src="/image/baby-boy.svg" alt="" />
          <div class="content">
            <div class="title">الرضع</div>
            <div class="description"><b>5</b></div>
          </div>
        </a>
      </div>
    </div>
    <div class="company">
      <h2>شركات الطيران</h2>
    </div>

    <div class="ui grid column">
      <div class="row centered">
        <div class="ten wide column">
          <div class="ui multiple selection fluid dropdown airLines-dropdown">
            <input
              v-if="dropDownRender"
              name="gender"
              type="hidden"
              class="airLines"
              v-model="airLines"
              v-on:change="airLinesChange"
            />
            <i class="dropdown icon"></i>
            <div class="default text">Default</div>
            <div class="menu">
              <div class="item" data-value="0">Value</div>
              <div class="item" data-value="1">Another Value</div>
              <div class="item" data-value="2">Default Value</div>
              <div class="item" data-value="3">Second Default</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row centered" v-if="Object.keys(this.dataTable).length > 0">
        <div class="fourteen wide column">
          <table class="ui padded table result" v-if="this.render">
            <tbody v-for="(value, name) in dataTable" :key="name">
              <tr v-for="(trip, index) in value" :key="index">
                <th v-if="index == 0" :rowspan="value.length + 1" colspan="1">
                  <p>{{ name }}</p>
                  <button class="add-button" v-on:click="addTrip(name)">
                    <i class="plus icon"></i>اضافة رحلة
                  </button>
                </th>
                <td>
                  <div class="ui three column grid">
                    <div class="row">
                      <div
                        class="ui top left attached label delete-pad"
                        v-on:click="deleteTrip(name, index)"
                      >
                        <p>حذف</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column">
                        <select
                          @change="forceRerender"
                          class="ui fluid dropdown"
                          v-model="trip.from_port"
                        >
                          <option value="" disabled>Gender</option>
                          <option value="1">Male</option>
                          <option value="0">Female</option>
                        </select>
                      </div>
                      <div class="column">
                        <select
                          @change="forceRerender"
                          class="ui fluid dropdown"
                          v-model="trip.to_port"
                        >
                          <option value="" disabled>Gender</option>
                          <option value="1">Male</option>
                          <option value="0">Female</option>
                        </select>
                      </div>
                      <div class="column">
                        <div class="child ui labeled button price" tabindex="0">
                          <a class="w-100 ui teal left pointing label">
                            سعر التذكرة
                          </a>
                          <input
                            @change="forceRerender"
                            v-model="trip.price"
                            class="w-100 ui basic"
                            style="
                              outline: none;
                              text-align: center;
                              border: 1px solid rgba(34, 36, 38, 0.15);
                            "
                            value="50"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column">
                        <div class="ui input">
                          <input
                            @change="forceRerender"
                            v-model="trip.from_time"
                            type="datetime-local"
                            placeholder="وقت الذهاب..."
                          />
                        </div>
                      </div>
                      <div class="column">
                        <div class="ui input">
                          <input
                            @change="forceRerender"
                            v-model="trip.to_time"
                            type="datetime-local"
                            placeholder="وقت الرجوع..."
                          />
                        </div>
                      </div>
                      <div class="column">
                        <div class="ui input note">
                          <input
                            @change="forceRerender"
                            v-model="trip.note"
                            type="text"
                            style="outline: none; text-align: right"
                            placeholder="ملاحضة"
                          />
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
      <div class="row centered" v-if="Object.keys(this.dataTable).length > 0">
        <button class="ui button send-button" v-on:click="sendTrip">
          <i class="send icon"></i>أرسال رحلة
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  name: "flightPlan",
  components: {},
  data() {
    return {
      airLines: "",
      render: true,
      dropDownRender: true,
      dataTable: {},
    };
  },

  mounted() {
    $("document").ready(function() {
      $(".dropdown").dropdown({
        clearable: true,
      });
      $(".dropdown").dropdown({
        clearable: true,
        placeholder: "any",
      });
    });
  },
  computed: {
    splittedAirlines: function() {
      return this.airLines.split(",");
    },
    selected_order() {
      return this.$store.state.selected_order;
    },
  },
  methods: {
    sendTrip() {
      console.log(this.dataTable);
      $("body").toast({
        showProgress: "top",
        classProgress: "blue",
        title: "Better ?",
        message: JSON.stringify(this.dataTable),
      });
    },
    forceRerender() {
      this.render = false;
      this.$nextTick().then(() => {
        this.render = true;
      });
    },
    forceDropDownRerender() {
      this.dropDownRender = false;
      this.$nextTick().then(() => {
        this.dropDownRender = true;
      });
    },
    getRandomInt: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    airLinesChange: function() {
      this.airLines = $(".airLines").val();
      var splitted = this.splittedAirlines;
      var keys = Object.keys(this.dataTable);
      console.log(splitted);
      if (keys.length == 0) {
        this.dataTable[splitted[splitted.length - 1]] = Array();
        this.dataTable[splitted[splitted.length - 1]].push({
          from_port: "",
          to_port: "",
          price: 0,
          from_time: "",
          to_time: "",
          note: "",
        });
      } else {
        if (splitted.length > keys.length) {
          //add
          this.dataTable[splitted[splitted.length - 1]] = Array();
          this.dataTable[splitted[splitted.length - 1]].push({
            from_port: "",
            to_port: "",
            price: 0,
            from_time: "",
            to_time: "",
            note: "",
          });
        } else {
          keys.forEach((k) => {
            var isExist = false;
            splitted.forEach((s) => {
              if (s == k) isExist = true;
            });
            if (!isExist) {
              delete this.dataTable[k];
            }
          });
        }
      }
    },
    deleteSelection(name) {
      var splitted = this.airLines.split(",");
      var filtered = splitted.filter((airline) => airline != name);
      this.airLines = filtered.join(",");
      if (this.airLines == null) $(".airLines").val("");
      $(".airLines").val(this.airLines);
      console.log(this.airLines);
      console.log($(".airLines").val());
      $(".airLines-dropdown").dropdown("remove selected", name);
    },
    addTrip: function(name) {
      console.log(this.dataTable[name]);
      this.dataTable[name].push({
        from_port: "",
        to_port: "",
        price: 0,
        from_time: "",
        to_time: "",
        note: "",
      });
      this.forceRerender();
    },
    deleteTrip: function(name, index) {
      this.dataTable[name].splice(index, 1);
      if (this.dataTable[name].length == 0) {
        delete this.dataTable[name];
        this.deleteSelection(name);
      }
      this.forceRerender();
    },
  },
};
</script>
<style>
.send-button {
  width: 50%;
  font-size: 13px;
  padding: 7px;
  color: white !important;
  outline: none !important;
  border: transparent;
  background-color: #02b7b2 !important;
}
th {
  text-align: center;
  background: rgba(0, 0, 0, 0.03);
  width: 25%;
}

.details {
  text-align: right;
  padding: 20px;
  background-color: #f7ffff;
  border: 1px solid #02b7b2;
}
.booking {
  text-align: center;
  padding: 10px;
  margin: 10px;
}
.booking .child {
  margin: 50px !important;
}

.booking-one {
  text-align: center;
  margin-top: -30px;
  margin-left: 30px;
}
.booking-one .child {
  margin-right: 50px !important;
}
.steps-book {
  text-align: center;
  margin: 30px;
  background-color: #f7ffff;
  width: 90%;
  padding: 15px;
  margin-left: 50px;
  border: 1px solid #02b7b2;
}

.step {
  padding: 15px !important;
}
.steps-book .content {
  text-align: center;
  padding-left: 80px;
}
.steps-book .content .title {
  color: black !important;
  margin-bottom: 15px;
}
.steps-book .content .description {
  font-size: 16px !important;
}
img {
  margin-right: 80px;
  width: 50px;
}
.active {
  background-color: #02b7b2 !important;
}
.active:after {
  background: #02b7b2 !important;
}
.company {
  text-align: right;
  padding: 20px;
  margin-right: 50px;
}
.dropdwon-company,
.drop-flight {
  margin-bottom: 20px;
}

.result {
  background-color: #f7ffff;
  border: 1px solid #02b7b2;

  direction: rtl;
}
.row {
  /* f777a2 */
  margin-right: 0px;
  margin-left: 0px;
}
.add-button {
  font-size: 13px;
  border-radius: 20px;
  padding: 7px;
  color: white;
  outline: none !important;
  border: transparent;
  background-color: #02b7b2;
}
.delete-pad {
  background: #f777a2 !important;
  color: white !important;
  cursor: pointer;
  padding: 5px;
}
.price,
.note {
  width: 100%;
  height: 100%;
  margin-right: 0px;
}
</style>
