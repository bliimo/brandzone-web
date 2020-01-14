import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';
import Text from '../../components/Text';
import Swal from 'sweetalert2';

import SectionLabel from '../../components/SectionLabel';

import styles from './Menu.style';

class Menu extends Component {
  logoutHandler = e => {
    const { onLogout } = this.props;
    Swal.fire({
      title: 'Logout Account',
      text: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.value) {
        onLogout();
      }
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.label}>
          <SectionLabel textAlign='center' category='h2' color='black'>
            RND Template
          </SectionLabel>
        </div>
        <div style={styles.menuItems}>
          <NavLink className='navlink' exact to='/' activeStyle={styles.activeNavLink} style={styles.navLink}>
            ACCOUNT SETTINGS
          </NavLink>

          <NavLink className='navlink' exact to='/articles' activeStyle={styles.activeNavLink} style={styles.navLink}>
            ARTICLES
          </NavLink>

          <NavLink className='navlink' exact to='/albums' activeStyle={styles.activeNavLink} style={styles.navLink}>
            ALBUMS
          </NavLink>

          <NavLink className='navlink' exact to='/downloads' activeStyle={styles.activeNavLink} style={styles.navLink}>
            DOWNLOADS
          </NavLink>

          <NavLink className='navlink' exact to='/users' activeStyle={styles.activeNavLink} style={styles.navLink}>
            USERS
          </NavLink>

          <NavLink className='navlink' exact to='/profiles' activeStyle={styles.activeNavLink} style={styles.navLink}>
            PROFILES
          </NavLink>

          <NavLink className='navlink' exact to='/tags' activeStyle={styles.activeNavLink} style={styles.navLink}>
            TAGS
          </NavLink>

          <NavLink className='navlink' exact to='/banners' activeStyle={styles.activeNavLink} style={styles.navLink}>
            BANNERS
          </NavLink>

          <button className='navlink' type='button' onClick={this.logoutHandler} style={styles.logoutBtn}>
            <Text>LOG OUT</Text>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
