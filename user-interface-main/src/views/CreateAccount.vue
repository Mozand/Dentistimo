<template>
  <body>
    <div class="contain">
      <div class="form">
        <b-form
          @submit.prevent="regUser(), showAlert()"
          @reset="onReset"
          v-if="show"
        >
          <b-form-group
            id="input-group-1"
            label="Username"
            label-for="input-1"
            description="please create a new Username"
          >
            <b-form-input
              id="input-1"
              v-model="form.username"
              type="text"
              placeholder="Enter your Email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input
              type="password"
              id="input-2"
              v-model="form.password"
              placeholder="Enter new password"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-4" label="Sex" label-for="input-4">
            <b-form-select
              id="input-4"
              v-model="form.sex"
              :options="sexs"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group id="input-group-5" label="first name" label-for="input-5">
            <b-form-input
              type="text"
              id="input-5"
              v-model="form.Fname"
              placeholder="Please enter your first name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-6" label="last name" label-for="input-6">
            <b-form-input
              type="text"
              id="input-6"
              v-model="form.Lname"
              placeholder="Please enter your last name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-7"
            label="birthdate"
            label-for="input-7"
          >
            <b-form-datepicker
              id="input-group-7"
              v-model="form.birthdate"
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
        <p>
          Already have an account?
          <router-link to="/">Login</router-link>
        </p>
        <div>
          <b-modal id="modal-1" hide-footer title="User Created successfully">
            <div class="d-block">
              <div>
                <b-alert
                  :show="dismissCountDown"
                  dismissible
                  variant="warning"
                  @dismissed="(dismissCountDown = 0), gotoLogin()"
                  @dismiss-count-down="countDownChanged"
                >
                  <p>
                    You will be redirected to login page after
                    {{ dismissCountDown }} seconds...
                  </p>
                  <b-progress
                    variant="warning"
                    :max="dismissSecs"
                    :value="dismissCountDown"
                    height="4px"
                  ></b-progress>
                </b-alert>
              </div>
            </div>
            <b-button
              class="mt-2"
              variant="outline-warning"
              @click="gotoLogin()"
              >Go To Login</b-button
            >
          </b-modal>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
// import mqtt from "mqtt";
export default {
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      form: {
        username: "",
        password: "",
        Fname: "",
        Lname: "",
        birthdate: null,
        sex: null,
      },
      sexs: [{ text: "Select One", value: null }, "Male", "Female", "Other"],
      show: true,
      // client: {},
      // info: {
      //   clientID: "mqtt04",
      //   clean: true,
      // },
      topic: "newUser",
      user: {},
      publish: {
        topic: "newUser",
        qos: 0,
        payload: this.form,
      },
    };
  },
  mounted() {
    this.connect();
    console.log("here");
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    gotoLogin() {
      this.$router.push("/");
    },
    regUser() {
      // const topic = this.topic;
      // const form = this.form;
      let targetForm = {
        username: this.form.username,
        password: this.form.password,
        Fname: this.form.Fname,
        Lname: this.form.Lname,
        birthdate: this.form.birthdate,
        sex: this.form.sex,
      };
      let newMessage = JSON.stringify(targetForm);
      this.$client.publish("user/newUser", newMessage, 1, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(newMessage);
          this.$client.on("message", (topic, payload) => {
            if (topic == "ui/userCreated") {
              console.log(payload.toString());
              this.$root.$emit("bv::show::modal", "modal-1", "#btnShow");
            }
          });
          this.$client.on("message", (topic, payload) => {
            if (topic == "ui/UserError") {
              console.log(payload.toString());
            }
          });
        }
      });
    },
    connect() {
      // try {
      //   this.client = mqtt.connect("mqtt://localhost:9001", this.info);
      //   console.log("connnn");
      // } catch (error) {
      //   console.log(error);
      // }
      // this.$client.on("connect", () => {
      //   console.log("connected successfully");
      // });
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.username = "";
      this.form.password = "";
      this.form.Fname = "";
      this.form.Lname = "";
      this.form.birthdate = null;
      this.form.sex = null;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  background: linear-gradient(to right, #1aa9d7, #12e7dd);
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}
.contain {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 50%;
}
.form {
  padding: 3em;
  text-align: center;
  position: relative;
  transition: all 0.2s ease-in-out;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>