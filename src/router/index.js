import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import flightLine from '../views/flightLine.vue'
import store from '../store/index'
import FlightPlan from '../views/flightPlan.vue'
import booking from '../views/booking.vue'
import Countries from '../views/Countries.vue'
import login from '../components/login.vue'
import discount from '../views/discountFlight.vue'
import posationAvailable from '../views/posationAvailable.vue'
import orderPnr from '../views/OrderPnr.vue'
import HomeManage from '../views/HomeManage.vue'
import Messgae from "../views/Message.vue"
import issusTickets from "../views/issusTicket.vue"
Vue.use(VueRouter)
Vue.use(require('vue-pusher'),
  {
    api_key: "hello", options:
    {
      wsHost: "127.0.0.1",
      wsPort: 6001,
      wssPort: 6001,
      wsPath: "",
      disableStats: true,
      authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
      auth: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "X-CSRF-Token": localStorage.getItem("token"),
          "X-App-ID": "hello",
        },
      },
      enabledTransports: ["ws", "wss", "websocket", "polling", "flashsocket"],
      forceTLS: false,
    }
  });

const routes = [

  {
    path: '/login',
    name: 'login',
    component: login,
    // meta: { requiresAuth: false },
  }, {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: Home
  },
  {
    path: '/flightplan',
    name: 'flightPlan',
    component: FlightPlan
  },
  {
    path: '/flightLine',
    name: 'flightLine',
    component: flightLine
  },
  {
    path: '/discount',
    name: 'discount',
    component: discount
  },
  {
    path: '/posationAvailable',
    name: 'posationAvailable',
    component: posationAvailable
  },
  {
    path: '/Countries',
    name: 'Countries',
    component: Countries
  },
  {
    path: '/booking',
    name: 'booking',
    component: booking,

  },
  {
    path: '/orderPnr',
    name: 'orderPnr',
    component: orderPnr,
  },
  {
    path: '/HomeManage',
    name: 'HomeManage',
    component: HomeManage,
  },
  {
    path: '/Messgae',
    name: 'Messgae',
    component: Messgae,
  }
  , {
    path: '/issusTickets',
    name: 'issusTickets',
    component: issusTickets,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
export default router
