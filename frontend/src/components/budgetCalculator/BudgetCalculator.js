import React, { useEffect, useState } from "react";
//Use the use effect
// try and catch the userbudget with the id of the user - the profile redux connection wwill be useful here- like seen in profile.js
import { getCurrentUserBudget } from "../../actions/userBudget";
import Spinner from "../layout/CustomSpinner";
import { Card, Button, Jumbotron, Accordion } from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";
import ToolTip from "../layout/ToolTip";

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
    setIsLoading(true);
    // essentially everytime this components mounts, this will be called, therefore always maintaining and up to date version of user budget.
    getCurrentUserBudget().then((data) => {
      //set the state to the data returned, if there was
      setUsersBudget(data);
      setIsLoading(false);
      console.log(data);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>

<Accordion defaultActiveKey="0">
            <Card style={{marginBottom: 5}}>
              <Card.Header style={{padding: 0}}>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Current Budget
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <div style={{textAlign: 'center',  padding: 5}}>
                    You have £{usersBudget.totalBudget} budget per week for {usersBudget.duration.number} {usersBudget.duration.timescale}
                  </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <div>
            <div>
              {/* if user budget is null then return a calculator or something */}
              <h2> Income </h2>
            </div>

            <div>
              {/* if user budget is null then return a calculator or something */}
              <h4> Student Finance: £{usersBudget?.studentFinanceIncome}</h4>
            </div>
          </div>
          <div>
            {/* if user budget is null then return a calculator or something */}
            <h2> Spending: </h2>
          </div>
          <div>
            {/* if user budget is null then return a calculator or something */}
            <h2> Duration: </h2>
          </div>

          <Button>Calculate new Budget</Button>


          <div
            style={{
                borderBottom: `solid ${colorScheme.blue}`,
                marginBottom: 4,
                padding: 2
            }}
          />

          <div> 
            {/* if user budget is null then return a calculator or something */}
            <h2> Custom budget:  </h2>
            <ToolTip/>
          </div>




        </>
      )}
    </div>
  );
};

export default BudgetCalculator;
