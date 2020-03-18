import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import Event from '../Event/Event';
import Notification from '../Notification/Notification';
import styles from './App.style';
class App extends Component {
  render() {
    return (
      <Router>
        <div style={styles.appContainer}>
          {/* {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/login" />} */}
          <Switch>
            {/* <Route exact path="/" component={About} /> */}
            <Route exact path='/' component={Home} />
            <Route exact path='/events' component={Event} parent={this} />
            <Route
              exact
              path='/notification/:id'
              component={Notification}
              parent={this}
            />
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
