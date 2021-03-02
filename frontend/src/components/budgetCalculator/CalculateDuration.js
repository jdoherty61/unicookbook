import React, { useState } from "react";
import {
    Card,
    Button,
    Accordion,
    FormControl,
    InputGroup,
  } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/ 

import colorScheme from "../../styles/mainColorPallete";

const CalculateDuration = ({ setUsersBudget, usersBudget }) => {
    const [buttonState, setButtonState] = useState({isMonthly: false, isWeekly: false});
    
    const monthlyButtonColour = buttonState.isMonthly ? colorScheme.blue : 'grey';
    const weeklyButtonColour = buttonState.isWeekly ? colorScheme.blue : 'grey';
  
    return (
      <>
        <h4> Duration: </h4>
        <InputGroup className="mb-3">
          <FormControl
            type="number"
            onChange={(val) =>
              setUsersBudget({
                ...usersBudget,
                duration: {
                  ...usersBudget.duration,
                  number: (val.target.value = 0 ? "" : Number(val.target.value)),
                },
              })
            }
            placeholder={"Please input a valid amount"}
            value={usersBudget.duration.number}
          />
          <InputGroup.Prepend>
            <Button
            style={{backgroundColor: weeklyButtonColour}}
              onClick={() => {
                setButtonState({isMonthly: false, isWeekly: true})
                setUsersBudget({
                  ...usersBudget,
                  duration: {
                    ...usersBudget.duration,
                    timescale: "WEEKLY",
                  },
                })
              }}
            >
              Weeks
            </Button>
          </InputGroup.Prepend>
          <InputGroup.Prepend>
            <Button
             style={{backgroundColor: monthlyButtonColour}}
              onClick={() => {
                setButtonState({isMonthly: true, isWeekly: false})
                setUsersBudget({
                  ...usersBudget,
                  duration: {
                    ...usersBudget.duration,
                    timescale: "MONTHLY",
                  },
                })
              }}
            >
              Months
            </Button>
          </InputGroup.Prepend>
        </InputGroup>
      </>
    );
  };

  export default CalculateDuration;