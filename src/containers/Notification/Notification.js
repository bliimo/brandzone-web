import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import styles from './Notification.style';
import { loginUser } from '../../store/actions';
import NotificationTab from '../../components/NotificationTab';

class Notification extends PureComponent {
  render() {
    return (
      <div style={styles.main}>
        <NotificationTab />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoggingIn: state.auth.isLoggingIn
});

const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(loginUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
