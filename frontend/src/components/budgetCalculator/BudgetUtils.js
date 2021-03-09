//Using this file to keep the utils used - aka the calculations
import { getCurrentUserBudget, postNewBudget } from "../../actions/userBudget";

const calculateNewBudget = (
    studentFinanceIncome,
    totalIncome,
    totalSpending,
    duration
  ) => {
    //multiplying it by 4 to convert it into weeks, as it is a weekly bdudget
    const convertDurationToWeeks =
      duration.timescale === "MONTHLY" ? duration.number * 4 : duration.number;
  
    const calculation =
      (studentFinanceIncome + totalIncome - totalSpending) /
      convertDurationToWeeks;
  
    const convertCalculationToDouble = calculation.toFixed(2);
    
    console.log(calculation);
  
    return convertCalculationToDouble;
  
    //post once total is calculated then post it up
  };
  
  const saveNewCalculation = (usersBudget) => {
    //Saving the new calculation now
    postNewBudget(usersBudget);
  };

  export {
      calculateNewBudget,
      saveNewCalculation
  }