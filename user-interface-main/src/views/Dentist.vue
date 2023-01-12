<template>
  <div>
    <Navbar/>
    <div class="dentist-card">
      <img
        class="card-img-top-dentist"
        src="/images/dental-picture.png"
        alt="Card image cap"
      />
      <div class="card-body-list">
        <h1 class="card-title test-info">{{ dentist.name }}</h1>
        <h4 class="card-title">{{ dentist.owner }}</h4>
        <h4 class="card-title">{{ dentist.address }}</h4>
        <h4 class="card-title">{{ dentist.city }}</h4>
        <button type="button" class="btn btn-light btn-lg">
          <router-link
            :to="{
              name: 'Appointments',
              params: { dentistid: this.$route.params.dentistid },
            }"
            >BOOKING</router-link
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: "dentist",
  components: {Navbar},
  data() {
    return {
      client: {},
      options1: {
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 4000,
        clientId: "mqtt02",
        username: "emqx_test",
        password: "emqx_test",
      },
      options2: {
        clean: true,
        clientId: "mqtt02",
      },
      publish: {
        topic: "dentist/getdentistbyId",
        qus: 1,
        payload: this.$route.params.dentistid,
      },
      dentist: {},
      value: null,
    };
  },
  methods: {
    sendMessage() {
      let { topic, qos, payload } = this.publish;
      this.$client.publish(topic, payload, qos, (error) => {
        console.log("Step 1 Publish");
        if (error) {
          console.log(error);
        }
      });

      this.$client.on("message", (topic, payload) => {
        console.log("Hello Message!!");
        console.log(topic, payload.toString());
        if (topic == "ui/get-dental-clinic") {
          let response = JSON.parse(payload);
          this.dentist = response;
        }
        console.log("ARRAY: ", this.dentist);
      });
    },
  },
  mounted() {
    this.sendMessage();
  },
  destroyed() {},
};
</script>

<style>
.dentist-card {
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.178);
  padding: 3%;
  border: 2px solid rgb(140, 231, 245);
  color: white;
  margin: 100px;
  background-color: #1751e462;
  border-radius: 10px;
}

.card-img-top-dentist {
  width: 80%;
  height: 60vh;
  margin-bottom: 2em;
  border-radius: 10px;
}
</style>
