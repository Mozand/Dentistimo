<template>
  <body>
    
    <div class="contain">
      <div class="login">
        <div>
          <img src="../assets/logo.png" alt="Girl in a jacket" width="500" height="300">
          <b-form @submit.prevent="log_in" class="form">
            <div>
              <b-form-group
                id="fieldset-1"
                label="Enter your Username"
                label-for="input-1"
                valid-feedback="valid input"
                :invalid-feedback="invalidUsername"
              >
                <b-form-input
                  class="forminput"
                  id="input-1"
                  v-model="log.username"
                  trim
                  placeholder="username"
                ></b-form-input>
              </b-form-group>
            </div>
            <div>
              <b-form-group
                id="fieldset-2"
                label="Enter your Password"
                label-for="input-2"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidPassword"
              >
                <b-form-input
                  class="forminput"
                  type="password"
                  id="input-2"
                  v-model="log.password"
                  trim
                  placeholder="password"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-button type="submit">Log in </b-button><br>
            <br>
            <p>
          You  have no account  yet?
          <router-link to="/CreateAccount">Register</router-link>
        </p>
          </b-form>
          
        </div>
        <div class="drops">
          <div class="drop drop-1"></div>
          <div class="drop drop-2"></div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
// @ is an alias to /src
// import { Api } from "@/Api";
export default {
  computed: {
    invalidUsername() {
      if (this.log.username.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
    invalidPassword() {
      if (this.log.password.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
  },
  data() {
    return {
      log: {
        username: "",
        password: "",
      },
      show: true,
    };
  },
  mounted() {
    this.loginResponse();
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.log));
    },
    onreset(event) {
      event.preventDefault();
      this.username = "";
      this.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    log_in() {
      let loginInfo = {
        username: this.log.username,
        password: this.log.password,
      };
      let targetLogin = JSON.stringify(loginInfo);
      this.$client.publish("user/login", targetLogin, 1, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(targetLogin);
        }
      });
    },
    loginResponse() {
      this.$client.on("message", (topic, payload) => {
        if (topic == "ui/loginResponse") {
          var userRespond = JSON.parse(payload);

          this.$store.state.username = userRespond.username;
          this.$store.state.id = userRespond._id;
          this.$store.state.firstname = userRespond.Fname;
          this.$store.state.lastname = userRespond.Lname;

          localStorage.setItem(
            "localUsername",
            JSON.stringify({
              username: userRespond.username,
              id: userRespond._id,
              firstname: userRespond.Fname,
              lastname: userRespond.Lname,
            })
          );
          this.$router.push("/home");
          console.log("here");
          console.log(localStorage);
        } else {
          console.log("error");
          //return alert("invalid");
        }
      });
    },

    // log_in() {
    //   Api.post("/users/login", this.log) // change to mqtt
    //     .then((res) => {
    //       if (res.status === 200) {
    //         this.$store.state.username = res.data.user.username;
    //         this.$store.state.id = res.data.user._id;
    //         localStorage.setItem(
    //           "localUsername",
    //           JSON.stringify({
    //             username: res.data.user.username,
    //             id: res.data.user._id,
    //           })
    //         );
    //         this.$router.push("/Forum");
    //         console.log("here");
    //       } else {
    //         console.log("false");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       return alert("invalid");
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
.btn_message {
  margin-bottom: 1em;
}
/*.login {
  background-color: #d31616c4;
   backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); 
  position: fixed;
  top: 50%;
  left: 50%;
   bring your own prefixes 
  transform: translate(-50%, -50%);
}
#input-1 {
  padding: 10px;
  margin: 10px 0;
}
.contain {
  background-color: darkblue;
  top: 100%;
  left: 100%;
}*/

body {
  background: linear-gradient(to right,  #1aa9d7, #12e7dd);
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}
.contain {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.form {
  padding: 3em;
  height: 360px;
  text-align: center;
  position: relative;
  transition: all 0.2s ease-in-out;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.forminput {
  width: 400px;
  padding: 1em;
  margin-bottom: 1em;
  border: none;
  border-radius: 5000px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 10px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  font-family: Montserrat, sans-serif;
  color: #000;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}
::placeholder {
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  color: #000;
}
.drop {
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  position: absolute;
  transition: all 0.2s ease;
}
.drop-1 {
  background: linear-gradient(to right, #ffdd00, #fbb034);
  height: 80px;
  width: 80px;
  top: -20px;
  left: -40px;
  z-index: -1;
}

.drop-2 {
  background: linear-gradient(to right, #ff145f, #ffc42d);
  height: 80px;
  width: 80px;
  bottom: 90px;
  right: -50px;
  z-index: -1;
  border-radius: 50%;
}
</style>
