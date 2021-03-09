import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

//connecting to redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import { Navbar, Nav } from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";
import { BsList } from "react-icons/bs";
import { BiExport, BiFilterAlt } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { HiPencil } from "react-icons/hi";
import styled from "styled-components";

const StyledNavBar = styled(Navbar)`
  background-color: ${colorScheme.orange};
  box-shadow: 0px -2px 6px 6px ${colorScheme.shadow};
`;

// Refactor in future - styling, paddingRight and paddingLeft could be replaced with stronger code to maintain consistency.
// Duplication of some elements which can definitely be refactored.
// add sliding menu https://react-flexible-sliding-menu.netlify.app/getting-started - for options icon! 
// This would be used in the future for students to sign out, edit accout and view about us and contact us screens!

const AddRecipeNavigationBar = () => {
  const history = useHistory();
  return (
    <Nav className="justify-content-center">
      <Nav.Link style={{ paddingRight: 80 }}>
        {/* Having to use the Link component from router dom as it prevents complete refresh of pages */}
        <Link onClick={() => history.goBack()}>
          <IoIosArrowBack style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
      <Navbar.Brand>Add Recipe</Navbar.Brand>
      <Nav.Link
        style={{ paddingLeft: 80 }}
        onClick={() => {
          console.log(
            "this should be able to submit and redirect - need to refactor to ensure this works"
          );
        }}
      >
        <GrAdd style={{ color: "black" }} size={25} />
      </Nav.Link>
    </Nav>
  );
};

const DefaultNavigationBarContent = () => {
  return (
    <Nav className="justify-content-center">
      <Nav.Link style={{ paddingRight: 70 }}>
        <Link to="/options">
          <BsList style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
      <Navbar.Brand>UniCookBook</Navbar.Brand>
      <Nav.Link style={{ paddingLeft: 70 }} href="/addRecipe">
        <Link to="/addRecipe">
          <HiPencil style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
    </Nav>
  );
};

const ShoppingListNavBarContent = () => {
  return (
    <Nav className="justify-content-center">
      <Nav.Link style={{ paddingRight: 70 }}>
        <Link to="/options">
          <BsList style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
      <Navbar.Brand>Shopping List</Navbar.Brand>
      <Nav.Link style={{ paddingLeft: 70 }}>
        <Link to="#">
          <BiExport style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
    </Nav>
  );
};

const SearchNavBarContent = () => {
  return (
    <Nav className="justify-content-center">
      <Nav.Link style={{ paddingRight: 60 }}>
        <Link to="/filter">
          <BiFilterAlt style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
      <Navbar.Brand>Search Recipes</Navbar.Brand>
      <Nav.Link style={{ paddingLeft: 60 }} href="/addRecipe">
        <Link to="/addRecipe">
          <HiPencil style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
    </Nav>
  );
};

const BudgetCalculatorNavbarContent = () => {
  return (
    <Nav className="justify-content-center">
      <Nav.Link style={{ paddingRight: 55 }} href="/options">
        <Link to="/options">
          <BsList style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
      <Navbar.Brand>Budget Calculator</Navbar.Brand>
      <Nav.Link style={{ paddingLeft: 55 }} href="/addRecipe">
        <Link to="/addRecipe">
          <HiPencil style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
    </Nav>
  );
};

const MyProfileNavBarContent = () => {
  return (
    <Nav className="justify-content-center">
      <Nav.Link style={{ paddingRight: 70 }} href="/options">
        <Link to="/options">
          <BsList style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
      <Navbar.Brand>My CookBook</Navbar.Brand>
      <Nav.Link style={{ paddingLeft: 70 }} href="/addRecipe">
        <Link to="/addRecipe">
          <HiPencil style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
    </Nav>
  );
};

const SearchResultsNavBarContent = () => {
  const history = useHistory();
  return (
    <Nav className="justify-content-center">
      <Nav.Link style={{ paddingRight: 70 }}>
        <Link onClick={() => history.goBack()}>
          <IoIosArrowBack style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
      <Navbar.Brand>Search Results</Navbar.Brand>
      <Nav.Link style={{ paddingLeft: 60 }} href="/addRecipe">
        <Link to="/addRecipe">
          <Link to="/addRecipe">
            <HiPencil style={{ color: "black" }} size={25} />
          </Link>
        </Link>
      </Nav.Link>
    </Nav>
  );
};

const FilterUserPreferencesNavBar = () => {
  const history = useHistory();
  return (
    <Nav className="justify-content-center">
      <Nav.Link style={{ paddingRight: 60 }}>
        <Link onClick={() => history.goBack()}>
          <IoIosArrowBack style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
      <Navbar.Brand>User Preferences</Navbar.Brand>
      <Nav.Link style={{ paddingLeft: 60 }} href="/addRecipe">
        <Link to="/addRecipe">
          <HiPencil style={{ color: "black" }} size={25} />
        </Link>
      </Nav.Link>
    </Nav>
  );
};

//Using a switch statement here so that when the screen route is changed, the navigation bar will be updated with it to suit that view.
// I wanted to maintain this as one component instead of multiple headers in every components file so it would just render once and change details as opposed to everytime a screen has changed!

const NavContent = () => {
  const currentPage = useLocation().pathname; //Using the router-dom to retrieve current location, therefore set the navigation bar to appropiate
  //Switch statement to determine the contents of the navigation bar, Will allow for different functionality etc.

  switch (currentPage) {
    case "/addRecipe":
      return <AddRecipeNavigationBar />;
    case "/shoppingList":
      return <ShoppingListNavBarContent />;
    case "/search":
      return <SearchNavBarContent />;
    case "/budgetCalculator":
      return <BudgetCalculatorNavbarContent />;
    case "/myprofile":
      return <MyProfileNavBarContent />;
    case "/searchresults":
    case "/search/userpreferences":
    case "/search/unisearch":
    case "/search/titlesearch/title":
    case "/search/titlesearch": //doesn't work due to the param being passed causing the URL to change - could use if statematement or return nothing and then render the top nav INSIDE the search results - other way is to change the param being passed in and just use state in of the route
      return <SearchResultsNavBarContent />;
    case "/filter":
      return <FilterUserPreferencesNavBar />;
    default:
      return <DefaultNavigationBarContent />;
  }
};

//This is the component that will be exported! So this is used in the App.js file ... And all of the above is logic within it as you can see by imports.
export const TopNavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //TODO: ADD A MODAL COMPONENT AND IF OPTIONS IS CLICKED IT WILL SHOW THE MODAL! - SIGN OUT ETC
  // console.log(useLocation().pathname);
  const [openPanel, setOpenPanel] = useState(true);
  //I only want to show the nav bar when the users are signed in.
  return (
    <>
      {!loading && isAuthenticated && (
        <StyledNavBar sticky="top">
          <NavContent />
        </StyledNavBar>
      )}
    </>
  );
};

TopNavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// Used this course for this file to connect to redux, which helped me with the authentication flow and allowed for alert messages if login was incorrect 
// -------------------------------------------------------------------------------------------------------------

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(TopNavBar);