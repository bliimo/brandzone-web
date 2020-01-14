import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { isEmpty, isEqual } from 'lodash';

import RoundedTextInput from '../../components/RoundedTextInput';
import Text from '../../components/Text';

import styles from './Login.style';

import { login } from '../../store/actions';

class Login extends PureComponent {
  state = {
    email: '',
    password: '',
  };

  componentDidUpdate(prevProps) {
    const { isLoggingIn, isLoggedIn } = this.props;
    if (!isEqual(isLoggingIn, prevProps.isLoggingIn)) {
      if (!isLoggingIn) {
        if (!isLoggedIn) {
          alert('Incorrect e-mail or password.');
        }
      }
    }
  }

  loginHandler = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;

    if (isEmpty(email)) {
      alert('Please enter your E-mail address');
    } else if (isEmpty(password)) {
      alert('Please enter your password');
    } else {
      onLogin({
        email,
        password,
      });
    }
  };

  render() {
    const { email, password } = this.state;
    const { isLoggedIn, isLoggingIn } = this.props;
    return (
      <div style={styles.outerContainer}>
        {isLoggedIn && <Redirect to="/" />}
        <form style={styles.container} onSubmit={this.loginHandler}>
          <div style={styles.inputSection}>
            <h2 style={styles.formLabel}>RND Template Admin</h2>
            <Text textAlign="left" fontSize="0.8rem">
              Email Address
            </Text>
            <RoundedTextInput
              value={email}
              onChange={text => this.setState({ email: text })}
              fontSize="1rem"
            />
            <Text textAlign="left" fontSize="0.8rem">
              Password
            </Text>
            <RoundedTextInput
              value={password}
              onChange={text => this.setState({ password: text })}
              fontSize="1rem"
              password
            />
          </div>
          <div style={styles.buttonSection}>
            <button
              type="submit"
              style={styles.loginButton}
              onClick={this.loginHandler}
            >
              {isLoggingIn ? (
                <Loader type="Oval" color="white" height={15} width={15} />
              ) : (
                'LOG IN'
              )}
            </button>
            <NavLink
              onClick={() => alert('forgot password logic here')}
              fontSize="0.5rem"
              textAlign="center"
              style={styles.forgotPassBtn}
            >
              Forgot Password
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoggingIn: state.auth.isLoggingIn,
});

const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(login(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
