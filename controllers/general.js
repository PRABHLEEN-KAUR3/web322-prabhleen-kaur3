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
const express = require('express');
const router = express.Router();
const app = express();

//local module
const modelMeal_db = require("../models/mealkit-db");

router.get("/", (req, res) => {
    res.render("general/home", {
    kits: modelMeal_db.getTopMeals(),
     title: "Home Page",
    });
});
  
router.get("/Menu", (req, res) => {
    res.render("general/menu", {
      kits: modelMeal_db.getMealsByCategory(),
      title: "Menu Page",
    });
});

router.get("/Registration", (req,res) => {
  res.render("general/registration");
});

router.get("/Login", (req,res) => {
  res.render("general/login");
});

router.get("/Welcome", (req,res) => {
  res.render("welcome");
})
router.post("/Login", (req, res) => {

  console.log(req.body);
  const { email, password } = req.body;

  let passedValidation = true;
  let validationMessages = {};

  if(email.trim().length === 0){
    passedValidation = false;
    validationMessages.email = "*** Required Field *** Please fill in your email address."
  }
  if(password.trim().length === 0){
      passedValidation=false;
      validationMessages.password = "*** Required Field *** Please fill in your Password."
  }
  
  if(passedValidation === true){
      res.send("Success");
  }
  else{ 
      res.render("general/Login", {
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
  var pswd=/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

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
  if(!password.match(pswd)){
      passedValidation=false;
      validationMessages.password = "*** Fill in valid Password *** "
  }
  
  if(passedValidation){
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.sendGrid_API_KEY);

    const mail = {
        to: `${email}`,
        from: "prabhleen-kaur3@myseneca.ca",
        subject: "Registration Form Submission",
        html: ` Hello ${lastName}, <br><br>  <b>---- Welcome to GrabHub ----<b><br>
            Full Name: ${firstName} ${lastName}<br>
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

            res.render("general/registration", {
                title: "Registration Page",
                values: req.body,
                validationMessages
            });
        });
  }
  else{ 
      res.render("general/registration", {
          title: "Registration Page",
          values: req.body,
          validationMessages
      });
    }
});

module.exports = router;