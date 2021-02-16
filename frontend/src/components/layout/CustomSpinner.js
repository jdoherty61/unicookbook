import React from "react";
import spinner from "./spinner.gif";

// import { Spinner } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
//TODO: CHANGE OVER TO REACT BOOTSTRAP styles...! 
// or use this
      {/* //Temporaty gif from website https://dribbble.com/shots/869274-Carrot-Loading-Animation */}

//If loading!

const CustomSpinner = () => {
  return (
    <>
      {/* // <Spinner animation="border" variant="secondary" />  */}
      {/* https://davidbaptistechirot.blogspot.com/2017/03/loading-gif-generator-transparent.html */}
      <img
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
      />
    </>
  );
};

export default CustomSpinner;
