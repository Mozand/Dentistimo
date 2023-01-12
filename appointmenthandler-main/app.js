const mqtt = require("mqtt");
const mongoose = require("mongoose");
const availabilitycontroller = require("./controllers/availabilitycontroller");

let mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://userone:123@cluster0.izgcz.mongodb.net/Dit355?retryWrites=true&w=majority";

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
      console.error(err.stack);
      process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
  }
);

let topic = "availability/#"; // Subscribe topics

//MQTT
let options = { clientId: "mqtt05", clean: true };
global.client = mqtt.connect("mqtt://localhost:1883", options);

client.on("connect", () => {
  console.log("Connected Now!!");
  client.subscribe([topic], () => {
    console.log(`Subscribed to ${topic}`);
  });
});

client.on("message", (topic, payload) => {
  availabilitycontroller.availabilitychecker(topic, payload);
});
