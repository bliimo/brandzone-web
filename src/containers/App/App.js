import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import styles from './App.style';
class App extends Component {
  render() {
    return (
      <Router>
        <div style={styles.appContainer}>
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(App);
