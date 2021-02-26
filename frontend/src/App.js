import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Private routing component created
import {View, Text} from 'react-native';
import PrivateRoute from './components/routing/PrivateRoute';

//General layout
import TopNavBar from "./components/layout/TopNavBar";
import Landing from "./components/layout/Landing";
import BottomNavBar from "./components/layout/BottomNavBar";

//Authorisation components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//Screens
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import BudgetCalculator from './components/budgetCalculator/BudgetCalculator';
import Search from './components/search/Search';
import ShoppingList from './components/shoppingList/ShoppingList';
import Post from './components/post/Post';
import PostForm from './components/post/PostForm';
import UserPreferencesSearchResults from './components/search/UserPreferencesSearchResults';
import UniSearchResults from './components/search/UniSearchResults';
import TitleSearch from './components/search/TitleSearch';
import Promotions from './components/promotions/Promotions';
import { Filter } from "./components/search/Filter";

//Redux imports
import { Provider } from "react-redux"; //need a provider to pass all the information created by the redux/reducer down to components
import store from "./store"; //store created

import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

//styling
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


if (localStorage.token) {
  //There must be a token inside local storage in order to have a successful authorisation. If not, there will be an authorisation error.
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //use effect - only runs once as empty paramters. Its the same as a component did mount.

  return (
    <Provider store={store}>
      <Router>
        <>
        <Route exact path="/" component={Landing} />
          <TopNavBar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/myprofile" component={Profile} />
              <PrivateRoute exact path="/budgetCalculator" component={BudgetCalculator} />
              <PrivateRoute exact path="/search" component={Search} />
              <PrivateRoute exact path="/shoppingList" component={ShoppingList} />
              
              <PrivateRoute exact path="/posts/:id" component={Post} />
              <PrivateRoute exact path="/addRecipe" component={PostForm} />

              <PrivateRoute exact path="/search/userpreferences" component={UserPreferencesSearchResults} />
              <PrivateRoute exact path="/search/unisearch" component={UniSearchResults} />
              <PrivateRoute exact path="/search/titlesearch/:id" component={TitleSearch} />
              <PrivateRoute exact path="/filter" component={Filter} />

              <PrivateRoute exact path="/promotions" component={Promotions} />



            {/* Search title - will be similar to post
              search by user preferences - can be one
              search by uni - can be one
              search by dinner/lunch dinner or snack - can be one
              promotions
              user preferences filter
            */}

            </Switch>
          </section>
          <BottomNavBar />
        </>
      </Router>
    </Provider>
  );
};

export default App;
