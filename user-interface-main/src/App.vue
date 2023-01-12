<template>
  <v-app>
    <v-main>
      <div id="app">
        
        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                                                    <b-collapse id="nav-collapse" is-nav>
                                                        <b-navbar-nav class="ml-auto">
                                                            <b-nav-item>
                                                                <router-link to="/">Home</router-link>
                                                            </b-nav-item>
                                                            <b-nav-item>
                                                                <router-link to="login">Login</router-link>
                                                            </b-nav-item>
                                                        </b-navbar-nav>
                                                    </b-collapse>
                                                </b-navbar>
                                            </ul> -->

        <!--  <<<<<<<<<<<  to be removed-->
        <!-- <a v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</a>
                    <a v-if="currentUser" @click="logout" class="nav-item nav-link">Logout</a>
                    <router-link v-else to="/login"><i class="fa fa-fw fa-user"></i> Login</router-link>
                    <a v-if="currentUser">{{currentUser.username}}</a> -->

        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
//import Map from './components/Map.vue'
// import { Role } from './Role'
// import router from './router'

export default {
  name: "App",
  components: {},
  methods: {
    Auth() {
      this.$router.push("/CreateAccount");
    },
    subscribe() {
      this.$client.subscribe("ui/#", 1, (error, res) => {
        if (error) {
          console.log(error);
        }
        console.log("Subscribed to ", res);
      });
    },
    handeClick() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
  created() {
    const local = JSON.parse(localStorage.getItem("localUsername"));
    this.$store.state.firstname = local.firstname;
    this.$store.state.lastname = local.lastname;
    this.$store.state.username = local.username;
    this.$store.state.id = local.id;
    console.log(this.$store.state.username, this.$store.state.id);
  },
  mounted() {
    this.subscribe();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar-nav {
  background-color: #15294f;
  overflow: hidden;
}

.navbar-nav a:hover {
  background-color: #ddd;
}

#app {
  background-color: #1aa9d7 !important;
}
</style>
