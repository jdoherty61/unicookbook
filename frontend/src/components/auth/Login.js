import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import colorScheme from "../../styles/mainColorPallete";
import logo from "../../images/logo.png";
// import "react-dropdown/style.css";

//Connecting to redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// Used this course for this file to connect to redux, which helped me with the authentication flow and allowed for alert messages if login was incorrect 
// -------------------------------------------------------------------------------------------------------------

//make an innitial state
const initialState = {
  email: "",
  password: "",
};

export const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;

  //Allows to set state of individual members within the state using the name on the inpurt and the value.
  const onChange = (val) =>
    setFormData({ ...formData, [val.target.name]: val.target.value });

  const onSubmit = async (data) => {
    data.preventDefault();
    // console.log('SUCCESS');
    login(email, password);
  };

  //redirect if logged in successful!
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div style={{ padding: 20 }}>
      <div>
        <Link to="/">
          <IoIosArrowBack style={{ color: "black" }} size={25} />
        </Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <img alt={"logo"} src={logo} style={{ height: 100, width: 100 }} />
      </div>
      <h1 style={{ color: colorScheme.blue }} className="large">
        Sign In
      </h1>
      <form className="form" onSubmit={(data) => onSubmit(data)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="University Email Address"
            name="email"
            required //html5 client side validation.
            value={email}
            onChange={(val) => onChange(val)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(val) => onChange(val)}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/Register">Sign Up</Link>
      </p>
    </div>
  );
};

login.PropTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

//Use the references course for this in particular.
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
