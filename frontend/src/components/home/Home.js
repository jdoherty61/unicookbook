import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import colorScheme from "../../styles/mainColorPallete";
import { Button } from "react-bootstrap";

const StyledTab = styled(Tabs)`
  color: ${colorScheme.orange};

  .react-tabs__tab--selected {
    background: ${colorScheme.lightBackground};
    border-color: ${colorScheme.lightBackground};
    color: ${colorScheme.blue};
    border-radius: 5px 5px 0 0;
  }
`;

const Home = (props) => {
  return (
    <>
      {/* make this look nice and then the search can just have buttons - scratch the other design  */}

      <div>
        <h4 style={{ textAlign: "center" }}>Recipes</h4>
        <StyledTab>
          <TabList>
            <Tab style={{ width: 160 }}>User Preferences</Tab>
            <Tab style={{ width: 160 }}>Saved</Tab>
          </TabList>

          <TabPanel
            style={{
              backgroundColor: colorScheme.lightBackground,
              marginTop: -11,
              minHeight: 30,
              minHeight: 430,
            }}
          >
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel
            style={{
              backgroundColor: colorScheme.lightBackground,
              marginTop: -11,
              minHeight: 430,
            }}
          >
            <h2>Any content 2</h2>
          </TabPanel>
        </StyledTab>
      </div>
      <Button
        style={{ borderRadius: "0px 0px 5px 5px" }}
        variant="primary"
        size="lg"
        block
      >
        Block level button
      </Button>
      <div style={{ display: "flex", marginTop: 10 }}>
        <Button style={{ height: 115, width: 115 }}>Promotions</Button>
        <Button style={{ height: 115, width: 115 }}>User Preferences</Button>
        <Button style={{ height: 115, width: 115 }}>Liked Recipes</Button>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
