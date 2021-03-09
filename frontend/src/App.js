// Required imports from package.json
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Private routing component created
import PrivateRoute from './components/routing/PrivateRoute';

//General layout
import TopNavBar from "./components/layout/TopNavBar";
import Landing from "./components/layout/Landing";
import BottomNavBar from "./components/layout/BottomNavBar";

//Authorisation components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//Created Screens
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
import Advice from './components/advice/Advice';
import { Filter } from "./components/search/Filter";

//Redux imports
import { Provider } from "react-redux"; //need a provider to pass all the information created by the redux/reducer down to components
import store from "./store"; //store created

import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

//styling
import 'bootstrap/dist/css/bootstrap.min.css';  //https://react-bootstrap.github.io/getting-started/introduction
import "./App.css"; // https://www.udemy.com/share/101WIoAEYbcV9RRnUD/ helped with this.


// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// Helped with understanding overall authentication.

//Libraries used throughout most files
// REACT JS - https://reactjs.org/
// REACT BOOTSTRAP UI FRAMEWORK - https://react-bootstrap.github.io/
// REACT-ICONS - https://react-icons.github.io/react-icons
// FONT AWESOME - https://fontawesome.com/icons?d=gallery&p=1 
// STYLED-COMPONENTS - https://styled-components.com/
// -------------------------------------------------------------------------------------------------------------

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
              <PrivateRoute exact path="/advice" component={Advice} />
            </Switch>
          </section>
          <BottomNavBar />
        </>
      </Router>
    </Provider>
  );
};

export default App;
