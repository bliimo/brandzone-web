import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import styles from './Event.style';
import { loginUser } from '../../store/actions';
import EventTab from '../../components/EventTab';

class Event extends PureComponent {
  render() {
    return (
      <div style={styles.main}>
        <EventTab />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
