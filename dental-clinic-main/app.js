const mqtt = require("mqtt");
const mongoose = require("mongoose");
const  DentistRetriever  = require("./controllers/dentistRetriever")
const  DentistByID  = require("./controllers/getDentist")

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

//MQTT CONNECTOR
let options = { clientId: "mqtt01", clean: true };

global.client = mqtt.connect("mqtt://localhost:1883", options);

let topic = "dentist/#";

client.on("connect", () => {
  console.log("Connected Now!!");
  client.subscribe([topic], () => {
    console.log(`Subscribed to ${topic}`);
  });
});

DentistRetriever.dentistsRetriever()

client.on("message", (topic, payload) => {
  console.log(payload.toString());
  DentistByID.getDentist(topic, payload);
});