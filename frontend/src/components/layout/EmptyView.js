import React from "react"; //https://reactjs.org/

import colorScheme from "../../styles/mainColorPallete";
import logo from '../../images/logo.png';

//This is an empty view with the logo of the application
//It just allows users to know that there wasnt an error but that there are no recipes!
//Current seen in the 'Saved Recipes' tab, this will be empty due to the functionality being inactive.
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
