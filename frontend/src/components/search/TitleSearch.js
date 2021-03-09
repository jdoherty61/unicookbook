//Imports
import React, { useEffect, useState } from "react"; //https://reactjs.org/
import { FlatList } from "react-native-web"; //https://reactnative.dev/docs/flatlist

//Custom components
import { MiniRecipeCard } from "../post/MiniRecipeCard";
import Spinner from "../layout/CustomSpinner";
import EmptyView from "../layout/EmptyView";

//Custom actions
import { getRecipesBasedOnTitle } from "../../actions/search";

//Search Screen Results.
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

//Parent component - title search. So results based off the title people input.
export const TitleSearch = ({ match }) => {
  const title = match.params.id;
  console.log(title);

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getRecipesBasedOnTitle(title).then((data) => {
      setRecipes(data);
      console.log(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>{isLoading ? <Spinner /> : <Results recipes={recipes} title={title} />}</>
  );
};

export default TitleSearch;
