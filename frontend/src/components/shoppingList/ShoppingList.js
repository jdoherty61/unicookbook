import React, { useEffect, useState } from "react";

import { getCurrentUserShoppingList } from "../../actions/shoppingList";
import { getCurrentUserBudget } from "../../actions/userBudget";
import Spinner from "../layout/CustomSpinner";

// should i connect this to redux?

//innitial states
const innitialShoppingListState = [];
const innitialBudgetTotal = null;

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
  const [shoppingList, setShoppingList] = useState(innitialShoppingListState);
  const [isLoading, setIsLoading] = useState(false);
  const [budgetTotal, setBudgetTotal] = useState(innitialBudgetTotal);

  useEffect(() => {
    setIsLoading(true);
    
    getCurrentUserShoppingList().then((list) => {
      console.log(list);
      setShoppingList(list);
      //function to get the shopping list total
    });

    getBudgetTotal().then(() => {
      setBudgetTotal(budgetTotal);
    });

    setIsLoading(false);
  }, []);

  return (
    <div>{isLoading ? <Spinner /> : <h1> This is the shopping list </h1>}</div>
  );
};

export default ShoppingList;
