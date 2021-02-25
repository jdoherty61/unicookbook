import React, { useEffect, useState } from "react";

import {
  getCurrentUserShoppingList,
  clearUserShoppingList,
} from "../../actions/shoppingList";
import { getCurrentUserBudget } from "../../actions/userBudget";
import Spinner from "../layout/CustomSpinner";
import { Card, Button, Jumbotron, Accordion } from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";
import EmptyView from '../layout/EmptyView';

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
        <h4 style={{ margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'scroll' }}>{recipe.recipeName}</h4>
        <ListIngredredients ingredients={recipe.ingredients} />
        <div style={{ right: 20, position: "absolute" }}>
          Total: £{recipe.totalPrice}
        </div>
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

const getShoppingListTotalFunction = (list) => {
  let total = 0;
  list.map((recipe) => (total = total + recipe.totalPrice));
  return total;
};

export const ShoppingList = () => {
  const [list, setShoppingList] = useState(innitialShoppingListState);
  const [isLoading, setIsLoading] = useState(false);
  const [budgetTotal, setBudgetTotal] = useState(innitialBudgetTotal);

  // const [shoppingListTotal, setShoppingListTotal] = useState(0);

  // console.log(list?.list);

  useEffect(() => {
    setIsLoading(true);

    getCurrentUserShoppingList().then((shoppingList) => {
      // console.log(shoppingList);
      setShoppingList(shoppingList);
      //function to get the shopping list total
      // const shoppingListTotalGenerated = getShoppingListTotalFunction(shoppingList.list);
      // setShoppingListTotal(shoppingListTotalGenerated);
      // console.log(shoppingListTotal);
    });

    getBudgetTotal().then((totalBudget) => {
      setBudgetTotal(totalBudget);
      // console.log(`budget total ${budgetTotal}`);
    });

    setIsLoading(false);
  }, [isLoading]);

  console.log(list);
  const totalInShoppingList = getShoppingListTotalFunction(list.list);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Accordion defaultActiveKey="0">
            <Card style={{marginBottom: 5}}>
              <Card.Header style={{padding: 0}}>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Groceries Budget
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <div style={{textAlign: 'center',  padding: 5}}>
                    £{budgetTotal}
                    <div>Budget</div>
                  </div>
                  <div style={{textAlign: 'center',  padding: 5}}>
                    £{totalInShoppingList}
                    <div>In Shopping List</div>
                  </div>
                  <div style={{textAlign: 'center',  padding: 5}}>
                    £{budgetTotal - totalInShoppingList}
                    <div>Left</div>
            
                  </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          {/* <Jumbotron style={{ height: 100, marginBottom: 5, display: 'flex' }}>
            <div>
               £{budgetTotal}
              Budget
            </div>
            <div>
               £{totalInShoppingList}
              In Shopping List
            </div>
            <div>
               £{budgetTotal - totalInShoppingList}
              Left
            </div>
          </Jumbotron> */}

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
              style={{ float: "right", marginTop: 2 }}
              onClick={() => alert("this")}
            >
              Export
            </Button>
          </div>
        {
          list.list.length === 0 ? <EmptyView/> : 
          <ShoppingListRecipes list={list.list} />
        }


          
        </>
      )}
    </div>
  );
};

export default ShoppingList;
