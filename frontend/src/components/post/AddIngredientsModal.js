import React, { useState } from "react";
// https://react-bootstrap.github.io/components/modal/
import { Card, InputGroup, Button, Modal } from "react-bootstrap";
import { FiList } from "react-icons/fi";

export const AddIngredientsModal = ({ post, setPost }) => {
  const [show, setShow] = useState(false);
  //setting it to an empty string
  const [ingredient, setIngredient] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isDisabled = ingredient.length === 0;
  return (
    <>
      <Button variant="primary" size="lg" block onClick={handleShow}>
        {/* <FiList style={{ color: "black" }} size={25} /> */}
        <i class="fas fa-plus"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredient}
            onChange={(val) => setIngredient(val.target.value)}
            name="name"
            required
        />


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={isDisabled}
            onClick={() => {
              console.log('add');
              //adding the new ingredient to the previous array of ingredients.
              setPost({...post, ingredients: [...post.ingredients, ingredient] })
              handleClose();
              //setting the ingredient back to  default!
              setIngredient('');
            }}
          >
            Add To Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddIngredientsModal;
