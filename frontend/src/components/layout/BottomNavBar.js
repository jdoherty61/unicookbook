//Required imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";

//connecting to redux
import { connect } from "react-redux";

//Icons imported
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FiList } from "react-icons/fi";
import { FaPiggyBank } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { useHistory } from "react-router-dom";

const initialButtonState = {
  home: false,
  shoppinglist: false,
  search: false,
  calculate: false,
  profile: false,
};

//Component is dedicated to the bottom nav bar and its icons and links associated. 
const UserNavigationBarContent = () => {
  const [buttonState, setButtonState] = useState(initialButtonState);

  const history = useHistory();
  // console.log(buttonState);

  // Changing the button based on the click - this is temporary as it is controlled via the component, should use redux or a useContext() to keep the state consistent
  const homeColor = buttonState.home === true ? "#ffffff" : "#000000";
  const shoppingListColor =
    buttonState.shoppinglist === true ? "#ffffff" : "#000000";
  const searchListColor = buttonState.search === true ? "#ffffff" : "#000000";
  const calculatorColor =
    buttonState.calculate === true ? "#ffffff" : "#000000";
  const profileColor = buttonState.profile === true ? "#ffffff" : "#000000";

  return (
    <>
      <Link
        onClick={() => setButtonState({ ...initialButtonState, home: true })}
        to="/home"
      >
        <AiFillHome style={{ color: homeColor }} size={25} />
      </Link>

      <Link
        onClick={() =>
          setButtonState({ ...initialButtonState, shoppinglist: true })
        }
        to="/shoppingList"
      >
        <FiList style={{ color: shoppingListColor }} size={25} />
      </Link>

      <Link
        onClick={() => setButtonState({ ...initialButtonState, search: true })}
        to="/search"
      >
        <BsSearch style={{ color: searchListColor }} size={30} />
      </Link>

      <Link
        onClick={() =>
          setButtonState({ ...initialButtonState, calculate: true })
        }
        to="/budgetCalculator"
      >
        <FaPiggyBank style={{ color: calculatorColor }} size={25} />
      </Link>

      <Link
        onClick={() => setButtonState({ ...initialButtonState, profile: true })}
        to="/myprofile"
      >
        <GiCook style={{ color: profileColor }} size={25} />
      </Link>
    </>
  );
};

const FooterForAuthPages = () => {
  return (
    // Styling needs refactored, this would not be cross platform.
    <ul style={{margin: '35%'}}> 
      {/* IN ONLY SIGN IN, AUTH PAGES */}
      <li style={{ fontWeight: "bold"}}>2020Vision{"\u00A9"}</li>
    </ul>
  );
};

export const BottomNavBar = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <>
      <nav className="bottomNavbar">
        {!loading && isAuthenticated ? 
          <UserNavigationBarContent />
         : 
          <FooterForAuthPages />
        }
      </nav>
    </>
  );
};

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// Used this course for this file to connect to redux, which helped me with the authentication flow and allowed for alert messages if login was incorrect
// -------------------------------------------------------------------------------------------------------------

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(BottomNavBar);
