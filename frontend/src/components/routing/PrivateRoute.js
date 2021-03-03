import React from "react"; //https://reactjs.org/
import { Route, Redirect } from "react-router-dom"; //https://reactrouter.com/web/guides/quick-start
import PropTypes from "prop-types"; //https://www.npmjs.com/package/prop-types
import { connect } from "react-redux"; //https://react-redux.js.org/introduction/quick-start

//Making a private route component
//This is to prevent users from accessing the pages without being signed in
// So pages that would be considered private would be the homepage etc
//essentially taking in the Route from react-router-dom package, and using the auth to determine is they have authetnication to access the route.

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Helped me with creation of private routes...which requires authenticated user to access!
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------


const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
