import React, { useEffect, useState } from "react";
//Use the use effect
// try and catch the userbudget with the id of the user - the profile redux connection wwill be useful here- like seen in profile.js
import { getCurrentUserBudget } from "../../actions/userBudget";
import Spinner from "../layout/CustomSpinner";
import { Card, Button, Jumbotron } from "react-bootstrap";

//based off the schema
const innitialState = {
  studentFinanceIncome: null,
  income: [],
  spending: [],
  duration: { number: null, timescale: "NONE" }, //
  totalBudget: null,
};

export const BudgetCalculator = () => {
  const [usersBudget, setUsersBudget] = useState(innitialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    //essentially everytime this components mounts, this will be called, therefore always maintaining and up to date version of user budget.
    // getCurrentUserBudget().then((data) => {
    //   //set the state to the data returned, if there was
    //   setUsersBudget(data);
    //   setIsLoading(false);
    //   console.log(data);
    // });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Jumbotron style={{ height: 100, marginBottom: 5, display: "flex" }}>
            <div>You have NUMBER budget per week for NUMBER months</div>
          </Jumbotron>
          <div>
            <div>
              {/* if user budget is null then return a calculator or something */}
              <h1> Income </h1>
            </div>

            <div>
              {/* if user budget is null then return a calculator or something */}
              <h1> Student Finance: £{usersBudget.studentFinanceIncome}</h1>
            </div>
          </div>
          <div>
            {/* if user budget is null then return a calculator or something */}
            <h1> Spending: </h1>
          </div>
          <div>
            {/* if user budget is null then return a calculator or something */}
            <h1> Duration: </h1>
          </div>
          This is the budget calculator
        </>
      )}
    </div>
  );
};

export default BudgetCalculator;
