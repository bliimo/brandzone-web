import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBIcon } from 'mdbreact';
import { NavLink, Redirect } from 'react-router-dom';
import SideBar from './SideBar';
import Text from './Text';
import logo from '../assets/images/logo.png';
import { logout } from '../store/actions';
import { connect } from 'react-redux';
const Profile = ({ OnHandleShowSideBar }) => {
  return (
    <div className='d-flex' style={style.profile}>
      <div className='d-flex' id='profile-lg'>
        <img src={'https://i.pravatar.cc/28'} style={style.avatar} alt='profile' />
        <Text style={style.userName}>Hi, User Name!</Text>
        <span style={style.divider}></span>
      </div>
      <span onClick={() => OnHandleShowSideBar()}>
        <MDBIcon icon='bars' style={style.bars} id='bars' />
      </span>
    </div>
  );
};

class Header extends Component {
  state = {
    show: false,
    onLogout: null,
    isLoggedIn: null,
    isLoggingIn: null,
    payload: null
  };

  OnHandleShowSideBar = () => {
    this.setState({ show: !this.state.show });
  };

  componentWillReceiveProps(newProps) {
    const { onLogout, isLoggedIn, isLoggingIn } = newProps;
    console.log(newProps);
    this.setState({ onLogout, isLoggedIn, isLoggingIn });
  }

  render() {
    const { onLogout, isLoggedIn } = this.state;
    return (
      <div>
        <MDBNavbar color='transparent' expand='md' className='header-nav'>
          <MDBNavbarBrand>
            <NavLink to='/'>
              <img src={logo} alt='logo' className='logo' />
            </NavLink>
          </MDBNavbarBrand>
          {isLoggedIn && (
            <MDBNavbarNav right>
              <MDBNavItem>
                <Profile OnHandleShowSideBar={this.OnHandleShowSideBar} />
              </MDBNavItem>
            </MDBNavbarNav>
          )}
        </MDBNavbar>
        {isLoggedIn && (
          <SideBar
            show={this.state.show}
            OnHandleShowSideBar={this.OnHandleShowSideBar}
            onLogout={onLogout}
          />
        )}
      </div>
    );
  }
}

const style = {
  userName: {
    position: 'relative',
    top: 6,
    paddingLeft: '1.1em',
    paddingRight: '1.2em',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#fff',
    letterSpacing: 1
  },
  bars: {
    position: 'relative',
    top: 4
  },
  brand: {
    color: '#fff'
  },
  divider: {
    marginLeft: '.6em',
    marginRight: '1.6em',
    height: 15,
    width: 1,
    border: '0.1px solid rgba(255, 255, 255, 0.28)',
    position: 'relative',
    top: 7
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 4
  },
  profile: {
    position: 'relative',
    bottom: '.4em',
    right: '.8em'
  }
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
