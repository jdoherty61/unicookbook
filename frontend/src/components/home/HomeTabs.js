import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/
import { useHistory } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"; // https://www.npmjs.com/package/react-tabs

import styled from "styled-components"; //https://styled-components.com/
import "react-tabs/style/react-tabs.css";

import colorScheme from "../../styles/mainColorPallete";
import EmptyView from "../layout/EmptyView";
import { LargerRecipeCard } from "../post/LargerRecipeCard";

import { getRecipesForHomePage } from "../../actions/search";

const StyledTabs = styled(Tabs)`
  color: ${colorScheme.orange};

  .react-tabs__tab--selected {
    background: ${colorScheme.lightBackground};
    border-color: ${colorScheme.lightBackground};
    color: ${colorScheme.blue};
    border-radius: 5px 5px 0 0;
  }
`;

//This component is used to map through the recipes and display as a list as such.
const RecipesSlide = ({ recipes }) => {
  return (
    <div style={{ display: "flex", overflow: "scroll" }}>
      {recipes.map((recipe) => {
        return (
          <div style={{ paddingTop: 15, paddingLeft: 10 }}>
            <LargerRecipeCard recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
};

//This component is dedicated to the tabs inside the homescreen. 
const HomeTabs = () => {
  const [userPreferencesRecipes, setUserPreferencesRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getRecipesForHomePage().then((data) => {
      setUserPreferencesRecipes(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h5 style={{ textAlign: "center", marginTop: 5, marginBottom: 10 }}>
        Recipes
      </h5>
      <StyledTabs>
        <TabList>
          <Tab style={{ width: 160 }}>User Preferences</Tab>
          <Tab style={{ width: 160 }}>Saved</Tab>
        </TabList>

        <TabPanel
          style={{
            backgroundColor: colorScheme.lightBackground,
            marginTop: -11,
            minHeight: 360, //was 460
          }}
        >
          {isLoading ? (
            <Spinner
              animation="border"
              style={{ padding: "5%", margin: "43%", color: colorScheme.blue }}
            />
          ) : (
            <RecipesSlide recipes={userPreferencesRecipes} />
          )}
        </TabPanel>
        <TabPanel
          style={{
            backgroundColor: colorScheme.lightBackground,
            marginTop: -11,
            minHeight: 360,
          }}
        >
          <EmptyView type={"Saved"} />
        </TabPanel>
      </StyledTabs>
      <Button
        style={{
          borderRadius: "0px 0px 5px 5px",
          boxShadow: `0 4px 9px -4px ${colorScheme.shadow}`,
        }}
        variant="primary"
        size="lg"
        block
        onClick={() => history.push("/search/userpreferences")}
      >
        View All
      </Button>
    </>
  );
};

export default HomeTabs;
