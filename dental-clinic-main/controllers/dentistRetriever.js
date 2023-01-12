const https = require("https");
let Dentist = require("../models/Dentist");

let url =
    "https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json";
    
let result = [];

function dentistsRetriever() {
    https
        .get(url, (res) => {
            let body = "";

            res.on("data", (data) => {
                body += data;
            });

            res.on("end", () => {
                try {
                    let json = JSON.parse(body);
                    console.log(json);
                    result = json.dentists;
                    console.log(result);

                    result.forEach(function (element) {
                        console.log("This is an element: ", element);

                        Dentist.find({ name: element.name }, function (err, dentists) {
                            if (err) {
                                return "Error!";
                            }

                            if (dentists.length == 0) {
                                let newdentist = new Dentist(element);

                                newdentist.save(function (err, newdentistsaved) {
                                    console.log("Dentist saved: ", newdentistsaved);
                                    if (err) {
                                        return "Error!";
                                    }
                                });
                            }
                        });
                    });
                } catch (error) {
                    console.error(error.message);
                }
            });
        })
        .on("error", (error) => {
            console.error(error.message);
        });
}

module.exports.dentistsRetriever = dentistsRetriever;