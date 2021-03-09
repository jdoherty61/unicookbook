import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap"; // https://react-bootstrap.github.io/components/modal/
import styled from "styled-components";

import colorScheme from "../../styles/mainColorPallete";

const StyledButton = styled(Button)`
  background-color: ${colorScheme.blue};
`;


//This component was used when adding a recipe. When adding ingredients to a recipe a modal will display so users can add one ingredient at a time!
//Left a few comments incase of errors
export const AddIngredientsModal = ({ post, setPost }) => {
  const [show, setShow] = useState(false);
  //setting it to an empty string
  const [ingredient, setIngredient] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isDisabled = ingredient.length === 0;

  return (
    <>
      <Button
        style={{ backgroundColor: colorScheme.blue }}
        size="lg"
        block
        onClick={handleShow}
      >
        <i class="fas fa-plus"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredient}
            onChange={(val) => setIngredient(val.target.value)}
            name="name"
            required
          /> */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Ingredient</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Ingredient Name"
              value={ingredient}
              onChange={(val) => setIngredient(val.target.value)}
              name="name"
              required
              type="text"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <StyledButton
            disabled={isDisabled}
            onClick={() => {
              console.log("add");
              //adding the new ingredient to the previous array of ingredients.
              setPost({
                ...post,
                ingredients: [...post.ingredients, ingredient],
              });
              handleClose();
              //setting the ingredient back to  default!
              setIngredient("");
            }}
          >
            Add To Recipe
          </StyledButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddIngredientsModal;
