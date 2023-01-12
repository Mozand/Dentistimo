let Dentist = require("../models/Dentist");

let topic = "dentist/#";
let topicResponse1 = "ui/dental-clinic";
let topicResponse2 = "ui/get-dental-clinic";

function getDentist(topic, payload) {

    if (topic == "dentist/getdentistbyId") {
        Dentist.findOne({ _id: payload.toString() }).exec(function (err, dentists) {
            if (err) {
                return next(err);
            }
            console.log("Dental Clinic", dentists);

            let dentistsJson = JSON.stringify(dentists);
            client.publish(
                topicResponse2,
                dentistsJson,
                { qos: 1, retain: false },
                (error) => {
                    if (error) {
                        console.error(error);
                    }
                }
            );
        });
    } else if (topic == "dentist/getAllDentists") {
        Dentist.find(function (err, dentists) {
            if (err) {
                return next(err);
            }

            console.log("Dental Clinic", dentists);

            let dentistsJson = JSON.stringify(dentists);
            client.publish(
                topicResponse1,
                dentistsJson,
                { qos: 1, retain: false },
                (error) => {
                    if (error) {
                        console.error(error);
                    }
                }
            );
        });
    }
}
module.exports.getDentist = getDentist;