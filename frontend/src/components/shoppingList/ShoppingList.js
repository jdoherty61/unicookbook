import React, { useEffect, useState } from "react";
import { Card, Button, Accordion, InputGroup, FormControl } from "react-bootstrap"; //https://react-bootstrap.github.io/components/alerts/

import EmptyView from '../layout/EmptyView';
import Spinner from "../layout/CustomSpinner";

import colorScheme from "../../styles/mainColorPallete";

import { getCurrentUserBudget } from "../../actions/userBudget";
import {
  getCurrentUserShoppingList,
  clearUserShoppingList,
} from "../../actions/shoppingList";

//Check box has been added - next iteration should enable these to be connected to the database or local storage to maintain state!

//innitial states
const innitialShoppingListState = { list: [] };
const innitialBudgetTotal = null;

//Map and list the array of ingredients
const ListIngredredients = ({ ingredients }) => {
  const ingreds = ingredients.map((item) => {
    return (
      <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
      </InputGroup.Prepend>
      <FormControl style={{backgroundColor: 'white'}} disabled aria-label="Text input with checkbox" value={item}/>
    </InputGroup>
    );
  });

  return ingreds;
};

//Mapping the list returned from the DB, and splitting the list into their recipes with corresponding total and ingredients
const ShoppingListRecipes = ({ list }) => {
  const ItemsInShoppingList = list.map((recipe) => {
    return (
      <>
      <div style={{marginBottom: 2, display: 'flex'}}>
        <h4 style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'scroll' }}>{recipe.recipeName}</h4>
        </div>
        <ListIngredredients ingredients={recipe.ingredients} />
        <div style={{ textAlignLast: 'right', fontWeight: 'bold' }}>
          Total: £{recipe.totalPrice}
        </div>
      </>
    );
  });

  return ItemsInShoppingList;
};

//Getting the budget total to be compared to the shopping list - todo is to put this in a utils file
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
  return total.toFixed(2); //has to put toFixed() in place as the numbers were not working as expected
};

//The comparison which will be present in the shopping list screen at the top
const OverallShoppingListAndBudgetComparison = ({budgetTotal, list}) => {
  const totalInShoppingList = getShoppingListTotalFunction(list.list);
  console.log(totalInShoppingList);

  //2 decimal places! 
  const budgetTotalDp = budgetTotal?.toFixed(2);

  const totalLeft = budgetTotalDp - totalInShoppingList

  //colours 
  const BudgetColour = colorScheme.blue; 
  const totalLeftColour = totalLeft > 0 ? colorScheme.successfulGreen : colorScheme.warningColour;

  return (
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
            <div style={{fontWeight: 'bold', color: BudgetColour}}>£{budgetTotalDp} </div>
            <div>Budget</div>
          </div>
          <div style={{textAlign: 'center',  padding: 5}}>
          <div style={{fontWeight: 'bold'}}>
            £{totalInShoppingList}
            </div>
            <div>In Shopping List</div>
          </div>
          <div style={{textAlign: 'center',  padding: 5}}>
          <div style={{fontWeight: 'bold', color: totalLeftColour}}>
            £{totalLeft}
            </div>
            <div>Left</div>
    
          </div>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
  );
};

//The bar with options such as clear and export.
const ShoppingListOptionsMenu = ({list, setIsLoading}) => {
  return (
    <div style={{ backgroundColor: colorScheme.blue, height: 40, paddingLeft: 10, fontWeight: 'bold' }}>
    {list.list.length} Recipes
    <Button
    size="sm"
    variant="light"
      style={{ float: "right", marginTop: 2 }}
      onClick={() => {
        clearUserShoppingList(list._id);
        setIsLoading(true);
      }}
    >
      Clear
    </Button>
    <Button
    size="sm"
    variant="light"
      style={{ float: "right", marginTop: 2 }}
      onClick={() => alert("this")}
    >
      Export
    </Button>
  </div>
  );
};

//The parent component that render with the above, as the shopping list screen
export const ShoppingList = () => {
  const [list, setShoppingList] = useState(innitialShoppingListState);
  const [isLoading, setIsLoading] = useState(false);
  const [budgetTotal, setBudgetTotal] = useState(innitialBudgetTotal);

  // console.log(list?.list);

  useEffect(() => {
    setIsLoading(true);

    getCurrentUserShoppingList().then((shoppingList) => {
      setShoppingList(shoppingList);
    });

    getBudgetTotal().then((totalBudget) => {
      setBudgetTotal(totalBudget);
      // console.log(`budget total ${budgetTotal}`);
    });

    setIsLoading(false);
  }, [isLoading]);

  // console.log(list);

  return (
    <div style={{height: 680, overflow: 'scroll'}}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
         <OverallShoppingListAndBudgetComparison budgetTotal={budgetTotal} list={list}/>
         <ShoppingListOptionsMenu list={list} setIsLoading={setIsLoading}/> 
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
