import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom'; 
import styles from './About.style';
import { login } from '../../store/actions'; 
import Header from '../../components/Header';
import Tab from '../../components/Tab';

class About extends PureComponent {

  componentDidUpdate(prevProps) { }

  render() {
    return (
        <div style={styles.main}>
            <Header/>
            <Tab/>
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
)(About);
