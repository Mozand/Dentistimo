<template>
  <div>
    <GmapMap :center="center" :zoom="14" :clickable="true" class="map">
      <GmapMarker
        :key="index"
        v-for="(dentist, index) in dentists"
        :position="dentist.coordinate"
        @click="toggleWindow(index)"
        :icon="dentalIcon()"
      >
        <gmap-info-window
          :options="{
            maxWidth: 300,
            pixelOffset: { width: 0, height: 0 },
            content: setContent(dentist),
          }"
          :position="infoWindow.position"
          :opened="infoWindow.open === index"
        >
          <div v-html="infoWindow.template"></div>
        </gmap-info-window> </GmapMarker
    ></GmapMap>
  </div>
</template>
<script>
import { gmapApi } from "gmap-vue";
export default {
  computed: {
    google: gmapApi,
  },
  name: "GoogleMap",
  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825,
      },
      infoWindow: {
        open: false,
        content: "",
      },
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
        topic: "dentist/getAllDentists",
        qus: 1,
        payload: '{"msg":"hello"}',
      },
      dentists: [],
    };
  },
  mounted() {
    this.locateGeoLocation();
    this.sendMessage();
    console.log(localStorage);
  },
  destroyed() {},
  methods: {
    dentalIcon() {
      return "/images/denal-icon.png";
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };
      });
    },
    sendMessage() {
      let { topic, qos, payload } = this.publish;
      this.$client.publish(topic, payload, qos, (error) => {
        console.log("Step 1 Publish");
        if (error) {
          console.log(error);
        }
      });

      this.$client.on("message", (topic, payload) => {
        console.log(topic, payload.toString());
        if (topic == "ui/dental-clinic") {
          let response = JSON.parse(payload);
          this.dentists = response;
        }
        console.log("ARRAY: ", this.dentists);
      });
    },
    toggleWindow(index) {
      this.infoWindow.open = this.infoWindow.open === index ? null : index;
    },
    setContent(dentist) {
      this.content = `<div class="card text-white mb-3" style="max-width: 10rem;">
                      <a class="card-text" href="dentist/${dentist._id}">${dentist.name}</a>
                      <img src="https://picsum.photos/200" class="infowindow-img">
                      </div>`;
      return this.content;
    },
  },
};
</script>
<style>
.info-content {
  padding: 5px;
  color: rgb(255, 255, 255);
  font-size: 100%;
  background-color: rgba(24, 96, 104, 0.9);
  border-radius: 5px;
  text-decoration: none;
}

.infowindow-img {
  width: 40%;
  margin: 5px auto;
}
.map {
  width: 90%;
  height: 80vh;
  margin-left: 5em;
  margin-top: 3em;
  
}

</style>
