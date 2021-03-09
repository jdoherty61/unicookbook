//Required Imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/

//Custom created components/imports
import Spinner from "../layout/CustomSpinner";
import Separator from "../layout/Separator";

import CurrentBudgetAccordion from './CurrentBudgetAccordion';
import CalculateDuration from './CalculateDuration';
import CalculateStudentFinance from './CalculateStudentFinance';
import CalculateIncome from './CalculateIncome';
import SpendingCalulator from './SpendingCalculator';
import CustomBudgetCalculator from './CustomBudgetCalculator';

// Utils etc. 
// pulling in APIs
import { getCurrentUserBudget } from "../../actions/userBudget";
import {calculateNewBudget, saveNewCalculation} from './BudgetUtils';

//based off the schema - given an innitial state when initial load, as this will hopefully prevent system error if there is a fullover.
const innitialState = {
  studentFinanceIncome: null,
  income: [],
  spending: [],
  duration: { number: null, timescale: "NONE" },
  totalBudget: null,
  totalIncome: null,
  totalSpending: null,
  isCustom: false,
};

//This component is dedicated to the calculator screen. There are multiple components inside this component - the nature of react
//The components inside this function should be able to be found in the budgetCalculator parent directory
export const BudgetCalculator = () => {
  const [usersBudget, setUsersBudget] = useState(innitialState);
  const [isLoading, setIsLoading] = useState(false);

  //MAKE A STATE FOR THE USER FORM TO FILL OUT - caught in manual functional testing

  useEffect(() => {
    setIsLoading(true);
    // essentially everytime this components mounts, this will be called, therefore always maintaining and up to date version of user budget.
    getCurrentUserBudget().then((data) => {
      //set the state to the data returned, if there was
      setUsersBudget(data);
      setIsLoading(false);
      // console.log(data);
    });
  }, []);

  // console.log(usersBudget);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CurrentBudgetAccordion usersBudget={usersBudget} />
          <CalculateDuration
            usersBudget={usersBudget}
            setUsersBudget={setUsersBudget}
          />
          <CalculateStudentFinance
            usersBudget={usersBudget}
            setUsersBudget={setUsersBudget}
          />
          <CalculateIncome
            usersBudget={usersBudget}
            setUsersBudget={setUsersBudget}
          />
          <SpendingCalulator
            usersBudget={usersBudget}
            setUsersBudget={setUsersBudget}
          />
          <Button
            onClick={() => {
              const totalBudgetReCalc = calculateNewBudget(
                usersBudget.studentFinanceIncome,
                usersBudget.totalIncome,
                usersBudget.totalSpending,
                usersBudget.duration
              );
              saveNewCalculation({
                ...usersBudget,
                totalBudget: totalBudgetReCalc,
              });
              setUsersBudget({
                ...usersBudget,
                totalBudget: totalBudgetReCalc,
              });
            }}
          >
            Calculate New Budget
          </Button>

          <Separator />
          
          <CustomBudgetCalculator
            usersBudget={usersBudget}
            setUsersBudget={setUsersBudget}
          />
        </>
      )}
    </div>
  );
};

export default BudgetCalculator;
