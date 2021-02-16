import React, { Image } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import styled from 'styled-components';
import colorScheme from '../../styles/mainColorPallete';

const LandingPageSection = styled.section`
  background-color: ${colorScheme.orange};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;


export const Landing = () => {
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

export default Landing;
