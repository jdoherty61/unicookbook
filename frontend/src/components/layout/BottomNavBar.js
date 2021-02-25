//Required imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";

//connecting to redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

//Icons imported
import { BsList, BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FiList } from "react-icons/fi";
import { FaPiggyBank } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { useHistory } from "react-router-dom";

//Styled imported
import styled from "styled-components";
import colorScheme from "../../styles/mainColorPallete";

const StyledButton = styled(Button)`
  background-color: ${colorScheme.orange};
`;

const initialButtonState = {
  home: false,
  shoppinglist: false,
  search: false,
  calculate: false,
  profile: false,
};

const UserNavigationBarContent = () => {
  const [buttonState, setButtonState] = useState(initialButtonState);

  const history = useHistory();
  // console.log(buttonState);

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
        {/* <StyledButton onClick={() => history.push("/home")}> */}
        <AiFillHome style={{ color: homeColor }} size={25} />
        {/* </StyledButton> */}
      </Link>

      <Link
        onClick={() =>
          setButtonState({ ...initialButtonState, shoppinglist: true })
        }
        to="/shoppingList"
      >
        {/* <StyledButton onClick={() => history.push("/shoppingList")}> */}
        <FiList style={{ color: shoppingListColor }} size={25} />
        {/* </StyledButton> */}
      </Link>

      <Link
        onClick={() => setButtonState({ ...initialButtonState, search: true })}
        to="/search"
      >
        {/* <StyledButton onClick={() => history.push("/search")}> */}
        <BsSearch style={{ color: searchListColor }} size={30} />
        {/* </StyledButton> */}
      </Link>

      <Link
        onClick={() =>
          setButtonState({ ...initialButtonState, calculate: true })
        }
        to="/budgetCalculator"
      >
        {/* <StyledButton onClick={() => history.push("/budgetCalculator")}> */}
        <FaPiggyBank style={{ color: calculatorColor }} size={25} />
        {/* </StyledButton> */}
      </Link>

      <Link
        onClick={() => setButtonState({ ...initialButtonState, profile: true })}
        to="/myprofile"
      >
        {/* <StyledButton onClick={() => history.push("/myprofile")}> */}
        <GiCook style={{ color: profileColor }} size={25} />
        {/* </StyledButton> */}
      </Link>
    </>
  );
};

const FooterForAuthPages = () => {
  return (
    <ul>
      {/* IN ONLY SIGN IN, AUTH PAGES */}
      <li style={{ fontWeight: "bold" }}>2020Vision{"\u00A9"}</li>
    </ul>
  );
};

export const BottomNavBar = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <>
      <nav className="bottomNavbar">
        {!loading && isAuthenticated ? (
          <UserNavigationBarContent />
        ) : (
          <FooterForAuthPages />
        )}
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(BottomNavBar);
