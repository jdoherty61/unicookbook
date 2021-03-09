import React, { useEffect, useState } from "react"; //https://reactjs.org/
import { FlatList } from "react-native-web"; //https://reactnative.dev/docs/flatlist

import { MiniRecipeCard } from "../post/MiniRecipeCard";
import Spinner from "../layout/CustomSpinner";
import EmptyView from "../layout/EmptyView";

import { getRecipesBasedOffUserPreferences } from "../../actions/search";

const Results = ({ recipes, title }) => {
  //If there are no results (empty array), display the empty view, else render the flat list.
  if (recipes.length === 0) {
    return <EmptyView type={title} />;
  }

  return (
    <FlatList
      horizontal={false}
      data={recipes}
      keyExtractor={(item) => item._id}
      numColumns={3}
      renderItem={(recipe) => <MiniRecipeCard recipe={recipe.item} />}
    />
  );
};

// search results based off user preferences
export const UserPreferencesSearchResults = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getRecipesBasedOffUserPreferences().then((data) => {
      setRecipes(data);
      console.log(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? <Spinner /> : <Results recipes={recipes} title={"User Preferences"} />}
    </>
  );
};

export default UserPreferencesSearchResults;
