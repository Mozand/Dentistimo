let Appointment = require("../models/Appointment");
let Dentist = require("../models/Dentist");
let User = require("../models/User");
let topic = "availability/#"; // Subscribe topics

let topicResponse1 = "ui/getappointments"; // Publish topics
let topicResponse2 = "ui/getuserappointments";
let topicResponse3 = "ui/deleteappointment";

function availabilitychecker(topic, payload) {
  console.log(payload.toString());

  if (topic == "availability/getappointments") {
    console.log("listen");
    Appointment.find(
      { dentist: payload.toString() },

      function (err, appointment) {
        if (err) {
          return err;
        }
        console.log("Appointments!!", appointment);

        let appointmentsJson = JSON.stringify(appointment);

        console.log("RESPONSE ", appointmentsJson);
        client.publish(
          topicResponse1,
          appointmentsJson,
          { qos: 1, retain: false },
          (error) => {
            if (error) {
              console.error(error);
            }
          }
        );
      }
    );
  } else if (topic == "availability/getuserappointments") {
    console.log("test");
    Appointment.find(
      { user: payload.toString() },
      function (err, appointments) {
        if (err) {
          return err;
        } else {
          console.log("userAppointment", appointments);
          let appointmentsJson = JSON.stringify(appointments);
          client.publish(
            topicResponse2,
            appointmentsJson,
            { qos: 1, retain: false },
            (error) => {
              if (error) {
                console.error(error);
              }
            }
          );
        }
      }
    ).populate("dentist");
  } else if (topic == "availability/deleteappointment") {
    console.log("delete requested");
    console.log(payload.toString());
    Appointment.deleteOne(
      { _id: payload.toString() },
      function (err, appointments) {
        if (err) {
          return err;
        } else {
          console.log("appointments", appointments);
          client.publish(
            topicResponse3,
            "Deleted",
            { qos: 1, retain: false },
            (error) => {
              if (error) {
                console.error(error);
              }
            }
          );
        }
      }
    );
  }
}

module.exports.availabilitychecker = availabilitychecker;
