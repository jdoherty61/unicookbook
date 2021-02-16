import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";
import { BsList, BsSearch } from "react-icons/bs";
import {GrAdd} from "react-icons/gr";

export const TopNavBar = () => {
  return (
    <nav className="navbar">
      {/* <h1>
          <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
        </h1> */}
      <ul>
        <li>
          <Link to="/profiles.html">
            <Button style={{ backgroundColor: colorScheme.orange }}>
              <BsList style={{ color: "black" }} size={25} />
            </Button>
          </Link>
        </li>
        <li style={{fontSize: 25, color: colorScheme.basicText}}>
         UniCookBook
        </li>
        <li>
          <Link to="/register">
            <Button style={{ backgroundColor: colorScheme.orange }}>
              <GrAdd style={{ color: "black" }} size={25} />
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavBar;
