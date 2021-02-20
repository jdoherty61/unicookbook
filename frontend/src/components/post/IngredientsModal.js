import React, { useState } from "react";
// https://react-bootstrap.github.io/components/modal/
import { Card, InputGroup, Button, Modal } from "react-bootstrap";
import { FiList } from "react-icons/fi";
import { addToUserShoppingList } from "../../actions/shoppingList";

export const IngredientsModal = ({ recipe }) => {
  const { title, totalPrice, ingredients } = recipe;

  console.log(title);

  const [show, setShow] = useState(false);
  const [recipeForShoppingList, setNewRecipe] = useState({
    recipeName: title,
    totalPrice,
    ingredients,
  });

  console.log(recipeForShoppingList);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FiList style={{ color: "black" }} size={25} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to shopping list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Title:
          {recipeForShoppingList.recipeName}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addToUserShoppingList({
                recipeName: "Chicken parma pasta",
                totalPrice: 12,
                ingredients: [
                  {
                    item: "chicken",
                    price: 0.2,
                    checked: false,
                  },
                  {
                    item: "pasta",
                    price: 0.4,
                    checked: false,
                  },
                  {
                    item: "pesto",
                    price: 9,
                    checked: false,
                  },
                ],
              });
              handleClose();
            }}
          >
            Add To Shopping List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IngredientsModal;
