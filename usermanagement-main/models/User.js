const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    Fname: { type: String },
    Lname: { type: String },
    birthdate: { type: Date },
    sex: { type: String }
});
// var handleE11000 = function (error, res, next) {
//     if (error.code === 11000) {
//         next(new Error("Username can not be the same"))
//     } else {
//         next();
//     }
// }

module.exports = mongoose.model('User', userSchema);