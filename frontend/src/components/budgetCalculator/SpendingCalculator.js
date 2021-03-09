import React from "react";

import {
    FormControl,
    InputGroup
  } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/

  //Dedicated to the spending input of the budget calc screen.
const SpendingCalulator = ({ setUsersBudget, usersBudget }) => {
    return (
      <>
        <h4> Your Spending: </h4>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">£</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            onChange={(val) =>
              setUsersBudget({
                ...usersBudget,
                totalSpending: (val.target.value = 0
                  ? ""
                  : Number(val.target.value)),
              })
            }
            placeholder={"Please input a valid amount"}
            value={usersBudget.totalSpending}
          />
        </InputGroup>
      </>
    );
  };

  export default SpendingCalulator;