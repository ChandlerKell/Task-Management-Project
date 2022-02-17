import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify.js'


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
  render: h => h(App),
}).$mount('#app')
