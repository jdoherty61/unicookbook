import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/

import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
import colorScheme from "../../styles/mainColorPallete";

import HomeTabs from "./HomeTabs";

const StyledButton = styled(Button)`
  height: 115px;
  width: 115px;
  background-color: ${colorScheme.blue};
  box-shadow: 5px 5px 10px -4px ${colorScheme.shadow};
`;

// Component is the home screen (AKA the first they will see when they sign in. Comprised up of components such as buttons, tabs and a spinner etc)
const Home = (props) => {
  const history = useHistory();

  return (
    <>
      <HomeTabs />
      <div style={{ display: "flex", marginTop: 25 }}>
        <StyledButton onClick={() => history.push("/promotions")}>
          Promotions
        </StyledButton>
        <StyledButton onClick={() => history.push("/filter")}>
          User Preferences
        </StyledButton>
        <StyledButton>Liked Recipes</StyledButton>
      </div>
      <Button
        style={{
          marginTop: 10,
          boxShadow: `5px 5px 10px -4px ${colorScheme.shadow}`,
        }}
        variant="primary"
        size="lg"
        block
        onClick={() => history.push("/advice")}
      >
        Advice
      </Button>
    </>
  );
};

export default Home;
