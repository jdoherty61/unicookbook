import React, { useEffect, useState } from "react";
import { Card, InputGroup, Button, Modal, ListGroup } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import logo from "../../images/logo.png";

import {
  AiOutlineClockCircle,
  AiOutlineLike,
  AiOutlineSave,
} from "react-icons/ai"; //https://react-icons.github.io/react-icons
import { GiCook, GiMeal } from "react-icons/gi";
import { FiList } from "react-icons/fi";

import IngredientsModal from "./IngredientsModal";
import defaultImg from "../../images/logo.png";
import colorScheme from "../../styles/mainColorPallete";

import { getPostByID } from "../../actions/posts";

const innitialRecipeState = {
  image: defaultImg,
  ingredients: [],
  instructions: "",
  //should I add more here?
};

const StyledTabs = styled(Tabs)`
  color: ${colorScheme.basicLightText};

  .react-tabs__tab--selected {
    background: ${colorScheme.lightBackground};
    border-color: ${colorScheme.lightBackground};
    color: ${colorScheme.blue};
    border-radius: 5px 5px 0 0;
  }
`;

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
        <Card.Title style={{ marginTop: 5, marginBottom: 5, fontSize: 20 }}>
          {post.ownerName}
        </Card.Title>
        <Card.Subtitle
          style={{ marginBottom: 0, fontSize: 15 }}
          className="mb-2 text-muted"
        >
          {post.ownerUni}
        </Card.Subtitle>
      </div>
      <div style={{ position: "absolute", right: 10, marginTop: 10 }}>
        <i style={{ color: "grey" }} class="fas fa-ellipsis-v fa-lg"></i>
        {/* will be for people who own the recipe */}
      </div>
    </div>
  );
};


const convertDifficultyToUserFriendlyText = (difficulty) => {
  switch(difficulty) {
    case 'EASY':
    return 'Easy';
    case 'MODERATE':
      return 'Moderate';
    case 'DIFFICULT': 
    return 'Difficult';
   default: 
    return '';
  }
};

const convertMealToUserFriendlyText = (meal) => {
  switch(meal) {
    case 'BREAKFAST':
    return 'Breakfast';
    case 'LUNCH':
      return 'Lunch';
    case 'DINNER': 
    return 'Dinner';
    case 'SNACK':
      return 'Snack';
   default: 
    return '';
  };
};

const CardContent = ({ post }) => {
  return (
    <Card.Body style={{ padding: "5px 15px" }}>
      {/* <Card.Title style={{ display: "flex" }}>
        <div>{post.title}</div>
        <div style={{ right: 10, position: "absolute", color: "red" }}>
          £{post.totalPrice}
        </div>
      </Card.Title> */}
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

const Interactions = ({ post }) => {
  return (
    <div
      style={{
        marginTop: 5,
        display: "flex",
        // justifyContent: 'flex-end'
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

const IngredientsContentTab = ({post}) => {

  return (
    <div style={{ padding: 5 }}>
<ListGroup>
    {post.ingredients.length === 0 ? (
      <> no Ingredients</>
    ) : (
      <ListIngredients ingredients={post.ingredients} />
    )}
    </ListGroup>
  </div>
  );
};


const ReviewsContentTab = () => {
//hard coded to show what the potential of a reviews section will be 
return (
  <div style={{ padding: 5 }}>
   <ListGroup>
   <ListGroup.Item>
   <div style={{ display: "flex" }}>
      <div>
        <img
          src={logo} //refactored to allow users to edit their profile pics
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
        <Card.Title style={{ marginTop: 5, marginBottom: 5, fontSize: 20 }}>
          Caoimhe Power
        </Card.Title>
        <Card.Subtitle
          style={{ marginBottom: 0, fontSize: 15 }}
          className="mb-2 text-muted"
        >
          Queen's University, Belfast
        </Card.Subtitle>
      </div>
      <div style={{ position: "absolute", right: 10, marginTop: 10 }}>
        <i style={{ color: "grey" }} class="fas fa-ellipsis-v fa-lg"></i>
        {/* will be for people who own the recipe */}
      </div>
    </div>
    <ListGroup.Item>Unreal! I got the same recipe from tescos for £2 cheaper. Love this thank you</ListGroup.Item>
   </ListGroup.Item>

   <ListGroup.Item>
   <div style={{ display: "flex" }}>
      <div>
        <img
          src={logo} //refactored to allow users to edit their profile pics
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
        <Card.Title style={{ marginTop: 5, marginBottom: 5, fontSize: 20 }}>
          Jenny Stevenson
        </Card.Title>
        <Card.Subtitle
          style={{ marginBottom: 0, fontSize: 15 }}
          className="mb-2 text-muted"
        >
          Queen's University, Belfast
        </Card.Subtitle>
      </div>
      <div style={{ position: "absolute", right: 10, marginTop: 10 }}>
        <i style={{ color: "grey" }} class="fas fa-ellipsis-v fa-lg"></i>
        {/* will be for people who own the recipe */}
      </div>
    </div>
    <ListGroup.Item>Love it</ListGroup.Item>
   </ListGroup.Item>
 </ListGroup>
</div>
)
};

export const Post = ({ match }) => {
  const [post, setPost] = useState(innitialRecipeState);
  const [isLoading, setIsLoading] = useState(false);

  const id = match.params.id;

  useEffect(() => {
    console.log(id);
    setIsLoading(true);
    getPostByID(id).then((post) => {
      post !== undefined && setPost(post);
      console.log(post);
      // setPost(post)
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <Card>
            <CardTitle post={post} />
            <Card.Title style={{ display: "flex", padding: '0px 15px', fontWeight: 'bold', fontSize: 25 }}>
              <div style={{color: colorScheme.blue}}>{post.title}</div>
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
                backgroundColor: colorScheme.lightBackground,
                marginTop: -11,
                minHeight: 30,
                minHeight: 515,
                color: "black",
              }}
            >
              <IngredientsContentTab post={post}/>
            </TabPanel>
            <TabPanel
              style={{
                backgroundColor: colorScheme.lightBackground,
                marginTop: -11,
                minHeight: 30,
                minHeight: 515,
                color: "black",
              }}
            >
              <div style={{ padding: 5 }}><ListGroup.Item>{post.instructions}</ListGroup.Item></div>
            </TabPanel>
            <TabPanel
              style={{
                backgroundColor: colorScheme.lightBackground,
                marginTop: -11,
                minHeight: 30,
                minHeight: 515,
                color: "black",
              }}
            >
            <ReviewsContentTab/> 
            </TabPanel>
          </StyledTabs>
        </>
      )}
    </>
  );
};

export default Post;
