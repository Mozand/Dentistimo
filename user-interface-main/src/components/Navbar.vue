<template>
  <div>
    <ul class="navbar-nav mr-auto navbar-dark">
      <b-navbar toggleable="lg">
        <router-link to="/home">
          <img src="/images/teeth.png" class="rounded-circle" width="60" />
        </router-link>
        <!-- <li class="nav-item" v-if="isLoggedIn == null">
          <router-link to="/login" class="nav-link"></router-link>
        </li> -->
        <!-- <li class="nav-item" v-else>
          <router-link @click="handleLogout" class="nav-link">
            Logout
          </router-link>
        </li> -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="link" href="/profile">My Account</b-nav-item
          >
          <b-nav-item class="link" href="/">Log out</b-nav-item></b-navbar-nav
        > 
      </b-navbar>
    </ul>
  </div>
</template>

<script>
export default {
    name:"Navbar",

};
</script>

<style>
.link{
  
    font-size:15px;
    padding-right: 20px;
  
}
</style>
