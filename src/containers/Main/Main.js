import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Menu from '../Menu/Menu';
import Users from '../Users/Users';
import Login from '../Login/Login';

import styles from './Main.style';

import { getCurrentUser, getUsers} from '../../store/actions';

class Main extends Component {
  componentWillMount() {
    const { token, fetchCurrentUser, fetchUsers } = this.props;
    // fetchCurrentUser({ token });
    // fetchUsers({ token });
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div style={styles.container}>
        {!isLoggedIn && <Redirect to='/login' />}
        <Menu />
        <div style={styles.console}>
          {/* <Route exact path='/users' component={UsersHeader} />
          <Route exact path='/tags' component={TagsHeader} /> */}

          <div style={styles.content}>
            {/* <Route exact path='/users' component={Users} /> */}
            {/* <Route exact path='/album/edit/:id' component={EditAlbum} />
            <Route exact path='/album/:albumId/photos' component={PhotoList} /> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.payload.token,
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  // fetchCurrentUser: data => dispatch(getCurrentUser(data)),
  // fetchUsers: data => dispatch(getUsers(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
