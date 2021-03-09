import React from "react";
import { Spinner } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/
// import spinner from "./spinner.gif"; //was going to use gif instead. //http://superstorefinder.net/support/knowledgebase/customizing-loading-icons/
import colorScheme from "../../styles/mainColorPallete";

//Custom spinner created for when screens are loading data from the database.
// This can be seen in most screens and effects the overall performance as users are able to see that the screen is loading as opposed to broke
const CustomSpinner = () => {
  return (
    <>
      {/* // <Spinner animation="border" variant="secondary" />  */}
      {/* https://davidbaptistechirot.blogspot.com/2017/03/loading-gif-generator-transparent.html */}
      {/* <img
        src={spinner}
        style={{
          width: "200px",
          margin: "auto",
          display: "block",
          borderRadius: 150,
          opacity: 0.9,
          marginTop: 250,
        }}
        alt='Loading...'
      /> */}
      <Spinner
        style={{
          margin: "auto",
          display: "block",
          borderRadius: 150,
          opacity: 0.9,
          marginTop: 250,
          textAlign: "center",
          color: colorScheme.blue,
        }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </>
  );
};

export default CustomSpinner;
