import React, {useEffect, useState} from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { getRecipesBasedOffUserPreferences } from '../../actions/search';
import { FlatList } from "react-native-web";
import { MiniRecipeCard } from "../post/MiniRecipeCard";
import Spinner from "../layout/CustomSpinner";

export const UserPreferencesSearchResults = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getRecipesBasedOffUserPreferences().then(data => {
      setRecipes(data);
      console.log(data);
      setIsLoading(false);
    });

  }, []);

  //NEED AN EMPTY SAYING THERE IS NO RECIPES STATE!


  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          horizontal={false}
          data={recipes}
          keyExtractor={(item) => item._id}
          numColumns={3}
          renderItem={(recipe) => <MiniRecipeCard recipe={recipe.item} />}
        />
      )}
    </>
  );
};

export default UserPreferencesSearchResults;
