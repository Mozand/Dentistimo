import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import CreateAccount from "../views/CreateAccount.vue";
import Dentist from '../views/Dentist.vue'
import Appointments from '../views/Appointments.vue'
import Login from "../views/Login.vue"
import UserAppointments from "../views/UserAppointments.vue"
import Profile from  "../views/Profile.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/CreateAccount",
      name: "CreateAccount",
      component: CreateAccount,
    },
    {
      path: "/dentist/:dentistid",
      name: "Dentist",
      component: Dentist,
    },
    {
      path: "/dentist/:dentistid/appointments",
      name: "Appointments",
      component: Appointments,
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path :"/user/appointments",
      name:"UserAppointments",
      component:UserAppointments
    },
    {
      path:"/profile",
      name:"profile",
      component:Profile
      
    }
  ]
})
