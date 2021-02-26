import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import colorScheme from "../../styles/mainColorPallete";
import { Button } from "react-bootstrap";
import EmptyView from '../layout/EmptyView';
//should i remove this page??

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
  const history = useHistory();

  useEffect(() => {
    // getFiveUserPreferences();
  }, []);


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
            <EmptyView type={'Saved'}/>
          </TabPanel>
        </StyledTab>
      </div>
      <Button
        style={{ borderRadius: "0px 0px 5px 5px" }}
        variant="primary"
        size="lg"
        block
        onClick={() => history.push("/search/userpreferences")}
      >
       View All
      </Button>
      <div style={{ display: "flex", marginTop: 10 }}>
        <Button onClick={() => history.push("/promotions")} style={{ height: 115, width: 115 }}>Promotions</Button>
        <Button onClick={() => history.push("/filter")} style={{ height: 115, width: 115 }}>User Preferences</Button>
        <Button style={{ height: 115, width: 115 }}>Liked Recipes</Button>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
