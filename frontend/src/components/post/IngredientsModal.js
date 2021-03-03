import React, { useState } from "react";
// https://react-bootstrap.github.io/components/modal/
import {
  Card,
  InputGroup,
  FormControl,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { FiList } from "react-icons/fi";
import { addToUserShoppingList } from "../../actions/shoppingList";
import colorScheme from "../../styles/mainColorPallete";
import Separator from "../layout/Separator";

export const IngredientsModal = ({ recipe }) => {
  const { title, totalPrice, ingredients } = recipe;
  // console.log(title);
  const [show, setShow] = useState(false);
  const [recipeForShoppingList, setNewRecipe] = useState({
    recipeName: title,
    totalPrice,
    ingredients,
  });
  const [newIngredient, setNewIngredient] = useState("");
  console.log(recipeForShoppingList);

  const handleClose = () => {
    setNewRecipe({
      recipeName: title,
      totalPrice,
      ingredients,
    });

    setNewIngredient("");

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleRemove = (ingredient) => {
    const newList = recipeForShoppingList.ingredients.filter(
      (ingred) => ingred !== ingredient
    );
    setNewRecipe({ ...recipeForShoppingList, ingredients: newList });
  };

  const addColorIcon = newIngredient.length === 0 ? 'grey' : colorScheme.orange;
  const isDisabled = newIngredient.length > 0;

  return (
    <>
      <Button variant="" onClick={handleShow}>
        <FiList style={{ color: "grey" }} size={25} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to shopping list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
            style={{backgroundColor: 'aliceblue'}}
              placeholder="Title"
              value={recipeForShoppingList.recipeName}
              onChange={(val) =>
                setNewRecipe({
                  ...recipeForShoppingList,
                  recipeName: val.target.value,
                })
              }
            />
          </InputGroup>

          <h5>Ingredients</h5>
          {recipeForShoppingList.ingredients.length > 0 && (
            <ListGroup>
              {recipeForShoppingList.ingredients.map((ingredient) => {
                return (
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      {/* <InputGroup.Text id="basic-addon1"> */}
                      <Button
                        variant="light"
                        onClick={() => handleRemove(ingredient)}
                      >
                        <i class="far fa-trash-alt"></i>
                      </Button>
                      {/* </InputGroup.Text> */}
                    </InputGroup.Prepend>
                    <FormControl
                      style={{backgroundColor: 'aliceblue'}}
                      placeholder="Ingredient Name"
                      value={ingredient}
                    />
                  </InputGroup>
                );
              })}         
                {/* <Separator/> */}

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button
                    variant="light"
                    disabled={newIngredient.length === 0}
                    onClick={() => {
                      setNewRecipe({
                        ...recipeForShoppingList,
                        ingredients: [
                          ...recipeForShoppingList.ingredients,
                          newIngredient,
                        ],
                      });
                      setNewIngredient("");
                    }}
                  >
                    <i style={{color: addColorIcon}} class="fas fa-plus"></i>
                  </Button>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Ingredient Name"
                  value={newIngredient}
                  onChange={(val) => setNewIngredient(val.target.value)}
                />
              </InputGroup>
            </ListGroup>
          )}
          <h5>Total Price:</h5>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>£</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              onChange={(val) =>
                setNewRecipe({
                  ...recipeForShoppingList,
                  totalPrice: val.target.value = 0 ? "" : Number(val.target.value),
                })
              }
              placeholder={"Please input a valid amount"}
              value={recipeForShoppingList.totalPrice}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={
              recipeForShoppingList.totalPrice < 0 ||
              recipeForShoppingList.totalPrice === 0 ||
              recipeForShoppingList.recipeName?.length === 0 || isDisabled
            }
            onClick={() => {
              addToUserShoppingList(
                recipeForShoppingList
                //KEEPING IN PLACE INCASE ERROR SO HARD CODE IS AVAIL FOR DEMO
                //   {
                //   recipeName: "Chicken parma pasta",
                //   totalPrice: 12,
                //   ingredients: [
                //     {
                //       item: "chicken",
                //       price: 0.2,
                //       checked: false,
                //     },
                //     {
                //       item: "pasta",
                //       price: 0.4,
                //       checked: false,
                //     },
                //     {
                //       item: "pesto",
                //       price: 9,
                //       checked: false,
                //     },
                //   ],
                // }
              );
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
