import React, { useEffect, useState } from "react";
import { Card, Button, ListGroup } from "react-bootstrap"; //https://react-bootstrap.github.io/
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"; //https://www.npmjs.com/package/react-tabs
import styled from "styled-components";

import {
  AiOutlineClockCircle,
  AiOutlineLike,
  AiOutlineSave,
} from "react-icons/ai"; //https://react-icons.github.io/react-icons
import { GiCook, GiMeal } from "react-icons/gi";

import ReviewsContentTab from "./ReviewsContentTab";
import IngredientsModal from "./IngredientsModal";
import defaultImg from "../../images/logo.png";
import colorScheme from "../../styles/mainColorPallete";

import { getPostByID } from "../../actions/posts";
import {convertDifficultyToUserFriendlyText, convertMealToUserFriendlyText} from "./postUtils";

const innitialRecipeState = {
  image: defaultImg,
  ingredients: [],
  instructions: ""
  // incomplete
};

const StyledTabs = styled(Tabs)`
  color: ${colorScheme.basicLightText};
  margin-top: 5px;

  .react-tabs__tab--selected {
    background: ${colorScheme.basicWhite};
    border-color: ${colorScheme.shadow};
    color: ${colorScheme.blue};
    border-radius: 5px 5px 0 0;
  }
`;

//Component dedicated to mapping through the ingredients array and displaying them as a list. It is a very small component and therefore I decided
//To keep it above the parent component.
const ListIngredients = ({ ingredients }) => {
  console.log(ingredients);
  if (ingredients.length === 0) {
    return <> no ingredients</>;
  } else {
    const ingredientsList = ingredients.map((ingred) => {
      return <ListGroup.Item><li>{ingred}</li></ListGroup.Item>;
    });
    return ingredientsList;
  }
};

//This component is used for the title of the post. Contains the OWNER information (Name, avatar, uni)
const CardTitle = ({ post }) => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img
          src={post.ownerAvatar} //refactored to allow users to edit their profile pics
          alt="new"
          style={{
            height: 40,
            width: 40,
            border: "1px solid #33e",
            borderRadius: 100,
            margin: 5,
            alignSelf: "center",
          }}
        />
      </div>
      <div>
        <Card.Title style={{ marginTop: 5, marginBottom: 5, fontSize: 18 }}>
          {post.ownerName}
        </Card.Title>
        <Card.Subtitle
          style={{ marginBottom: 0, fontSize: 15 }}
          className="mb-2 text-muted"
        >
          {post.ownerUni}
        </Card.Subtitle>
      </div>
      {/* This would be options to delete, report etc - further iteration */}
      <div style={{ position: "absolute", right: 10, marginTop: 10 }}>
        <i style={{ color: "grey" }} class="fas fa-ellipsis-v fa-lg"></i>
      </div>
    </div>
  );
};

//Card content dedicated to the actual information of the post. So the difficulty, price and time.
const CardContent = ({ post }) => {
  return (
    <Card.Body style={{ padding: "5px 15px" }}>
      <Card.Text>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
          <div style={{color: 'grey'}}>
            <AiOutlineClockCircle
              style={{ fill: colorScheme.blue }}
              size={30}
            />
            {post.effortTime} min(s)
          </div>
          <div style={{color: 'grey'}}>
            <GiCook style={{ fill: colorScheme.blue }} size={30} />
            {convertDifficultyToUserFriendlyText(post.chosenDifficulty)}
          </div>
  
          <div style={{color: 'grey'}}>
            <GiMeal style={{ fill: colorScheme.blue }} size={30} />
            {convertMealToUserFriendlyText(post.meal)}
          </div>
        </div>
      </Card.Text>
    </Card.Body>
  );
};

//Component created for the interactions (Like, save and add to shopping list). Like and save do not work within the timeframe i was unable to connect the APIs to buttons and develop the relevant logic.
const Interactions = ({ post }) => {
  return (
    <div
      style={{
        marginTop: 5,
        display: "flex",
        paddingLeft: 15,
      }}
    >
      <Button variant="">
        <AiOutlineLike style={{ fill: "grey" }} size={25} />
      </Button>
      <Button variant="">
        <AiOutlineSave style={{ fill: "grey" }} size={25} />
      </Button>
      <IngredientsModal recipe={post} />
    </div>
  );
};

// This is the content of the ingredients tab within the post. If there are no ingredients (which shouldn't really be the case, a message will show to indicate this)
const IngredientsContentTab = ({post}) => {

  return (
    <div style={{ padding: 5 }}>
      <ListGroup>
        {post.ingredients.length === 0 ? 
          <> no Ingredients</>
         : 
          <ListIngredients ingredients={post.ingredients} />
        }
      </ListGroup>
  </div>
  );
};

//The PARENT component. This is the Post. Renders the above within this with logic using useEffect hook for isLoading and spinner and useState
export const Post = ({ match }) => {
  const [post, setPost] = useState(innitialRecipeState);
  const [isLoading, setIsLoading] = useState(false);

  const id = match.params.id;

  useEffect(() => {
    // console.log(id);
    setIsLoading(true);
    getPostByID(id).then((post) => {
      post !== undefined && setPost(post);
      // console.log(post);
      setIsLoading(false);
    });
  }, []);

  return (
    <div style={{height: 680, overflow: 'scroll'}}>
      {!isLoading && (
        <>
          <Card>
            <CardTitle post={post} />
            <Card.Title style={{ display: "flex", padding: '0px 15px', fontSize: 25 }}>
              <div style={{color: colorScheme.blue, width: 260}}>{post.title}</div>
              <div style={{ right: 10, position: "absolute", color: colorScheme.orange }}>
                £{post.totalPrice}
              </div>
            </Card.Title>
            <Card.Img
              style={{
                height: 300,
                width: 325,
                alignSelf: "center",
              }}
              variant="top"
              src={`../../../../${post.image}`}
            />
            <Interactions post={post} />
            <CardContent post={post} />
          </Card>

          <StyledTabs>
            <TabList>
              <Tab>Ingredients</Tab>
              <Tab>Instructions</Tab>
              <Tab>Reviews</Tab>
            </TabList>

            <TabPanel
              style={{
                backgroundColor: colorScheme.basicWhite,
                marginTop: -11,
                minHeight: 150,
                color: "black",
              }}
            >
              <IngredientsContentTab post={post}/>
            </TabPanel>
            <TabPanel
              style={{
                backgroundColor: colorScheme.basicWhite,
                marginTop: -11,
                minHeight: 150,
                color: "black",
              }}
            >
              <div style={{ padding: 5 }}><ListGroup.Item>{post.instructions}</ListGroup.Item></div>
            </TabPanel>
            <TabPanel
              style={{
                backgroundColor: colorScheme.basicWhite,
                marginTop: -11,
                minHeight: 150,
                color: "black",
              }}
            >
            <ReviewsContentTab/> 
            </TabPanel>
          </StyledTabs>
        </>
      )}
      </div>
  );
};

export default Post;
