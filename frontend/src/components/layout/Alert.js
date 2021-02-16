import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
