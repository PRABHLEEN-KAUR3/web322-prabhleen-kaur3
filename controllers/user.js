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
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();
const userModel = require("../models/user");
const session = require("express-session");
const app = express();

router.get("/Login", (req,res) => {
    res.render("user/login");
});

router.get("/Registration", (req,res) => {
    res.render("user/registration");
});

  router.get("/welcome", (req,res) => {
    res.render("user/welcome");
});


router.post("/Login", (req, res) => {

    console.log(req.body);
    const { email, password } = req.body;
  
    let passedValidation = true;
    let validationMessages = {};
    let errors = [];
  
    //Regular expression for email from: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    var form = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //Regular expression for password from: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    var pswd=/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,12}$/;  
  
    if(!email.match(form) || email.trim().length === 0){
      passedValidation = false;
      validationMessages.email = "*** Required Field *** Please fill in a valid email address."
    }
    if(!password.match(pswd) || password.trim().length === 0){
        passedValidation=false;
        validationMessages.password = "*** Fill in valid Password *** "
    }
        
    if(passedValidation){
    // Search MongoDB for a document with matching email address.
    userModel.findOne({
      email: req.body.email
    })
      .then(user => {
          // Completed the search.
          if (user) {
              // Found the user document.
              // Compare the password supplied by the user with the one in our document.
              bcrypt.compare(req.body.password, user.password)
              .then(isMatched => {
                  if (isMatched) {
                     req.session.user = user;
                     req.session.isClerk = req.body.clerk === "clerk";
                     if(req.session.isClerk == true){
                       res.redirect("/clerk");
                     }
                     else if(req.session.isClerk == false){
                       res.redirect("/customer");
                     }
                     else{
                       res.redirect("/login");
                     }
                  }
                  else {
                      // Passwords are different.
                      console.log("*** Password Match NOT FOUND ***")
                      errors.push("*** Password Match NOT found in our Database ***");

                      res.render("user/login", {
                          errors
                      });
                  }
              })
          }
          else {
              console.log("*** User NOT FOUND in the database");
              errors.push("*** EMAIL NOT FOUND ***");
              res.render("user/login", {
                  errors
              });
          }
      })
      .catch(err => {
          console.log(`*** ERROR *** Couldn't find the email in database ... ${err}`);
          errors.push("*** Oops, something went wrong!! Try Again");

          res.render("user/login", {
              errors
          });
      });
    }

    else{ 
        res.render("user/login", {
            title: "Login Page",
            values: req.body,
            validationMessages
        });
  }  
});

router.post("/Registration", (req,res) => {
    console.log(req.body);
  
    const { firstName, lastName, email, password } = req.body;
  
    let passedValidation = true;
    let validationMessages = {};
  
    //Regular expression for email from: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    var form = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //Regular expression for password from: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    var pswd=/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,12}$/;
  
    if(typeof firstName !== 'string' || firstName.trim().length === 0){
      passedValidation = false;
      validationMessages.firstName = "*** Required Field *** Please enter a valid First Name";  
    }
    else if(typeof firstName !== 'string' || firstName.trim().length <= 2){
      passedValidation = false;
      validationMessages.firstName = "Your first name must have atleast 3 characters";  
    }
    if(typeof lastName !== 'string' || lastName.trim().length === 0){
      passedValidation = false;
      validationMessages.lastName = "*** Required Field *** Please enter a valid Last Name";  
    }
    else if(typeof lastName !== 'string' || lastName.trim().length <= 1){
      passedValidation = false;
      validationMessages.lastName = "Your first name must have atleast 2 characters";  
    }
    if(!email.match(form) || email.trim().length === 0){
      passedValidation = false;
      validationMessages.email = "*** Required Field *** Please fill in a valid email address."
    }
    if(!password.match(pswd) || password.trim().length === 0){
        passedValidation=false;
        validationMessages.password = "*** Fill in valid Password *** "
    }
    
    if(passedValidation){

        const user = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
    
        user.save()
        .then((userSaved) => {
            console.log(`User ${userSaved.firstName} has been added to the database.`);
            res.redirect("/welcome");
        })
        .catch((err) =>{ 
            console.log(`Error adding user to the database ... ${err}`);
            res.redirect("/");
        });

      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.sendGrid_API_KEY);
  
      const mail = {
          to: `${email}`,
          from: "prabhleen-kaur3@myseneca.ca",
          subject: "Registration Form Submission",
          html: ` Hello ${lastName}, <br><br>  <b>---- Welcome to GrabHub ----</b><br>
              Full Name: <i>${firstName} ${lastName}</i><br>
              Email Address: ${email}<br><br>
              Thank you for visiting our site<br>
              Prabhleen Kaur<br>
              GrabHub`        
      };
  
      sgMail.send(mail)
          .then(() => {
            res.redirect("/welcome");
          })
          .catch(err => {
              console.log(`Error ${err}`);
  
              res.render("user/registration", {
                  title: "Registration Page",
                  values: req.body,
                  validationMessages
              });
          });
    }
    else{ 
        res.render("user/registration", {
            title: "Registration Page",
            values: req.body,
            validationMessages
        });
      }
  });

router.get("/clerk", (req,res) => {
  if(req.session.isClerk == true){
    res.render("user/clerk");
  }
  else{
    res.redirect("/login");
  }
});

router.get("/customer", (req, res) => {
    if(req.session.isClerk == false){
      res.render("user/customer");
    }
    else{
      res.redirect("/login");
    }
  });

  router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/user/login");
});
  
  module.exports = router;