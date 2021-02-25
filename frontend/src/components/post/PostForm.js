import React, { useState } from "react";
import PropTypes from "prop-types";
import { addPost } from "../../actions/posts";
import { Redirect } from "react-router-dom";
import { Card, InputGroup, Button, Modal, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import AddIngredientsModal from "./AddIngredientsModal";
import { useLocation, useHistory } from "react-router-dom";

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
border: '1px solid red';
              border-radius: 5px
`;

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
    ingredients: []
  });

  //Setting the state based on the value changed.
  const onChange = (val) => setPost({ ...post, [val.target.name]: val.target.value });
  console.log(post);

  const handleRemove = (ingredient) => {
    const newList = post.ingredients.filter(ingred => ingred !== ingredient)
    setPost({...post, ingredients: newList});
};

  return (
    <div class="post-form" style={{maxHeight: 690,
      overflow: 'scroll'}}>
      <form
        class="form my-1"
        style={{overflow: 'hidden'}}
        action='/home'
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
            formData.append('ingredients', post.ingredients[i]);
          }
          addPost(formData);
        }}
      >
        <div style={{marginTop: 10}}>
          <h4 style={{margin: 0}}>Select Recipe Image</h4>
          <input
            type="file"
            required
            onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
          />
        </div>

        <div style={{marginTop: 10}}>
          <h4 style={{margin: 0}}>Title</h4>
          <StyledInput
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={(val) => onChange(val)}
            name="title"
            required
            style={{border: '1px solid red',
              borderRadius: 5}}
          />
        </div>

        <div style={{marginTop: 10}}>
        <h3>Ingredients</h3>
        <div>
          {
            post.ingredients.length > 0 &&
<ListGroup>
{
            post.ingredients.map(ingredient => {
                return (
                  <ListGroup.Item>
                    <Button variant="light" onClick={() => handleRemove(ingredient)}><i class="far fa-trash-alt"></i></Button>
                    
                    {ingredient}
                    
                    </ListGroup.Item>
                );
            })
          }
</ListGroup>

          }



          <AddIngredientsModal post={post} setPost={setPost}/>
        </div>
        </div>

        
        <h3>Total Price</h3>
        <div style={{ display: "flex" }}>
        <input
            type="number"
            placeholder="approx total price (£)"
            value={post.totalPrice}
            onChange={(val) => onChange(val)}
            name="totalPrice"
            required
            style={{height: 40, border: '1px solid red',
            borderRadius: 5}}
          />
        </div>

        <div>
          <h3>Instructions</h3>
          <textarea
            name="instructions"
            cols="30"
            rows="2"
            placeholder="Instructions"
            onChange={(val) => onChange(val)}
            value={post.instructions}
            style={{border: '1px solid red',
            borderRadius: 5}}
            required
          ></textarea>
        </div>

        <div>
          <h3>Effort Time</h3>
          <input
            type="number"
            placeholder="Effort Time (mins)"
            value={post.effortTime}
            onChange={(val) => onChange(val)}
            name="effortTime"
            required
            style={{height: 40, border: '1px solid red',
            borderRadius: 5}}
          />
        </div>

        <div>
          <h3>Difficulty</h3>

          <div style={{ display: "flex" }}>
            {/* USE THE COMPONENT MADE IN SEARCH */}
            <Button
              onClick={() => setPost({ ...post, chosenDifficulty: "EASY" })}
            >
              Easy
            </Button>
            <Button
              onClick={() => setPost({ ...post, chosenDifficulty: "MODERATE" })}
            >
              Moderate
            </Button>
            <Button
              onClick={() =>
                setPost({ ...post, chosenDifficulty: "DIFFICULT" })
              }
            >
              Difficult
            </Button>
          </div>
        </div>

        <h3>Meal</h3>
        <div style={{ display: "flex" }}>
          {/* USE THE COMPONENT MADE IN SEARCH */}
          <Button onClick={() => setPost({ ...post, meal: "BREAKFAST" })}>
            Breakfast
          </Button>
          <Button onClick={() => setPost({ ...post, meal: "LUNCH" })}>
            Lunch
          </Button>
          <Button onClick={() => setPost({ ...post, meal: "DINNER" })}>
            Dinner
          </Button>
          <Button onClick={() => setPost({ ...post, meal: "SNACK" })}>
            Snack
          </Button>
        </div>

        <input type="submit" action='/home' class="btn btn-dark my-1" value="Add Recipe" />
      </form>
    </div>
  );
};

PostForm.propTypes = {};

export default PostForm;
