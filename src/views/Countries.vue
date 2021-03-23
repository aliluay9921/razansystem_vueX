<template>
  <div class="content-wrapper">
    <div class="card-header">
      <h3 class="card-title">خطوط الطيران المتوفرة</h3>
    </div>

    <div class="container">
      <div class="add mt-3 mb-3 float-right">
        <button
          @click="addEmpty"
          class="addbtn btn btn-primary"
          data-toggle="modal"
          data-target="#addModel"
        >
          اضافة دولة
        </button>
      </div>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>code</th>
            <th>NameArbic</th>
            <th>geo</th>
            <th>longName</th>
            <th>cityName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(country, index) in countries" :key="index">
            <td>{{ country.code }}</td>
            <td>{{ country.NameArbic }}</td>
            <td>{{ country.geo }}</td>
            <td>{{ country.longName }}</td>
            <td>{{ country.cityName }}</td>
            <td>
              <button class="w-100 btn btn-danger" @click="deletePost(country)">
                حذف
              </button>

              <button
                @click="editPost(index)"
                class="mt-2 w-100 btn btn-success"
                data-toggle="modal"
                data-target="#countryModal"
              >
                تعديل
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="modal fade"
        id="countryModal"
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
                <label for="exampleInputEmail1">code</label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  v-model="code"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">geo</label>
                <input
                  type="text"
                  class="form-control"
                  id="geo"
                  v-model="geo"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">longName</label>
                <input
                  type="text"
                  class="form-control"
                  id="longName"
                  v-model="longName"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">cityName</label>
                <input
                  type="text"
                  class="form-control"
                  id="cityName"
                  v-model="cityName"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">nameArbic</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameArbic"
                  v-model="NameArbic"
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
              <h5 class="modal-title" id="exampleModalLabel">اضافة دولة</h5>
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
                <label for="exampleInputEmail1">code</label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  v-model="code"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">geo</label>
                <input
                  type="text"
                  class="form-control"
                  id="geo"
                  v-model="geo"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">longName</label>
                <input
                  type="text"
                  class="form-control"
                  id="longName"
                  v-model="longName"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">cityName</label>
                <input
                  type="text"
                  class="form-control"
                  id="cityName"
                  v-model="cityName"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">nameArbic</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameArbic"
                  v-model="NameArbic"
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
      code: "",
      geo: "",
      longName: "",
      cityName: "",
      NameArbic: "",
      current: -1,
    };
  },
  computed: {
    ...mapState(["countries", "render"]),
  },
  methods: {
    ...mapActions(["loadCountries"]),
    deletePost(country) {
      this.$store.dispatch("deletecountry", country);
    },
    addEmpty() {
      console.log("here");
      this.code = "";
      this.geo = "";
      this.longName = "";
      this.cityName = "";
      this.NameArbic = "";
      this.current = -1;
    },
    editPost(index) {
      console.log(index);
      this.current = index;
      this.code = this.countries[index].code;
      this.longName = this.countries[index].longName;
      this.cityName = this.countries[index].cityName;
      this.NameArbic = this.countries[index].NameArbic;
      this.geo = this.countries[index].geo;
    },
    saveitem() {
      let country = this.countries[this.current];
      let data = {
        id: country.id,
        code: this.code,
        longName: this.longName,
        cityName: this.cityName,
        NameArbic: this.NameArbic,
        geo: this.geo,
      };
      this.$store.dispatch("updatecountry", data);
      this.$store.dispatch("forceRerender");
    },
    additem() {
      let data = {
        code: this.code,
        longName: this.longName,
        cityName: this.cityName,
        NameArbic: this.NameArbic,
        geo: this.geo,
      };
      this.$store.dispatch("createcountry", data);
      // this.$store.dispatch("forceRerender");
    },
  },
};
</script>
<style></style>
