import React from "react";
import spinner from "./spinner.gif"; //was going to use gif instead.
import { Spinner } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/
import colorScheme from "../../styles/mainColorPallete";

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
