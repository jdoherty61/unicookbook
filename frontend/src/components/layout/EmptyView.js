import React from "react"; //https://reactjs.org/

import colorScheme from "../../styles/mainColorPallete";
import logo from '../../images/logo.png';

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// Used this course for this file to connect to redux, which helped me with the authentication flow and allowed for alert messages if login was incorrect 
// -------------------------------------------------------------------------------------------------------------

export const EmptyView = ({ type }) => {
  return (
    <div
      style={{ justifyContent: "center", textAlign: 'center', alignItems: "center", paddingTop: 20 }}
    >
      <h5 style={{ color: colorScheme.textBlue }}>
        There are currently 0 {type} recipes!
      </h5>
      <img
        src={logo}
        style={{
          width: 200,
          height: 200,
          opacity: 0.4,
          borderRadius: 100,
          borderColor: "black",
          borderWidth: 1,
          marginTop: 20,
        }}
      />
                  <div style={{color: colorScheme.textBlue, padding: 20, textAlign: 'center'}}>
                Once you have recipes, you can quickly find them here.
            </div>
    </div>
  );
};

export default EmptyView;
