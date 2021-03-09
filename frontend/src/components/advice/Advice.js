import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

import Separator from "../layout/Separator";

//This file is dedicated to the 'Advice' screen in the application, where students could potentially learn how to recycle and store their food.
//This is hard coded as an example as added last minute to consider social and ethical considerations.
//Might not be something that students want, but could be used to get feedback.

export const Advice = () => {
  return (
    <div style={{ marginTop: 20, padding: 10 }}>
      <h2 style={{ color: "white", fontWeight: "bold" }}>
        Learn How To Take Care Of Our Environment!
      </h2>

      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Reduce
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <a target="_blank" href="https://www.recyclenow.com/">
                Learn More!!
              </a>
              {/* https://www.recyclenow.com/ */}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Reuse
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <a target="_blank" href="https://www.recyclenow.com/">
                Learn More!!
              </a>
              {/* https://www.recyclenow.com/ */}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Recycle
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <a target="_blank" href="https://www.recyclenow.com/">
                Learn More!!
              </a>
              {/* https://www.recyclenow.com/ */}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Separator />

      <h2 style={{ color: "white", fontWeight: "bold" }}>
        What is the best storage for your food?
      </h2>
      <p>This will be for storage advice</p>
    </div>
  );
};

export default Advice;
