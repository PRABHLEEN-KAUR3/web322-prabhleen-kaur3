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

module.exports = router;