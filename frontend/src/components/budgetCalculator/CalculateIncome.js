import React from "react";
import {
    FormControl,
    InputGroup,
  } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/

const CalculateIncome = ({ setUsersBudget, usersBudget }) => {
    return (
      <>
        <h4> Your Income </h4>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">£</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            onChange={(val) =>
              setUsersBudget({
                ...usersBudget,
                totalIncome: (val.target.value = 0
                  ? ""
                  : Number(val.target.value)),
              })
            }
            placeholder={"Please input a valid amount"}
            value={usersBudget.totalIncome}
          />
        </InputGroup>
      </>
    );
  };

  export default CalculateIncome;