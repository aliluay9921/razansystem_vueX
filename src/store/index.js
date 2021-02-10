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
    selected_order: {},
    storeSucess: false,
    isNotLoading: false,
    notification_index: -1,
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
    Add_Item(state, data) {
      state.items.unshift(data);
    },
    set_flightLine(state, data) {
      state.flightlines = data;
    },
    set_country(state, data) {
      state.countries = data;
    },
    store_flightPlan(state, data) {
      state.storeSucess = data;
    },
    toggleLoading(state, data) {
      state.isNotLoading = data;
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
        .post("http://192.168.0.159:8000/api/flightplan", body)
        .then((response) => {
          console.log(response.data);
          commit("store_flightPlan", true);
          // console.log(response);
          // commit();
        });
    },
    async loadItems({ commit }, skip = 10) {
      commit("toggleLoading", true);
      await axios
        .get(
          "http://192.168.0.159:8000/api/notifications_employee?skip=" + skip
        )
        .then((response) => {
          commit("SET_Item", response.data.result);
        });
      commit("toggleLoading", false);
    },
    async loadCountries({ commit }) {
      await axios
        .get("http://192.168.0.159:8000/api/countary")
        .then((response) => {
          commit("set_country", response.data.result);
        });
    },
    async flightline({ commit }) {
      await axios
        .get("http://192.168.0.159:8000/api/flightline")
        .then((response) => {
          commit("set_flightLine", response.data.result);
        });
    },
    //#####################################################  login process #####################################################
    login({ commit }, UserName) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://192.168.0.159:8000/api/loginadmin",
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
  },
});
