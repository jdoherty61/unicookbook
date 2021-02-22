import React, { useEffect, useState } from "react";

import {
  getCurrentUserShoppingList,
  clearUserShoppingList,
} from "../../actions/shoppingList";
import { getCurrentUserBudget } from "../../actions/userBudget";
import Spinner from "../layout/CustomSpinner";
import { Card, Button, Jumbotron } from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";
// should i connect this to redux?
//TODO: NEED TO ADD CHECKS

//innitial states
const innitialShoppingListState = { list: [] };
const innitialBudgetTotal = null;

const ListIngredredients = ({ ingredients }) => {
  const ingreds = ingredients.map((item) => {
    return (
      <div
        style={{
          backgroundColor: "white",
          margin: 1,
          height: 35,
          boxShadow: "0px 0px 4px 0px #C05A2E",
          display: "flex",
          borderRadius: 5,
        }}
      >
        <div>
          {/* {item.checked} */}
          {item}
        </div>
        {/* <div style={{ right: 20, position: "absolute" }}>£{item.price}</div> */}
      </div>
    );
  });

  return ingreds;
};

const ShoppingListRecipes = ({ list }) => {
  const ItemsInShoppingList = list.map((recipe) => {
    return (
      <>
        <h3 style={{ margin: 0 }}>{recipe.recipeName}</h3>
        <ListIngredredients ingredients={recipe.ingredients} />
        <div style={{ right: 20, position: "absolute" }}>Total: £{recipe.totalPrice}</div>
      </>
    );
  });

  return ItemsInShoppingList;
};

const getBudgetTotal = async () => {
  try {
    const { totalBudget } = await getCurrentUserBudget();
    console.log(totalBudget);
    return totalBudget;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const ShoppingList = () => {
  const [list, setShoppingList] = useState(innitialShoppingListState);
  const [isLoading, setIsLoading] = useState(false);
  const [budgetTotal, setBudgetTotal] = useState(innitialBudgetTotal);
  // console.log(list?.list);

  useEffect(() => {
    setIsLoading(true);

    getCurrentUserShoppingList().then((shoppingList) => {
      // console.log(shoppingList);
      setShoppingList(shoppingList);
      //function to get the shopping list total
    });

    getBudgetTotal().then(totalBudget => {
      setBudgetTotal(totalBudget);
      // console.log(`budget total ${budgetTotal}`);
    });

    setIsLoading(false);
  }, [isLoading]);

  console.log(list);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Jumbotron style={{ height: 100, marginBottom: 5, display: 'flex' }}>
            <div>
              £{budgetTotal}
              Budget
            </div>
            <div>
              £{budgetTotal}
              Left
            </div>
            <div>
              £{budgetTotal - budgetTotal}
              Total
            </div>
          </Jumbotron>
          
          <div style={{ backgroundColor: colorScheme.blue, height: 40 }}>
            {list.list.length} Recipes
            <Button
              style={{ float: "right", marginTop: 2, backgroundColor: "red" }}
              onClick={() => {
                clearUserShoppingList(list._id);
                setIsLoading(true);
              }}
            >
              Clear
            </Button>
            <Button
              style={{ float: "right", marginTop: 2, backgroundColor: "green" }}
              onClick={() => alert("this")}
            >
              Export
            </Button>
          </div>
          {/* {console.log(`list list list ${list.list} ///// ${list}`)} */}
          <ShoppingListRecipes list={list.list} />
        </>
      )}
    </div>
  );
};

export default ShoppingList;
