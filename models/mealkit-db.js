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

var allMealKits = [
    {
      CategoryName: "Classic Meals",
      MealKits: [
        {
                title: "Salmon Fish SeaFood",
                includes: "braised long beans with tomato and garlic a shot",
                description:"roasted salmon served with fresh green beans, lemon wedges, tomatoes and garlic dipping",
                category: "Classic Meals",
                price: "$17.59",
                cookingTime: 15,
                servings: 3,
                caloriesPerServing: 208,
                imageUrl: "images/classic-1.jpg",
                topMeal: false
        },
        {
                title: "Asparagus Steak Veal",
                includes: "paired with stir-fry meat, tomatoes and balsamic vinegar",
                description:"crispy meat seasoned in tomatoes and asparagus",
                category: "Classic Meals",
                price: "$38.99",
                cookingTime: 25,
                servings: 2,
                caloriesPerServing: 20,
                imageUrl: "images/classic-2.jpg",
                topMeal: true
        },
        {
                title: "Fried Catfish",
                includes: "Served with corn bread, breaded in all new buttermilk coating",
                description:"Fried catfish with cornbread dipped with buttermilk and seasoned with cornmeal, southern tradition",
                category: "Classic Meals",
                price: "$19.79",
                cookingTime: 15,
                servings: 2,
                caloriesPerServing: 520,
                imageUrl: "images/classic-3.jpg",
                topMeal: false
            },
            {
                title: "Fried Egg Spinach Meatloaf",
                includes: "With roasted potatoes and spices",
                description:"Creamy spinach with fried eggs and crispy roasted potatoes served with Meatloaf",
                category: "Classic Meals",
                price: "$13.19",
                cookingTime: 80,
                servings: 4,
                caloriesPerServing: 294,
                imageUrl: "images/classic-4.jpg",
                topMeal: false
        }
      ]
    },
    {
      CategoryName: "Vegan Meals",
      MealKits: [
        {
                title: "Whole Wheat Bread with Coffee",
                includes: "Oats bread toast with peanut butter spread topped with fruits",
                description:"Nutrients enriched fruits with a hot cup of cappuccino",
                category: "Vegan Meals",
                price: "$11.99",
                cookingTime: 10, //cooking time for coffee and roasting the bread
                servings: 1,
                caloriesPerServing: 387,
                imageUrl: "images/vegan-1.jpg",
                topMeal: true     
            },
            {
                title: "Potato Soup",
                includes: "Potato soup with garlic and carrot",
                description:"Nourished with natural and fresh coriander, carrot and garlic",
                category: "Vegan Meals",
                price: "$5.78",
                cookingTime: 20,
                servings: 1,
                caloriesPerServing: 380,
                imageUrl: "images/vegan-2.webp",
                topMeal: false 
            },
            {
                title: "Pancakes",
                includes: "Maple Syrup and Raspberries",
                description:"Pancakes with sizzling maple syrup and raspberries",
                category: "Vegan Meals",
                price: "$6.79",
                cookingTime: 2,
                servings: 4,
                caloriesPerServing: 227,
                imageUrl: "images/vegan-3.jpg",
                topMeal: true 
        },
        {
            title: "Vegetarian meal",
            includes: "from broccoli, tomatoes and olives with rice",
            description:"Vegetarian meal from broccoli, tomatoes and olives with rice, served with healthy vegetables,",
            category: "Vegan Meals",
            price: "$15.39",
            cookingTime: 30,
            servings: 1,
            caloriesPerServing: 150,
            imageUrl: "images/vegan-4.jpg",
            topMeal: false 
        }
      ]
    }
  ];
  

  module.exports.getTopMeals = function () {
    var meals = []; //array that holds top meals in mealKits array

    for (var i = 0; i < allMealKits.length; i++) {
      for (var j = 0; j < allMealKits[i].MealKits.length; j++) {
       //if any top meal from meal kit is found, push it into meals array
        if (allMealKits[i].MealKits[j].TopMeal) {
          meals.push(allMealKits[i].MealKits[j]);
        }
      }
    }
    return meals;
  };

  module.exports.getMealsByCategory = function () {
    return allMealKits;
  };
  
  
  
  