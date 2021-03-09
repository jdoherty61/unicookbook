import React from "react";

import {
  FormControl,
  InputGroup,
} from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/

//Component created to take in the student finance income left off the student
const CalculateStudentFinance = ({ setUsersBudget, usersBudget }) => {
    return (
      <>
        <h4> Student Finance: </h4>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">£</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            onChange={(val) =>
              setUsersBudget({
                ...usersBudget,
                studentFinanceIncome: (val.target.value = 0
                  ? ""
                  : Number(val.target.value)),
              })
            }
            placeholder={"Please input a valid amount"}
            value={usersBudget.studentFinanceIncome}
          />
        </InputGroup>
      </>
    );
  };

  export default CalculateStudentFinance;