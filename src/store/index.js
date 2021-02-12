import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    items: [],
    flightlines: [],
    countries: [],
    adminNotification: [],
    selected_order: {},
    storeSucess: false,
    isNotLoading: false,
    notification_index: -1,
    render: true,
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },

  mutations: {
    getinfo(state, item) {
      state.notification_index = item[0];
      state.selected_order = item[1];
    },
    // ###################### auth process ######################33
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, UserName) {
      state.status = "success";
      state.token = token;
      state.UserName = UserName;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    // ###################### end  auth process ######################
    SET_Item(state, data) {
      state.items.push(...data);
    },
    SET_Admin_Item(state, data) {
      let index = state.adminNotification.length;
      data.forEach((e) => {
        Vue.set(state.adminNotification, index, e);
        index++;
      });
    },
    Add_Item(state, data) {
      console.log(data);
      if (data.type == 0) state.items.unshift(data);
      else if (data.type == 2) state.adminNotification.unshift(data);
    },
    set_flightLine(state, data) {
      for (let index = 0; index < data.length; index++) {
        Vue.set(state.flightlines, index, data[index]);
      }

      // state.flightlines = data;
    },
    set_country(state, data) {
      // state.countries = data;
      for (let index = 0; index < data.length; ++index) {
        Vue.set(state.countries, index, data[index]);
      }
    },
    store_flightPlan(state, data) {
      state.storeSucess = data;
    },
    toggleLoading(state, data) {
      state.isNotLoading = data;
    },

    refersh(state, data) {
      state.refersh = data;
    },

    DELETE_POST(state, flightline) {
      console.log(flightline);
      let index = state.flightlines.findIndex(
        (flightlines) => flightlines.id === flightline.id
      );
      // console.log(index);

      state.flightlines.splice(index, 1);
    },

    DELETE_countary(state, country) {
      console.log(country);
      let index = state.countries.findIndex(
        (countries) => countries.id === country.id
      );
      // console.log(index);

      state.countries.splice(index, 1);
    },

    updateitem: (state, flightline) => {
      // Find index

      const index = state.flightlines.findIndex(
        (todo) => todo.id === flightline.id
      );
      console.log(index);
      console.log(flightline);
      if (index !== -1) {
        Vue.set(state.flightlines, index, flightline);
        // state.flightlines[index] = flightline //.splice(index, 1, flightline);
        console.log(flightline);
      }
    },
    updatecountry: (state, countary) => {
      const index = state.countries.findIndex(
        (todo) => todo.id === countary.id
      );
      if (index !== -1) {
        Vue.set(state.countries, index, countary);
      }
    },

    CREATE_POST(state, data) {
      console.log(data);
      state.flightlines.push(data);
    },

    CREATE_country(state, data) {
      console.log(data);
      state.countries.push(data);
    },
    update_notification(state, data) {
      let item = data[1];
      item.seen = data[2];
      Vue.set(state.adminNotification, data[0], item);
    },
  },
  actions: {
    async socketAdmin({ commit }, data) {
      commit("Add_Item", data);
    },
    //flightplan
    async storeFlightPlan({ commit }, body) {
      //  let id = order.id;
      // console.log(id);
      console.log(body);
      // data["order_id"]=id;

      await axios
        .post("http://127.0.0.1:8000/api/flightplan", body)
        .then((response) => {
          console.log(response.data);
          commit("store_flightPlan", true);
          // console.log(response);
          // commit();
        });
    },
    async loadItems({ commit }, skip = 0) {
      commit("toggleLoading", true);
      await axios
        .get("http://127.0.0.1:8000/api/notifications_employee?skip=" + skip)
        .then((response) => {
          commit("SET_Item", response.data.result);
        });
      commit("toggleLoading", false);
    },
    async markAsSeen({ commit }, data) {
      await axios
        .put("http://127.0.0.1:8000/api/seen", { id: data[1].id })
        .then((response) => {
          data.push(response.data.result[0]);
          commit("update_notification", data);
        });
    },
    async loadAdminNotification({ commit }, skip = 0) {
      commit("toggleLoading", true);
      await axios
        .get(
          "http://127.0.0.1:8000/api/notifications_admin_employee?skip=" + skip
        )
        .then((response) => {
          commit("SET_Admin_Item", response.data.result);
        });
      commit("toggleLoading", false);
    },
    async loadCountries({ commit }) {
      await axios.get("http://127.0.0.1:8000/api/countary").then((response) => {
        commit("set_country", response.data.result);
        console.log(response.data.result);
      });
    },
    async flightline({ commit }) {
      await axios
        .get("http://127.0.0.1:8000/api/flightline")
        .then((response) => {
          commit("set_flightLine", response.data.result);
          console.log(response.data.result);
        });
    },
    //#####################################################  login process #####################################################
    login({ commit }, UserName) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://127.0.0.1:8000/api/loginadmin",
          data: UserName,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const UserName = resp.data.UserName;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success", token, UserName);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    // ##################################################### end login#####################################################
    // #####################################################logout process#####################################################
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    //##################################################### end logout #####################################################
    deletePost({ commit }, flightline) {
      axios
        .delete("http://127.0.0.1:8000/api/flightline", {
          data: {
            id: flightline.id,
          },
        })
        .then(() => {
          commit("DELETE_POST", flightline);
        });
    },
    deletecountry({ commit }, country) {
      axios
        .delete("http://127.0.0.1:8000/api/countary", {
          data: {
            id: country.id,
          },
        })
        .then(() => {
          commit("DELETE_countary", country);
        });
    },

    async updateitem({ commit }, data) {
      console.log(data);
      await axios
        .put("http://127.0.0.1:8000/api/flightline", data)
        .then((response) => {
          commit("updateitem", response.data.result[0]);
        });
    },
    async updatecountry({ commit }, data) {
      console.log(data);
      await axios
        .put("http://127.0.0.1:8000/api/countary", data)
        .then((response) => {
          commit("updatecountary", response.data.result[0]);
        });
    },
    createPost({ commit }, data) {
      console.log(data);
      axios
        .post("http://127.0.0.1:8000/api/flightline", data)
        .then((response) => {
          commit("CREATE_POST", response.data.result[0]);
          // console.log(response.data)
        });
    },
    createcountry({ commit }, data) {
      console.log(data);
      axios
        .post("http://127.0.0.1:8000/api/countary", data)
        .then((response) => {
          commit("CREATE_country", response.data.result[0]);
          console.log(response.data);
        });
    },
  },
});
