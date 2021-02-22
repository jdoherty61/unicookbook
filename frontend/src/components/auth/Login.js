import React, { useState } from "react";
// import axios from "axios";
// import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link, Redirect } from "react-router-dom";
import logo from "../../images/logo.png";
import { IoIosArrowBack } from "react-icons/io";

// import { Button } from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";

//Connecting to redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
