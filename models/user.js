/************************************************************************************
* WEB322 â€“ Project (Winter 2022)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Prabhleen Kaur
* Student ID: 146094206
* Course/Section: WEB322/NDD
*
************************************************************************************/ 
//Took reference from course notes tutored during class lectures: https://github.com/nick-romanidis/web322-2221/tree/main/week-9

//Define the User Schema
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.pre("save", function (next) {
    let user = this;
    // Generate a unique SALT.
    bcrypt.genSalt(10)
        .then(salt => {
            bcrypt.hash(user.password, salt)
                .then(hashedPwd => {
                      user.password = hashedPwd;
                    next();
                })
                .catch(err => {
                    console.log(`*** Hashing FAILED *** due to error ... ${err}`);
                });
        })
        .catch(err => {
            console.log(`*** SALTING ERROR *** ... ${err}`);
        });
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
