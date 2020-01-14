import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../Login/Login';
import Main from '../Main/Main';
import styles from './App.style';

class App extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Router>
        <div style={styles.appContainer}>
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(App);
