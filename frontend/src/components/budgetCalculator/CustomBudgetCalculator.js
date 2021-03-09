import React from "react"; 
import {calculateNewBudget, saveNewCalculation} from './BudgetUtils';
import ToolTip from "../layout/ToolTip";

import {
  Card,
  Button,
  Accordion,
  FormControl,
  InputGroup,
} from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/

//This is dedicated to the custom budget section of the budget screen - so users can customise a budget if they dont like the calculator option

const CustomBudgetCalculator = ({ usersBudget, setUsersBudget }) => {
    const isCustom = usersBudget.isCustom === true ? usersBudget.totalBudget : "";
  
    return (
      <>
        <div>
          <div style={{ display: "flex" }}>
            <h2> Custom budget: </h2>
            <ToolTip />
          </div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">£</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              onChange={(val) =>
                setUsersBudget({
                  ...usersBudget,
                  isCustom: true,
                  totalBudget: (val.target.value = 0
                    ? ""
                    : Number(val.target.value)),
                })
              }
              placeholder={"Please input a valid amount"}
              value={isCustom}
            />
            <InputGroup.Prepend>
              <Button
                onClick={() => {
                  // const totalBudgetReCalc = calculateNewBudget(usersBudget.studentFinanceIncome, usersBudget.totalIncome, usersBudget.totalSpending, usersBudget.duration);
                  saveNewCalculation({ ...usersBudget, isCustom: true });
                  setUsersBudget({ ...usersBudget, isCustom: true });
                }}
              >
                Use Custom Budget
              </Button>
            </InputGroup.Prepend>
          </InputGroup>
        </div>
        {/* <Button
            onClick={() => {
              // const totalBudgetReCalc = calculateNewBudget(usersBudget.studentFinanceIncome, usersBudget.totalIncome, usersBudget.totalSpending, usersBudget.duration);
              saveNewCalculation({...usersBudget, isCustom: true});
              setUsersBudget({...usersBudget, isCustom: true});
              }}
  
  >Use Custom Budget</Button> */}
      </>
    );
  };

  export default CustomBudgetCalculator;