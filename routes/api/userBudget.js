//Required packages imported
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// const { check, validationResult } = require("express-validator");
const { json } = require("express");

//Required modules which will be used in the api callas imported below.
const UserBudget = require("../../models/UserBudget");

//URL consts
const postUserBudgetUrl = "/";
const getUserBudgetUrl = "/me";

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// I used this tutorial for the basics of API development to implement my own functionality for features such as this user budget.
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------


// @route    POST api/userBudget
// @desc     post userBudget of the user
// @access   Private
router.post(postUserBudgetUrl, auth, async (req, res) => {
  const { studentFinanceIncome, income, spending, duration, totalBudget, totalIncome, totalSpending, isCustom } = req.body;

  //Build user budget object
  const userBudgetFields = {};

  userBudgetFields.user = req.user.id;
  if (studentFinanceIncome)
  userBudgetFields.studentFinanceIncome = studentFinanceIncome;
  if (income) userBudgetFields.income = income;
  if (spending) userBudgetFields.spending = spending;
  if (duration) userBudgetFields.duration = duration;
  if (totalBudget) userBudgetFields.totalBudget = totalBudget;
  if (totalIncome) userBudgetFields.totalIncome = totalIncome;
  if (totalSpending) userBudgetFields.totalSpending = totalSpending;
  if (isCustom) userBudgetFields.isCustom = isCustom;

  try {
    let userBudget = await UserBudget.findOne({ user: req.user.id });

    if (userBudget) {
      //If there is a userbudget, update the userbudget.
      userBudget = await UserBudget.findOneAndUpdate(
        { user: req.user.id },
        { $set: userBudgetFields },
        { new: true }
      );

      return res.json(userBudget);
    }

    //Create new userBudget
    userBudget = new UserBudget(userBudgetFields);

    await userBudget.save();
    return json(userBudget);
  } catch (error) {
    console.error(error.message);
    // error 500 = server error
    res.status(500).send("Server Error");
  }
});

// @route    GET api/userBudget/me
// @desc     get user preferences of the user
// @access   Private
router.get(getUserBudgetUrl, auth, async (req, res) => {

  try {
    const userBudget = await UserBudget.findOne({
      user: req.user.id,
    });

    if (!userBudget) {
      //400 = bad request
      return res
        .status(400)
        .json({ msg: "There is no user budget for this user" });
    }

    res.json(userBudget); //Returns the user budget as the response.
  } catch (error) {
    console.error(error.message);
    //500 = server error
    res.status(500).send("Server Error");
  }

});

module.exports = router;
