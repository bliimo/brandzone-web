import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import styles from './Event.style';
import { login } from '../../store/actions';
import Header from '../../components/Header';
import EventTab from '../../components/EventTab';

class Event extends PureComponent {
  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div style={styles.main}>
        <Header />
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
  onLogin: data => dispatch(login(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
