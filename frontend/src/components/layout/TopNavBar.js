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

export const TopNavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //TODO: ADD A MODAL COMPONENT AND IF OPTIONS IS CLICKED IT WILL SHOW THE MODAL! - SIGN OUT ETC 

  //I only want to show the nav bar when the users are signed in.
  return (
    <>
      {!loading && isAuthenticated && (
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/options.html">
                {/* This should display a modal and allow to sign out, user preferences etc. */}
                <Button style={{ backgroundColor: colorScheme.orange }}>
                  <BsList style={{ color: "black" }} size={25} />
                </Button>
              </Link>
            </li>
            <li style={{ fontSize: 25, color: colorScheme.basicText }}>
              UniCookBook
            </li>
            <li>
              <Link to="/addRecipe">
                <Button style={{ backgroundColor: colorScheme.orange }}>
                  <GrAdd style={{ color: "black" }} size={25} />
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
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
