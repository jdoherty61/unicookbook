import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Card, InputGroup, Button, Modal, ListGroup } from "react-bootstrap";
import { getUserPreferences, postUserPreferences } from '../../actions/userPreferences';

import { Route, Redirect } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import Spinner from "../layout/CustomSpinner";

//do text input for now - but would be good to implement the slider for the time @react-native-community/slider'

const innitialState = {
  maxPrice: 0,
  maxTime: 0,
  difficulty: "null",
};

const addAndSearchForRecipes = async (userPreferences) => {
    try {
        //post the new changes
        postUserPreferences(userPreferences);
    } catch (err) {
        console.log(err);
    }
};

export const Filter = () => {
  const [userPreferences, setUserPreferences] = useState(innitialState);
  const [isLoading, setIsLoading] = useState(false);
const history = useHistory();


  useEffect(() => {
    setIsLoading(true);
      getUserPreferences().then(data => {
          console.log(data);
          data !== undefined && setUserPreferences(data);
          setIsLoading(false);
      })
  }, []);

  const easyColour = userPreferences.difficulty === "EASY" ? "blue" : "grey";
  const moderateColour =
    userPreferences.difficulty === "MODERATE" ? "blue" : "grey";
  const difficultyColour =
    userPreferences.difficulty === "DIFFICULT" ? "blue" : "grey";

  //useEffect

  return (
    <Container>


        {isLoading ? <Spinner/> : 
      <div style={{ marginTop: 10, padding: 10 }}>
        <h4 style={{ color: "white", fontWeight: "bold" }}>
          Filter searches based on your user preferences!
          {/* tooltip button to explain what this means */}
        </h4>

        <h3>Max Price</h3>
        <div style={{ display: "flex" }}>
          <input
            type="number"
            placeholder="approx total price (£)"
            value={userPreferences.maxPrice}
            onChange={(val) =>
              setUserPreferences({
                ...userPreferences,
                maxPrice: val.target.value,
              })
            }
            name="totalPrice"
            required
            style={{ height: 40, border: "1px solid red", borderRadius: 5 }}
          />
        </div>

        <div>
          <h3>Max Effort Time</h3>
          <input
            type="number"
            placeholder="Effort Time (mins)"
            value={userPreferences.maxTime}
            onChange={(val) =>
              setUserPreferences({
                ...userPreferences,
                maxTime: val.target.value,
              })
            }
            name="effortTime"
            required
            style={{ height: 40, border: "1px solid red", borderRadius: 5 }}
          />
        </div>

        <div>
          <h3>Chosen Difficulty</h3>

          <div style={{ display: "flex" }}>
            {/* USE THE COMPONENT MADE IN SEARCH */}
            <Button
              onClick={() =>
                setUserPreferences({ ...userPreferences, difficulty: "EASY" })
              }
              style={{ backgroundColor: easyColour }}
            >
              Easy
            </Button>
            <Button
              onClick={() =>
                setUserPreferences({
                  ...userPreferences,
                  difficulty: "MODERATE",
                })
              }
              style={{ backgroundColor: moderateColour }}
            >
              Moderate
            </Button>
            <Button
              onClick={() =>
                setUserPreferences({
                  ...userPreferences,
                  difficulty: "DIFFICULT",
                })
              }
              style={{ backgroundColor: difficultyColour }}
            >
              Difficult
            </Button>

          </div>
          <div>
          <Button
          onClick={() => {addAndSearchForRecipes(userPreferences).then(() => history.push('/search/userpreferences'))}}
          >Save and Go!</Button>
          </div>
        </div>
      </div>
      }
    </Container>
  );
};
