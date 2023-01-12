import client from "../app.js";
let client = require("../app.js");


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
      const user = User.find({ _id: id })
      if (user !== null) {
        publish("ui/userCreated", res, 1, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log("user created")
          }
        })
      }


      console.log(users)
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
        // return res.status(400).json({ message: "username or password is invalid" })
        console.log("username error")
      }
      else if (insertedPassword !== user.password) {
        // res.status(400).json({ message: "username or password is invalid" })
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
      // res.status(200).json({ message: "all ok", user })
    } catch (error) {
      return next(error)
    }

  }
  // console.log("User", users);

  // let usersJson = JSON.stringify(users);
  // client.publish(
  //   topicResponse,
  //   usersJson,
  //   { qos: 1, retain: false },
  //   (error) => {
  //     if (error) {
  //       console.error(error);
  //     }
  //   }
  // );
});