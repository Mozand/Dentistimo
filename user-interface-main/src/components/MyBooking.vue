<template>
    <div>
        <div class="sidenav">
            <b>My Account</b>
            <a href="/profile">My Information</a>
            <a href="/changeInfo" class="active">Change Information</a>
            <a href="/mybooking">My Bookings</a>
        </div>

        <!-- Page content -->
        <div class="main">
            <h2 style="font-weight: bold">My Bookings </h2>
            <br />
            <p>Here You Can See Your Bookings information.</p>
            <p></p>
            
            <br />
            <button type="submit" class="deletebtn">Cancel Booking </button>
        </div>
    </div>
</template>



<style>

.main {
  position: absolute;
    top: 10%;
    left: 40%;
}

input.form-controll {
  width: 70%;
  padding: 10px;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.deletebtn {
    float: right;
    background-color: #cf0505;
    color: white;
    padding: 13px 18px;
    border: none;
    cursor: pointer;
    width: 34%;
    opacity: 0.8;
}

@media (max-width: 576px) {
  .main {
    top: 18%;
    left: 30%;
  }

  .deletebtn {
    width: 60%;
  }
}
</style>