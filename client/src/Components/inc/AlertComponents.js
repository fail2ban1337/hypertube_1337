import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "@material-ui/lab";

const AlertComponents = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} style={{ width: "30%", margin: "0 auto" }}>
      <Alert severity={alert.alertType} message={{ textAlign: "center" }}>
        {alert.msg}
      </Alert>
    </div>
  ));

AlertComponents.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});
export default connect(mapStateToProps)(AlertComponents);
