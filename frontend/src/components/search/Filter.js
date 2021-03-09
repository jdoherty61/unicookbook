import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container"; //https://react-bootstrap.netlify.app/
import { useHistory } from "react-router-dom";

import {
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap"; //https://react-bootstrap.netlify.app/

import {
  getUserPreferences,
  postUserPreferences,
} from "../../actions/userPreferences";

// import SliderWithInputControl from "./SliderWithInputControl";
import colorScheme from "../../styles/mainColorPallete";

import Spinner from "../layout/CustomSpinner";
import Separator from "../layout/Separator";
import GenericTooltip from "../layout/GenericTooltip";

import { AiOutlineClockCircle } from "react-icons/ai"; //https://react-icons.github.io/react-icons
import { GiCook } from "react-icons/gi"; //https://react-icons.github.io/react-icons/

const innitialState = {
  maxPrice: 0,
  maxTime: 0,
  difficulty: "null",
};

//Save the new preferences and search
const addAndSearchForRecipes = async (userPreferences) => {
  try {
    //post the new changes
    await postUserPreferences(userPreferences);
  } catch (err) {
    console.log(err);
  }
};

//component dedicated to the max price input
const MaxPriceForm = ({ userPreferences, setUserPreferences }) => {
  return (
    <>
      <h4>Max Price</h4>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">£</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          placeholder={"Please input a max price to search recipes"}
          value={userPreferences.maxPrice}
          onChange={(val) =>
            setUserPreferences({
              ...userPreferences,
              maxPrice: val.target.value,
            })
          }
          name="totalPrice"
          required
        />
      </InputGroup>
    </>
  );
};

//component dedicated to the max time input
const MaxEffortTime = ({ userPreferences, setUserPreferences }) => {
  return (
    <>
      <h4>Max Effort Time</h4>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <AiOutlineClockCircle
              style={{ fill: colorScheme.blue }}
              size={20}
            />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
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
          // style={{ height: 40, border: "1px solid red", borderRadius: 5 }}
        />
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Minutes</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    </>
  );
};

//component dedicated to the chosen difficulty input (button). colour logic within to turn grey to blue when selected
const ChosenDifficultyForm = ({ userPreferences, setUserPreferences }) => {
  const easyColour =
    userPreferences.difficulty === "EASY" ? colorScheme.blue : "grey";
  const moderateColour =
    userPreferences.difficulty === "MODERATE" ? colorScheme.blue : "grey";
  const difficultyColour =
    userPreferences.difficulty === "DIFFICULT" ? colorScheme.blue : "grey";


  return (
    <>
      <h4>Chosen Difficulty</h4>
      <div style={{ display: "flex" }}>
        <Button
          onClick={() =>
            setUserPreferences({ ...userPreferences, difficulty: "EASY" })
          }
          style={{ backgroundColor: easyColour }}
        >
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />
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
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />{" "}
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />
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
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />{" "}
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />{" "}
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />
          Difficult
        </Button>
      </div>
    </>
  );
};

//parent component that will render the above and provide all contents on the screen.
export const Filter = () => {
  const [userPreferences, setUserPreferences] = useState(innitialState);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getUserPreferences().then((data) => {
      console.log(data);
      data !== undefined && setUserPreferences(data);
      setIsLoading(false);
    });
  }, []);

  //useEffect

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ marginTop: 10, padding: 10 }}>
          <h4 style={{ color: "white", fontWeight: "bold", display: 'flex' }}>
            Filter searches based on your preferences!
            <GenericTooltip title={'Set your preferences and go!'} subtitle={'These preferences will be saved.'} explanation={'Students prefer meals based on their own preferences. Input your preferences and search for recipes you want to see!'} chosenPadding={0}/>
          </h4>
          <MaxPriceForm
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
          />
          <MaxEffortTime
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
          />
          <ChosenDifficultyForm
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
          />

          <div style={{ paddingTop: 30, paddingBottom: 30 }}>
            <Separator />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                addAndSearchForRecipes(userPreferences).then(() =>
                  history.push("/search/userpreferences")
                );
              }}
            >
              Save and Go!
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};
