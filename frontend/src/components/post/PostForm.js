import React, { useState } from "react";
import { InputGroup, Button, ListGroup, FormControl } from "react-bootstrap"; //https://react-bootstrap.github.io/
import styled from "styled-components";

import AddIngredientsModal from "./AddIngredientsModal";
import { addPost } from "../../actions/posts";

import colorScheme from "../../styles/mainColorPallete";
import { GiCook } from "react-icons/gi"; //https://react-icons.github.io/react-icons/

{
  /* help with this
      https://stackoverflow.com/questions/41878838/how-do-i-set-multipart-in-axios-with-react
      https://stackoverflow.com/questions/60635762/fixing-error-cannot-read-property-path-of-undefined
      https://stackoverflow.com/questions/52798723/append-created-image-file-in-formdata/52801256
       */
}
//I was going to add in ability to view image, however with the function i was using it caused issues so resulted in taking it out.
// https://gitmemory.com/issue/pouchdb/pouchdb/8214/732174310 */}
// {/* <img src={URL.createObjectURL(post.image)}/>

const StyledInput = styled.input`
  border: "1px solid red";
  border-radius: 5px;
`;

//Component separated from th actual form and then imported as there is it's own logic going on, therefore keeping organisation
const DifficultyButtons = ({ setPost, post }) => {
  const easyColour = post.chosenDifficulty === "EASY" ? colorScheme.blue : "grey";
  const moderateColour = post.chosenDifficulty === "MODERATE" ? colorScheme.blue : "grey";
  const difficultyColour = post.chosenDifficulty === "DIFFICULT" ? colorScheme.blue : "grey";

  return (
    <div style={{ marginTop: 10 }}>
      <h4>Difficulty</h4>
      <div style={{ display: "flex" }}>
        <Button
          style={{ backgroundColor: easyColour }}
          onClick={() => setPost({ ...post, chosenDifficulty: "EASY" })}
        >
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />
          Easy
        </Button>
        <Button
          onClick={() => setPost({ ...post, chosenDifficulty: "MODERATE" })}
          style={{ backgroundColor: moderateColour }}
        >
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />
          Moderate
        </Button>
        <Button
          onClick={() => setPost({ ...post, chosenDifficulty: "DIFFICULT" })}
          style={{ backgroundColor: difficultyColour }}
        >
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />{" "}
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />{" "}
          <GiCook style={{ fill: colorScheme.basicLightText }} size={20} />
          Difficult
        </Button>
      </div>
    </div>
  );
};

//Component separated from th actual form and then imported as there is it's own logic going on, therefore keeping organisation
const MealCategoryButtons = ({ setPost, post }) => {
  const snackColour = post.meal === "SNACK" ? colorScheme.blue : "grey";
  const breakfastColour = post.meal === "BREAKFAST" ? colorScheme.blue : "grey";
  const lunchColour = post.meal === "LUNCH" ? colorScheme.blue : "grey";
  const dinnerColour = post.meal === "DINNER" ? colorScheme.blue : "grey";

  return (
    <div style={{ marginTop: 10 }}>
      <h4>Meal</h4>
      <div style={{ display: "flex" }}>
        <Button
          style={{ width: 90, margin: 1, backgroundColor: breakfastColour }}
          onClick={() => setPost({ ...post, meal: "BREAKFAST" })}
        >
          <i class="fas fa-apple-alt"></i>
          Breakfast
        </Button>
        <Button
          style={{ width: 90, margin: 1, backgroundColor: lunchColour }}
          onClick={() => setPost({ ...post, meal: "LUNCH" })}
        >
          <i class="fas fa-bacon"></i>
          Lunch
        </Button>
        <Button
          style={{ width: 90, margin: 1, backgroundColor: dinnerColour }}
          onClick={() => setPost({ ...post, meal: "DINNER" })}
        >
          <i class="fas fa-drumstick-bite"></i>
          Dinner
        </Button>
        <Button
          style={{ width: 90, margin: 1, backgroundColor: snackColour }}
          onClick={() => setPost({ ...post, meal: "SNACK" })}
        >
          <i class="fas fa-cookie"></i>
          Snack
        </Button>
      </div>
    </div>
  );
};

// The form used to create a recipe!
const PostForm = (props) => {
  //Have to have an innitial state on mount with innitial values to target.
  const [post, setPost] = useState({
    title: "",
    instructions: "",
    effortTime: "",
    totalPrice: "",
    chosenDifficulty: "EASY", //DEFAULT
    meal: "LUNCH", //DEFAULT
    image: "default.png", //default (incase failure)
    ingredients: [],
  });

  //Setting the state based on the value changed.
  const onChange = (val) =>
    setPost({ ...post, [val.target.name]: val.target.value });
  console.log(post);

  const handleRemove = (ingredient) => {
    const newList = post.ingredients.filter((ingred) => ingred !== ingredient);
    setPost({ ...post, ingredients: newList });
  };

  return (
    <div class="post-form" style={{ maxHeight: 685, overflow: "scroll" }}>
      <form
        class="form my-1"
        style={{ overflow: "hidden" }}
        action="/home"
        onSubmit={(e) => {
          // e.preventDefault(); //this prevents the form from going off the addRecipe view - basically disregards to action.
          const formData = new FormData();
          formData.append("image", post.image);
          formData.append("title", post.title);
          // formData.append('ingredients', post.ingredients);
          formData.append("instructions", post.instructions);
          formData.append("effortTime", post.effortTime);
          formData.append("totalPrice", post.totalPrice);
          formData.append("chosenDifficulty", post.chosenDifficulty);
          formData.append("meal", post.meal);
          // https://laracasts.com/discuss/channels/javascript/formdata-append-javascript-array-jsonstringify-how-to-cast-as-php-array
          for (var i = 0; i < post.ingredients.length; i++) {
            formData.append("ingredients", post.ingredients[i]);
          }
          addPost(formData);
        }}
      >
        <div style={{ marginTop: 10 }}>
          <h4 style={{ margin: 0 }}>Select Recipe Image</h4>
          <input
            type="file"
            required
            onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <h4 style={{ margin: 0 }}>Title</h4>
          <StyledInput
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={(val) => onChange(val)}
            name="title"
            required
            style={{ border: "1px solid red", borderRadius: 5 }}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <h4>Ingredients</h4>
          <div>
            {post.ingredients.length > 0 && (
              <ListGroup>
                {post.ingredients.map((ingredient) => {
                  return (
                    <InputGroup className="mb-1">
                      <InputGroup.Prepend>
                        <Button
                          variant="light"
                          onClick={() => handleRemove(ingredient)}
                        >
                          <i class="far fa-trash-alt"></i>
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl
                        style={{ backgroundColor: "aliceblue" }}
                        placeholder="Ingredient Name"
                        value={ingredient}
                      />
                    </InputGroup>
                  );
                })}
              </ListGroup>
            )}
            <AddIngredientsModal post={post} setPost={setPost} />
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <h4>Total Price</h4>
          <div style={{ display: "flex" }}>
            <input
              type="number"
              placeholder=" Approx total price (£)"
              value={post.totalPrice}
              onChange={(val) => onChange(val)}
              name="totalPrice"
              required
              style={{ height: 40, border: "1px solid red", borderRadius: 5 }}
            />
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <h4>Instructions</h4>
          <textarea
            name="instructions"
            cols="30"
            rows="2"
            placeholder="Instructions"
            onChange={(val) => onChange(val)}
            value={post.instructions}
            style={{ border: "1px solid red", borderRadius: 5, fontSize:15 }}
            required
          ></textarea>
        </div>

        <div style={{ marginTop: 10 }}>
          <h4>Effort Time</h4>
          <input
            type="number"
            placeholder=" Effort Time (mins)"
            value={post.effortTime}
            onChange={(val) => onChange(val)}
            name="effortTime"
            required
            style={{ height: 40, border: "1px solid red", borderRadius: 5 }}
          />
        </div>

        <DifficultyButtons post={post} setPost={setPost} />
        <MealCategoryButtons post={post} setPost={setPost} />

        <div style={{ marginTop: 10, textAlign: "center" }}>
          <input
            type="submit"
            action="/home"
            class="btn btn-dark my-2"
            value="Add Recipe!"
            style={{
              backgroundColor: colorScheme.blue,
              border: `2px solid ${colorScheme.shadow}`,
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
