import React, { useState } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link, Redirect } from "react-router-dom";
import logo from "../../images/logo.png";
import PropTypes from 'prop-types'
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import colorScheme from "../../styles/mainColorPallete";

//working with redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

//make an innitial state
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  degree: "",
  yearOfDegree: null,
  university: "",
};

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState(initialState);

  const {
    name,
    email,
    password,
    password2,
    degree,
    yearOfDegree,
    university
  } = formData;

  //Allows to set state of individual members within the state using the name on the inpurt and the value.
  const onChange = (val) =>
    setFormData({ ...formData, [val.target.name]: val.target.value });

  const onSubmit = async (data) => {
    data.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", 'danger'); 
      // console.log("Passwords do not match");
    } else {
      register({
        name,
        email,
        password,
        password2,
        degree,
        yearOfDegree,
        university
      });
    }
  };

  //If register successful 
  if(isAuthenticated){
    return <Redirect to="/home"/>
  }

  return (
    <>
          <div>
        <Link to="/">
          <IoIosArrowBack style={{ color: "black" }} size={25} />
        </Link>
      </div>
    <div style={{textAlign: 'center'}}>
      <img alt={"logo"} src={logo} style={{ height: 100, width: 100}} />
      </div>
      <h1 className="large text-primary">Sign Up</h1>
      <form className="form" onSubmit={(data) => onSubmit(data)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(val) => onChange(val)}
            name="name"
            required
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(val) => onChange(val)}
          />
        </div>
        <div className="form-group">
          <Dropdown
            options={[
              "Computing and Information Technology",
              "Computer Science",
              "Software Engineering",
              "Economics and Finance",
              "Chemistry",
              "Media Studies",
            ]} //This would be populated by multiple courses in the UK university, for now just have a few. But this should be dynamically retrieved from the database
            value={degree}
            onChange={(val) => setFormData({ ...formData, degree: val.value })}
            placeholder="University Course"
            required
          />
        </div>
        <div className="form-group">
          <Dropdown
            options={[1, 2, 3, 4]}
            value={yearOfDegree}
            onChange={(val) =>
              setFormData({ ...formData, yearOfDegree: val.value })
            }
            placeholder="Year of Degree"
            required
          />
        </div>
        <div className="form-group">
          <Dropdown
            options={[
              "Queen's University, Belfast",
              "Ulster University, Belfast",
              "Hope University, Liverpool",
              "Stirling University",
            ]}
            value={university}
            onChange={(val) =>
              setFormData({ ...formData, university: val.value })
            }
            placeholder="University"
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Sign up" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

Register.propTypes = {
  //Standard - ensuring that the props being passed into this component are of type stated below.
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
