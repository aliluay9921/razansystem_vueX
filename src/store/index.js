import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    items: [],
    selected_order: null
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getinfo: (state) => {
      return state.selected_order;
    }
  },

  mutations: {
    // ###################### auth process ######################33
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, UserName) {
      state.status = 'success'
      state.token = token
      state.UserName = UserName
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    // ###################### end  auth process ######################
    SET_Item(state, data) {
      state.items = data;

    },


  },
  actions: {
    async loadItems({ commit }) {
      await axios
        .get("http://127.0.0.1:8000/api/notifications_employee")
        .then((response) => {
          commit("SET_Item", response.data.result)


        });
    },
    //#####################################################  login process #####################################################
    login({ commit }, UserName) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://127.0.0.1:8000/api/loginadmin', data: UserName, method: 'POST' })
          .then(resp => {

            const token = resp.data.token
            const UserName = resp.data.UserName
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = "Bearer " + token
            commit('auth_success', token, UserName)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    // ##################################################### end login#####################################################
    // #####################################################logout process#####################################################
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
    //##################################################### end logout #####################################################

  },

})