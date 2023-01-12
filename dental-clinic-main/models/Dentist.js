const mongoose = require("mongoose");

const DentistSchema = new mongoose.Schema({
  id: Number,
  name: String,
  owner: String,
  denstists: Number,
  address: String,
  city: String,
  coordinate: {
    longitude: Number,
    Latitude: Number,
  },
  openinghours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
  },
});
module.exports = mongoose.model("Dentist", DentistSchema);
