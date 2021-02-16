import React, { Image } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../images/logo.png";
import styled from 'styled-components';
import colorScheme from '../../styles/mainColorPallete';

//importing redux so that can check auth, and not enable already signed users from landing on this page again. they will be redirected to home.
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LandingPageSection = styled.section`
  background-color: ${colorScheme.orange};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;


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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
