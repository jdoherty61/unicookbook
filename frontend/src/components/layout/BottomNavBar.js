//Required imports 
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

//Icons imported
import { BsList, BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FiList } from "react-icons/fi";
import { FaPiggyBank } from "react-icons/fa";
import { GiCook } from "react-icons/gi";

//Styled imported
import styled from "styled-components";
import colorScheme from "../../styles/mainColorPallete";

export const BottomNavBar = () => {

  return (
    <>
      <nav className="bottomNavbar">
        {/* IN MAIN PAGES */}
        <ul>
          <li>
            <Button style={{ backgroundColor: colorScheme.orange }}>
              <AiFillHome style={{ color: "black" }} size={25} />
            </Button>
          </li>
          <li>
          <Button style={{ backgroundColor: colorScheme.orange }}>
              <FiList style={{ color: "black" }} size={25} />
            </Button>
          </li>
          <li>
          <Button style={{ backgroundColor: colorScheme.orange }}>
              <BsSearch style={{ fill: "black" }} size={25} />
            </Button>
          </li>
          <li>
          <Button style={{ backgroundColor: colorScheme.orange }}>
              <FaPiggyBank style={{ fill: "black" }} size={25} />
            </Button>
          </li>
          <li>
          <Button style={{ backgroundColor: colorScheme.orange }}>
              <GiCook style={{ fill: "black" }} size={25} />
            </Button>
          </li>

          {/* IN ONLY SIGN IN, AUTH PAGES
          <li style={{fontWeight: "bold"}}>
            2020Vision{"\u00A9"}
          </li> */}
        </ul>
      </nav>
    </>
  );
};

export default BottomNavBar;
