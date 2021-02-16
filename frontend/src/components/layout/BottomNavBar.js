//Required imports
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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

const UserNavigationBarContent = () => {
  const history = useHistory();

  return (
    <ul>
      <li>
        {/* <Link to="/home.html"> */}
        <StyledButton onClick={() => history.push("/home")}>
          <AiFillHome style={{ color: "black" }} size={25} />
        </StyledButton>
        {/* </Link> */}
      </li>
      <li>
        {/* <Link to="/shoppingList.html"> */}
        <StyledButton onClick={() => history.push("/shoppingList")}>
          <FiList style={{ color: "black" }} size={25} />
        </StyledButton>
        {/* </Link> */}
      </li>
      <li>
        {/* <Link to="/search.html"> */}
        <StyledButton onClick={() => history.push("/search")}>
          <BsSearch style={{ fill: "black" }} size={25} />
        </StyledButton>
        {/* </Link> */}
      </li>
      <li>
        {/* <Link to="/budgetCalculator.html"> */}
        <StyledButton onClick={() => history.push("/budgetCalculator")}>
          <FaPiggyBank style={{ fill: "black" }} size={25} />
        </StyledButton>
        {/* </Link> */}
      </li>
      <li>
        {/* <Link to="/profile.html"> */}
        <StyledButton onClick={() => history.push("/myprofile")}>
          <GiCook style={{ fill: "black" }} size={25} />
        </StyledButton>
        {/* </Link> */}
      </li>
    </ul>
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
