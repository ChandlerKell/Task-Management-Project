import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify.js'
// import Vuex from 'vuex'


import Login from './components/Login'
import Tasks from './components/Tasks'
import Projects from './components/Projects'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login', 
      name: "Login",
      component: Login,
    },
    {
      path: '/tasks', 
      name: "Tasks",
      component: Tasks,
    },
    {
      path: '/projects', 
      name: "Projects",
      component: Projects,
    },
  ]
})

Vue.config.productionTip = false

new Vue({
  router, 
  vuetify,
  // store: new Vuex.Store({
  //   state: {
  //     authenticated: false
  //   },
  //   mutations: {
  //     AUTHENTICATE (state) {
  //       state.authenticated = true
  //     },
  //     DEAUTHENTICATE (state) {
  //       state.authenticated = false
  //     },
  //   },
  //   getters: {
  //     authenticated: (state) => state.authenticated
  //   },
  //   actions: {
  //     authenticate(context) { 
  //       context.commit("AUTHENTICATE")
  //     },
  //     deauthenticate(context) { 
  //       context.commit("DEAUTHENTICATE")
  //     },
  //   },
  // }),
  render: h => h(App),
}).$mount('#app')
