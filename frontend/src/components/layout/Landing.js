import React, { Image } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../images/logo.png";
import styled from 'styled-components';
import colorScheme from '../../styles/mainColorPallete';

//importing redux so that can check auth, and not enable already signed users from landing on this page again. they will be redirected to home.
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// Used this course for this file to connect to redux, which helped me with the authentication flow and allowed for alert messages if login was incorrect 
// -------------------------------------------------------------------------------------------------------------

const LandingPageSection = styled.section`
  background-color: ${colorScheme.orange};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

//This is the landing page (The very first page of the application). The logo and title provide anchorage to the application's purpose.

export const Landing = ({ isAuthenticated }) => {

  //if the user is logged in, they should be redirected to their home page
  if(isAuthenticated){
    return <Redirect to='/home'/>
  }

  return (
    <LandingPageSection>
        <div className="landing-inner">
        <img alt={'logo'} src={logo}/>
          <h1 className="x-large">UniCookBook</h1>
          <p className="lead">Learn, Cook and Budget</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
    </LandingPageSection>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

//course helped me with this particular area
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
