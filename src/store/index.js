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
    bookingInfo: [],
    select_booking: [],
    dashboardCount: '',
    discountFlights: [],
    posationAvailables: [],
    pnr: "",
    orderPnr: [],
    ticket: []
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },

  mutations: {
    dashboardCount(state, data) {

      state.dashboardCount = data
    },
    getinfo(state, item) {

      state.notification_index = item[0];
      state.selected_order = item[1];
    },
    sendinfo(state, item) {

      state.select_booking = item[1];
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
    order_pnr(state, data) {
      // console.log(data)
      for (let index = 0; index < data.length; index++) {
        Vue.set(state.orderPnr, index, data[index]);
      }
    },
    SET_Admin_Item(state, data) {
      let index = state.adminNotification.length;
      data.forEach((e) => {
        Vue.set(state.adminNotification, index, e);
        index++;
      });
    },
    SET_booking_Item(state, data) {

      let index = state.bookingInfo.length;
      data.forEach((e) => {
        Vue.set(state.bookingInfo, index, e);
        index++;
      });
    },
    Add_Item(state, data) {
      if (data.type == 0) state.items.unshift(data);
      else if (data.type == 2) state.adminNotification.unshift(data);
      else if (data.type == 5) state.bookingInfo.unshift(data);

    },
    set_flightLine(state, data) {
      for (let index = 0; index < data.length; index++) {
        Vue.set(state.flightlines, index, data[index]);
      }
    },
    set_country(state, data) {
      for (let index = 0; index < data.length; index++) {
        Vue.set(state.countries, index, data[index]);
      }
    },
    set_discount(state, data) {

      for (let index = 0; index < data.length; ++index) {
        Vue.set(state.discountFlights, index, data[index]);
      }
    },
    posationAvailables(state, data) {
      for (let index = 0; index < data.length; ++index) {
        Vue.set(state.posationAvailables, index, data[index]);
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

      let index = state.flightlines.findIndex(
        (flightlines) => flightlines.id === flightline.id
      );
      state.flightlines.splice(index, 1);
    },

    DELETE_discount(state, discount) {

      let index = state.discountFlights.findIndex(
        (discountFlights) => discountFlights.id === discount.id
      );
      state.discountFlights.splice(index, 1);
    },

    DELETE_countary(state, country) {

      let index = state.countries.findIndex(
        (countries) => countries.id === country.id
      );
      state.countries.splice(index, 1);
    },
    DELETE_posationAvailable(state, posationAvailable) {

      let index = state.posationAvailables.findIndex(
        (posationAvailables) => posationAvailables.id === posationAvailable.id
      );
      state.posationAvailables.splice(index, 1);
    },

    updateitem: (state, flightline) => {
      const index = state.flightlines.findIndex(
        (todo) => todo.id === flightline.id
      );
      if (index !== -1) {
        Vue.set(state.flightlines, index, flightline);
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

    updateDiscount: (state, discount) => {
      const index = state.discountFlights.findIndex(
        (todo) => todo.id === discount.id
      );
      if (index !== -1) {
        Vue.set(state.discountFlights, index, discount);
      }
    },
    updatePosationAvailables: (state, PosationAvailable) => {
      const index = state.PosationAvailables.findIndex(
        (todo) => todo.id === PosationAvailable.id
      );
      if (index !== -1) {
        Vue.set(state.PosationAvailables, index, PosationAvailable);
      }
    },

    CREATE_POST(state, data) {
      state.flightlines.push(data);
    },

    CREATE_country(state, data) {
      state.countries.push(data);
    },
    CREATE_DISCOUNT(state, data) {
      state.discountFlights.push(data);
    },
    CREATE_posationAvailables(state, data) {
      state.posationAvailables.push(data);
    },
    update_notification(state, data) {
      let item = data[1];
      item.seen = data[2];
      Vue.set(state.adminNotification, data[0], item);
    },
    CREATE_pnr(state, data) {
      state.pnr = data;
    },
    CREATE_TICKET(state, data) {
      state.ticket.push(data)
    }

  },
  actions: {
    async socketAdmin({ commit }, data) {
      commit("Add_Item", data);
    },
    async countDashboard({ commit }) {
      await axios
        .get("http://127.0.0.1:8000/api/dashboardCount")
        .then((response) => {
          commit("dashboardCount", response.data.result);
        });
    },

    //flightplan
    async storeFlightPlan({ commit }, body) {
      //  let id = order.id;
      // console.log(id);

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
    async loadnotificationBooking({ commit }, skip = 0) {
      commit("toggleLoading", true);
      await axios
        .get("http://127.0.0.1:8000/api/notificationsSelected?skip=" + skip)
        .then((response) => {
          commit("SET_booking_Item", response.data.result);
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
      });
    },


    async flightline({ commit }) {
      await axios
        .get("http://127.0.0.1:8000/api/flightline")
        .then((response) => {
          commit("set_flightLine", response.data.result);

        });
    },
    async discount({ commit }) {
      await axios
        .get("http://127.0.0.1:8000/api/discount")
        .then((response) => {
          commit("set_discount", response.data.result);

        });
    },
    async posationAvailables({ commit }) {
      await axios
        .get("http://127.0.0.1:8000/api/posation")
        .then((response) => {
          commit("posationAvailables", response.data.result);

        });
    },
    async loadOrderPnr({ commit }) {
      await axios.get("http://127.0.0.1:8000/api/orderPnr")
        .then(response => {
          commit('order_pnr', response.data.result)
        })
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

    deleteDiscount({ commit }, discount) {
      axios
        .delete("http://127.0.0.1:8000/api/discount", {
          data: {
            id: discount.id,
          },
        })
        .then(() => {
          commit("DELETE_discount", discount);
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
    deletePosationAvailables({ commit }, posationAvailable) {
      axios
        .delete("http://127.0.0.1:8000/api/posation", {
          data: {
            id: posationAvailable.id,
          },
        })
        .then(() => {
          commit("DELETE_posationAvailable", posationAvailable);
        });
    },

    async updateitem({ commit }, data) {
      await axios
        .put("http://127.0.0.1:8000/api/flightline", data)
        .then((response) => {
          commit("updateitem", response.data.result[0]);
        });
    },
    async updatecountry({ commit }, data) {

      await axios
        .put("http://127.0.0.1:8000/api/countary", data)
        .then((response) => {
          commit("updatecountary", response.data.result[0]);
        });
    },
    async updateDiscount({ commit }, data) {
      await axios
        .put("http://127.0.0.1:8000/api/discount", data)
        .then((response) => {
          commit("updateDiscount", response.data.result[0]);
        });
    },
    async updatePosationAvailables({ commit }, data) {
      await axios
        .put("http://127.0.0.1:8000/api/posation", data)
        .then((response) => {
          commit("updatePosationAvailables", response.data.result[0]);
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
    createDiscount({ commit }, data) {
      axios
        .post("http://127.0.0.1:8000/api/discount", data)
        .then((response) => {

          commit("CREATE_DISCOUNT", response.data.result[0]);
          console.log(response.data.result[0]);

        });
    },
    createPosationAvailables({ commit }, data) {
      axios
        .post("http://127.0.0.1:8000/api/posation", data)
        .then((response) => {

          commit("CREATE_PosationAvailables", response.data.result[0]);
          console.log(response.data.result[0]);

        });
    },
    create_pnr({ commit }, data) {
      axios
        .post("http://127.0.0.1:8000/api/savePNR", data)
        .then((response) => {
          commit("CREATE_pnr", response.data.result);
        });
    },
    create_ticket({ commit }, data) {
      axios.post("http://127.0.0.1:8000/api/ticket", data)
        .then(response => {
          commit('CREATE_TICKET', response.data.result)
        })
    }

  },
});
