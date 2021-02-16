import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TopNavBar from "./components/layout/TopNavBar";
import Landing from "./components/layout/Landing";
import BottomNavBar from "./components/layout/BottomNavBar";
//Authorisation components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//Redux imports 
import { Provider } from "react-redux"; //need a provider to pass all the information created by the redux/reducer down to components
import store from "./store"; //store created

import Alert from './components/layout/Alert';


import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        {/* <TopNavBar/> */}
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
        {/* <BottomNavBar/> */}
      </>
    </Router>
  </Provider>
);

export default App;
