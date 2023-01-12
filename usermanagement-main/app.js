const mqtt = require("mqtt");
const mongoose = require("mongoose");
let User = require("./models/User");

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

// //MQTT
let options = { clientId: "mqtt02", clean: true };

let client = mqtt.connect("mqtt://localhost:1883", options);
//let client = mqtt.connect("mqtt://localhost:1883", options);

module.exports = client;

client.on("connect", () => {
  console.log("Connected Now!!");
  client.subscribe("user/#", 1, (error, res) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log("Subscribed to ", res);
    }
  });
});


client.on("message", async (topic, payload) => {
  if (topic === "user/newUser") {
    console.log(payload.toString());

    var information = JSON.parse(payload)
    console.log(information, "info");
    var users = new User({
      username: information.username,
      password: information.password,
      Fname: information.Fname,
      Lname: information.Lname,
      birthdate: information.birthdate,
      sex: information.sex
    })
    console.log(users, "users")
    users.save();
    try {
      var id = users._id;
      var res = "User was created successfully"
      var UserErr = "user couldn't be created"
      const user = User.find({ _id: id })
      if (user !== null) {
        client.publish("ui/userCreated", res, 1, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log("user created")
          }
        })
      } else {
        client.publish("ui/UserError", UserErr, 1, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log("error message sent back")
          }
        })
      }

      console.log(users)
    }

    catch (error) {
      return (error)
    }
  } else if (topic === "user/updateUser") {
    console.log(payload.toString());

    var information = JSON.parse(payload)
    console.log(information, "info");
     let users = ({
      username: information.username,
      password: information.password,
      Fname: information.Fname,
      Lname: information.Lname,
    })
    let user = await User.findOneAndUpdate({_id: information.id}, users, {new: true});
      // user.username = information.username || user.username;
      // user.password = information.password || user.password;
      // user.Fname = information.Fname || user.Fname;
      // user.Lname = information.Lname || user.Lname

    console.log(user, "newUser")
    try {
      var id = information.id;
      var res = "User was updated successfully"
      var UserErr = "user couldn't update"
      const Targetuser = User.find({_id: id})
      if (Targetuser !== null) {
        client.publish("ui/userUpdated", res, 1, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log("user updated")
          }
        })
      } else {
        client.publish("ui/UserError", UserErr, 1, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log("error message sent back")
          }
        })
      }
    }

    catch (error) {
      return (error)
    }
  } else if (topic === "user/login") {
    console.log(payload.toString());
    var usernamePayload = JSON.parse(payload)
    var insertedUsername = usernamePayload.username;
    var insertedPassword = usernamePayload.password;
    try {
      const user = await User.findOne({ username: insertedUsername });
      if (user === null) {

        console.log("username error")
      }
      else if (insertedPassword !== user.password) {

        console.log("invalid pass")
      } else {
        let validatedUser = JSON.stringify(user)
        client.publish("ui/loginResponse", validatedUser, 1, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(validatedUser, 'ok');
          }
        });

      }

    } catch (error) {
      return next(error)
    }

  }
});
