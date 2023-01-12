<template>
  <div>
    <Navbar />
    <div class="flex-item">
      <div class="sidenav">
        <b>My Account</b>
        <a href="/profile" class="active">My Information</a>
        <!--  <a href="/changeInfo">Change Information</a> -->
        <a href="/user/appointments">My Booking</a>
      </div>

      <!-- Page content -->
      <div class="main">
        <div class="currentInfo">
          <h3 style="color: white">Your Current Information</h3>
          <UserInformation />
        </div>

        <div class="updateprofile">
          <h3 style="color: white">Update your profile</h3>
          <ChangeInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import UserInformation from "../components/userInformation.vue";
import ChangeInfo from "../components/ChangeInfo.vue";
export default {
  name: "Profile",
  components: { Navbar, UserInformation, ChangeInfo },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.flex-item {
  display: flex;
}

.sidenav {
  height: 100vh;
  width: 280px;
  z-index: 1;
  top: 20;
  left: 0;
  background-color: #0c667c;
  overflow-x: hidden;
  padding-top: 20px;
}

/* The navigation menu links */

.sidenav b {
  padding: 5px 8px 20px 8px;
  text-decoration: none;
  font-size: 30px;
  color: #ffffff;
  display: block;
}

.sidenav a {
  padding: 5px 8px 5px 8px;
  text-decoration: none;
  font-size: 25px;
  color: #ffffff;
  display: block;
}

/* When you mouse over the navigation links, change their color */

.sidenav a:hover {
  border-bottom: 3px solid transparent;
}

.sidenav .active {
  border-bottom: 3px solid white;
}

/* Style page content */

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */

@media screen and (max-width: 576px) {
  .sidenav {
    padding-top: 15px;
    display: block;
    width: 110px;
    height: 559px;
  }
  .sidenav a {
    font-size: 18px;
  }
  .sidenav b {
    font-size: 18px;
  }
}
.main {
  margin-top: 60px;
  width: 80%
}
.updateprofile {
  padding-top: 0px;
  margin-top: 100px;
}

 .currentinfo{
   width: 50px;
 }

</style>
