<template>
  <div>
    
    <b-container  >
     
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Change your Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="email"
          placeholder="Enter email"
          required
          
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Change your password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Enter new password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Here you can edit your firstname:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.Fname"
          placeholder="Edit your first name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Here you can edit your lastname:" label-for="input-4">
        <b-form-input
        id="input-4"
          v-model="form.Lname"
          placeholder="Edit your lastname"
          required
        >
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="danger">Submit</b-button>
    </b-form>
    </b-container>
     <div>
          <b-modal id="modal-1" hide-footer title="User Updated successfully">
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
</template>

<script>
  export default {
    data() {
      return {
          dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
        form: {
          username: '',
          password: '',
          Fname: '',
          Lname: ''
        },
        
        show: true
      }
    },
    methods: {
        countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },    
        gotoLogin() {
      this.$router.push("/Login");
    },
      onSubmit() 
      {let form = {
        id: this.$store.state.id,
        username: this.form.username,
        password: this.form.password,
        Fname: this.form.Fname,
        Lname: this.form.Lname,
       
      };
      let newMessage = JSON.stringify(form);
      this.$client.publish("user/updateUser", newMessage, 1, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(newMessage);
          this.$client.on("message", (topic, payload) => {
            if (topic == "ui/userUpdated") {
              console.log(payload.toString());
              
          this.$store.state.username = form.username;
          this.$store.state.firstname = form.Fname;
          this.$store.state.lastname = form.Lname;
          localStorage.setItem(
            "localUsername",
            JSON.stringify({
              username: form.username,
              firstname: form.Fname,
              lastname: form.Lname,
            })
          );
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
        
      },
    //   onReset(event) {
    //     event.preventDefault()
    //     // Reset our form values
    //     this.form.username = ''
    //     this.form.password = ''
    //     this.form.Fname = ''
    //     this.form.Lname = ''
    //     // Trick to reset/clear native browser form validation state
    //     this.show = false
    //     this.$nextTick(() => {
    //       this.show = true
    //     })
    //   }
    }
</script>

<style>
h2{
  padding-top:50px;
}
</style>