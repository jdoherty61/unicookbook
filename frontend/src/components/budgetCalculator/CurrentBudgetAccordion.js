
import React from "react";

import {
    Card,
    Accordion,
  } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/

import colorScheme from "../../styles/mainColorPallete";

//This component is dedicated to the card like accordion that sticks to the top of the budget calculator screen - which shows the current budget
//time scale.

const CurrentBudgetAccordion = ({ usersBudget }) => {
    // const colourOfTotal = usersBudget.totalBudget > 0 ? colorScheme.successfulGreen : colorScheme.warningColour;
    const colourOfTotal = usersBudget.totalBudget > 0 ? colorScheme.successfulGreen : colorScheme.warningColour;
    const timescale = usersBudget.duration.timescale === "MONTHLY" ? "month(s)" : "week(s)";
  
    return (
      <Accordion defaultActiveKey="0">
        <Card style={{ marginBottom: 5 }}>
          <Card.Header style={{ padding: 0 }}>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              Current Budget
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div style={{ textAlign: "center", padding: 5 }}>
                  You have a{" "}
                  <span
                    style={{
                      color: colourOfTotal,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    £{usersBudget.totalBudget}
                  </span>{" "}
                  budget per week for{" "}
                  <span style={{ fontWeight: "bold", fontSize: 20 }}>
                    {usersBudget.duration.number} {timescale}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  };

  export default CurrentBudgetAccordion;