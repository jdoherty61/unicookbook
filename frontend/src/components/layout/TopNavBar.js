import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";
import { BsList, BsSearch } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";

//connecting to redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import styled from "styled-components";

const StyledNavBar = styled(Navbar)`
background-color: ${colorScheme.orange};
box-shadow: 0px -2px 6px 6px ${colorScheme.shadow}
`;



export const TopNavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //TODO: ADD A MODAL COMPONENT AND IF OPTIONS IS CLICKED IT WILL SHOW THE MODAL! - SIGN OUT ETC

  //I only want to show the nav bar when the users are signed in.
  return (
    <>
      {!loading && isAuthenticated && (
        // <nav className="navbar">
        //   <ul>
        //     <li>
        //       <Link to="/options">
        //         {/* This should display a modal and allow to sign out, user preferences etc. */}
        //         <Button style={{ backgroundColor: colorScheme.orange, paddingRight: 70 }}>
        //           <BsList style={{ color: "black" }} size={25} />
        //         </Button>
        //       </Link>
        //     </li>
        //     <li style={{ fontSize: 25, color: colorScheme.basicText }}>
        //       UniCookBook
        //     </li>
        //     <li>
        //       <Link to="/addRecipe">
        //         <Button style={{ backgroundColor: colorScheme.orange, paddingLeft: 70 }}>
        //           <GrAdd style={{ color: "black" }} size={25} />
        //         </Button>
        //       </Link>
        //     </li>
        //   </ul>
        // </nav>
        <StyledNavBar>
          {/* <div> */}
          <Nav className="justify-content-center">
            <Nav.Link style={{paddingRight: 70}} href="/options">
              {/* <Button style={{ backgroundColor: colorScheme.orange }}> */}
                <BsList style={{ color: "black" }} size={25} />
              {/* </Button> */}
            </Nav.Link>
            <Navbar.Brand>UniCookbook</Navbar.Brand>
            <Nav.Link style={{paddingLeft: 70}} href="/addRecipe">
    
                {/* <Button style={{ backgroundColor: colorScheme.orange }}> */}
                  <GrAdd style={{ color: "black" }} size={25} />
                {/* </Button> */}
            
            </Nav.Link>
          </Nav>
          {/* </div> */}
        </StyledNavBar>
      )}
    </>
  );
};

TopNavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(TopNavBar);
