import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    firstname: null,
    lastname: null,
    username: null,
    id: null,
    forum: null,
  },
});
export default store
