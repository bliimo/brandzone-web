import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from './Home.style';
import { loginUser } from '../../store/actions';
import HomeTab from '../../components/HomeTab';

class Home extends PureComponent {
  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div style={styles.main}>
        <HomeTab />
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
)(Home);
