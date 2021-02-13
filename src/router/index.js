<<<<<<< HEAD
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import flightLine from "../views/flightLine.vue";
import store from "../store/index";
import FlightPlan from "../views/flightPlan.vue";
import positionAvailable from "../views/positionAvailable.vue";
import Countries from "../views/Countries.vue";
import login from "../components/login.vue";
Vue.use(VueRouter);
Vue.use(require("vue-pusher"), {
  api_key: "hello",
  options: {
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
=======
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import flightLine from '../views/flightLine.vue'
import store from '../store/index'
import FlightPlan from '../views/flightPlan.vue'
import booking from '../views/booking.vue'
import Countries from '../views/Countries.vue'
import login from '../components/login.vue'
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
>>>>>>> 7e1d21b3d885830748b17247840419eb79bfbdc6
      },
    },
    enabledTransports: ["ws", "wss", "websocket", "polling", "flashsocket"],
    forceTLS: false,
  },
});

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      requiresAuth: true,
    },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: login,
    // meta: { requiresAuth: false },
  },
  {
    path: "/flightplan",
    name: "flightPlan",
    component: FlightPlan,
  },
  {
    path: "/positionAvailable",
    name: "positionAvailable",
    component: positionAvailable,
  },
  {
    path: "/flightLine",
    name: "flightLine",
    component: flightLine,
  },
  {
    path: "/Countries",
    name: "Countries",
    component: Countries,
  },
  {
<<<<<<< HEAD
    path: "/about",
    name: "About",
=======
    path: '/booking',
    name: 'booking',
    component: booking,

  },
  {
    path: '/about',
    name: 'About',
>>>>>>> 7e1d21b3d885830748b17247840419eb79bfbdc6
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
<<<<<<< HEAD
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
=======
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
>>>>>>> 7e1d21b3d885830748b17247840419eb79bfbdc6
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
export default router;
