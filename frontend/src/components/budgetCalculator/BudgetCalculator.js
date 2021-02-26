import React, { useEffect, useState } from "react";
//Use the use effect
// try and catch the userbudget with the id of the user - the profile redux connection wwill be useful here- like seen in profile.js
import { getCurrentUserBudget, postNewBudget } from "../../actions/userBudget";
import Spinner from "../layout/CustomSpinner";
import {
  Card,
  Button,
  Jumbotron,
  Accordion,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";
import ToolTip from "../layout/ToolTip";

//based off the schema
const innitialState = {
  studentFinanceIncome: null,
  income: [],
  spending: [],
  duration: { number: null, timescale: "NONE" },
  totalBudget: null,
  totalIncome: null,
  totalSpending: null,
  isCustom: false
};

const calculateNewBudget = (studentFinanceIncome, totalIncome, totalSpending, duration) => {

  //multiplying it by 4 to convert it into weeks, as it is a weekly bdudget
  const convertDurationToWeeks = duration.timescale === 'MONTHLY' ? duration.number * 4 : duration.number;

  const calculation = ((studentFinanceIncome + totalIncome) - (totalSpending) ) / convertDurationToWeeks;


  console.log(calculation);

  return calculation;
  
  //post once total is calculated then post it up
};

const saveNewCalculation = (usersBudget) => { 
  //Saving the new calculation now
  postNewBudget(usersBudget);
};

export const BudgetCalculator = () => {
  const [usersBudget, setUsersBudget] = useState(innitialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // essentially everytime this components mounts, this will be called, therefore always maintaining and up to date version of user budget.
    getCurrentUserBudget().then((data) => {
      //set the state to the data returned, if there was
      setUsersBudget(data);
      setIsLoading(false);
      console.log(data);
    });
  }, []);

  console.log(usersBudget);

  const isCustom = usersBudget.isCustom === true ? usersBudget.totalBudget : '';

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Accordion defaultActiveKey="0">
            <Card style={{ marginBottom: 5 }}>
              <Card.Header style={{ padding: 0 }}>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Current Budget
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div style={{ textAlign: "center", padding: 5 }}>
                      You have £{usersBudget.totalBudget} budget per week for{" "}
                      {usersBudget.duration.number}{" "}
                      {usersBudget.duration.timescale}
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <div>
            <h4> Duration: </h4>
            {/* we could change this to a input group with two buttons at the end of it! */}
            <InputGroup className="mb-3">
              <FormControl
                type="number"
                onChange={(val) =>
                  setUsersBudget({
                    ...usersBudget,
                    duration: {
                      ...usersBudget.duration,
                      number: val.target.value,
                    },
                  })
                }
                placeholder={"Please input a valid amount"}
                value={usersBudget.duration.number}
              />
              <InputGroup.Prepend>
                <Button
                  onClick={() =>
                    setUsersBudget({
                      ...usersBudget,
                      duration: {
                        ...usersBudget.duration,
                        timescale: "WEEKLY",
                      },
                    })
                  }
                >
                  Weeks
                </Button>
              </InputGroup.Prepend>
              <InputGroup.Prepend>
                <Button
                  onClick={() =>
                    setUsersBudget({
                      ...usersBudget,
                      duration: {
                        ...usersBudget.duration,
                        timescale: "MONTHLY",
                      },
                    })
                  }
                >
                  Months
                </Button>
              </InputGroup.Prepend>
            </InputGroup>
          </div>


          <div>
            <div>
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
                      studentFinanceIncome: Number(val.target.value),
                    })
                  }
                  placeholder={"Please input a valid amount"}
                  value={usersBudget.studentFinanceIncome}
                />
              </InputGroup>
            </div>




            <div>
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
                      totalIncome: Number(val.target.value),
                    })
                  }
                  placeholder={"Please input a valid amount"}
                  value={usersBudget.totalIncome}
                />
              </InputGroup>
            </div>
          </div>
          <div>
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
                    totalSpending: Number(val.target.value),
                  })
                }
                placeholder={"Please input a valid amount"}
                value={usersBudget.totalSpending}
              />
            </InputGroup>
          </div>
        

          <Button
          onClick={() => {
            const totalBudgetReCalc = calculateNewBudget(usersBudget.studentFinanceIncome, usersBudget.totalIncome, usersBudget.totalSpending, usersBudget.duration);
            saveNewCalculation({...usersBudget, totalBudget: totalBudgetReCalc});
            setUsersBudget({...usersBudget, totalBudget: totalBudgetReCalc});
            }}
            >
            Calculate New Budget</Button>

          <div
            style={{
              borderBottom: `solid ${colorScheme.blue}`,
              marginBottom: 4,
              marginTop: 4,
              padding: 2,
            }}
          />

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
                    totalBudget: Number(val.target.value),
                  })
                }
                placeholder={"Please input a valid amount"}
                value={isCustom}
              />
            </InputGroup>
          </div>
          <Button
                    onClick={() => {
                      // const totalBudgetReCalc = calculateNewBudget(usersBudget.studentFinanceIncome, usersBudget.totalIncome, usersBudget.totalSpending, usersBudget.duration);
                      saveNewCalculation({...usersBudget, isCustom: true});
                      setUsersBudget({...usersBudget, isCustom: true});
                      }}
          
          >Use Custom Budget</Button>
        </>
      )}
    </div>
  );
};

export default BudgetCalculator;
