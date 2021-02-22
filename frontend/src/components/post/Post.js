// import { get } from 'mongoose';
import React, { useEffect, useState } from "react";
import { getPostByID } from "../../actions/posts";
import IngredientsModal from "./IngredientsModal";
import { addToUserShoppingList } from "../../actions/shoppingList";
import defaultImg from "../../images/logo.png";
import { Card, InputGroup, Button, Modal } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import colorScheme from "../../styles/mainColorPallete";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GiCook } from "react-icons/gi";
import { FiList } from "react-icons/fi";

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
      const ingredientsList = ingredients.map(ingred => {
        return (
          <li>{ingred}</li>
        );
      })
      return ingredientsList;
  }
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
    {!isLoading &&
    <>
      <Card>
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
            <i class="fas fa-ellipsis-v fa-lg"></i>
            {/* will be for people who own the recipe */}
          </div>
        </div>
        <Card.Img style={{
          height: 300,
          width: 325,
          alignSelf: 'center'
        }} variant="top" src={`../../../../${post.image}`} />
        <Card.Body style={{ padding: 10 }}>
          <Card.Title style={{ display: "flex" }}>
            <div>{post.title}</div>
            <div style={{ right: 10, position: "absolute", color: "red" }}>
              £{post.totalPrice}
            </div>
          </Card.Title>
          <Card.Text>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <AiOutlineClockCircle
                  style={{ fill: colorScheme.blue }}
                  size={30}
                />
                {post.effortTime} mins
              </div>
              <div>
                <GiCook style={{ fill: "black" }} size={30} />
                {post.chosenDifficulty}
              </div>
              <div>meal: {post.meal}</div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <div style={{ marginTop: 5, display: "flex", backgroundColor: "grey" }}>
        <Button variant="primary">Save</Button>
        <Button variant="primary">Like</Button>

              {/* todo: this passes in the innitial values */}
    <IngredientsModal
      recipe={post}
      />
      </div>

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
          <div style={{ padding: 20 }}>
            {post.ingredients.length === 0 ? (
              <> no Ingredients</>
            ) : (
              // console.log(post.ingredients)
              <ListIngredients ingredients={post.ingredients} />
            )}
          </div>
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
          <div style={{ padding: 20 }}>{post.instructions}</div>
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
          <div style={{ padding: 20 }}>Comments Feature To Come! Will allow users to say they got the recipe for cheap at spar etc</div>
        </TabPanel>
      </StyledTabs>
</>
}



    </>
  );
};

export default Post;
