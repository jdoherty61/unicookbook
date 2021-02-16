import React, { useState } from "react";
// import axios from "axios";
// import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";


//make an innitial state
const initialState = {
  email: "",
  password: ""
};

export const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const {
    email,
    password
  } = formData;

  //Allows to set state of individual members within the state using the name on the inpurt and the value.
  const onChange = (val) => setFormData({ ...formData, [val.target.name]: val.target.value });


  const onSubmit = async (data) => {
    data.preventDefault();
        console.log('SUCCESS');
    //   const newUser = {    
    //     name,
    //     email,
    //     password,
    //     degree,
    //     yearOfDegree,
    //     university
    //  };

    //     console.log(newUser);
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         };

    //         const body = JSON.stringify(newUser);
    //         console.log(body);

    //         const res = await axios.post('/api/users', body, config);
    //         console.log(res.data);

    //     } catch (err) {
    //         console.error(err.response.data);
    //     }
  };

  return (
    <>
    <div style={{textAlign: 'center'}}>
      <img alt={"logo"} src={logo} style={{ height: 100, width: 100}} />
      </div>
      <h1 className="large text-primary">Sign In</h1>
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
    </>
  );
};

export default Login;
