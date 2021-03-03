import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// Used this course for this file to connect to redux, which helped me with the authentication flow and allowed for alert messages if login was incorrect 
// -------------------------------------------------------------------------------------------------------------

//Creating an alert, making sure the alerts array 
// that is pass is of length more than 0 or exists, and then providing an alert
// with a template literal string as className to target correct css.

const Alert = ({ alerts }) => alerts !== 0 && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>

))

alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

//mapping the redux state
const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
