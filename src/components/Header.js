import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBIcon } from 'mdbreact';
import { NavLink, Redirect } from 'react-router-dom';
import SideBar from './SideBar';
import Text from './Text';
import logo from '../assets/images/logo.png';
import { loginUser, logoutUser } from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

  componentWillReceiveProps(nextProps) {}

  render() {
    const { auth } = this.props;
    return (
      <div>
        <MDBNavbar color='transparent' expand='md' className='header-nav'>
          <MDBNavbarBrand>
            <NavLink to='/'>
              <img src={logo} alt='logo' className='logo' />
            </NavLink>
          </MDBNavbarBrand>
          {auth.isAuthenticated && (
            <MDBNavbarNav right>
              <MDBNavItem>
                <Profile OnHandleShowSideBar={this.OnHandleShowSideBar} />
              </MDBNavItem>
            </MDBNavbarNav>
          )}
        </MDBNavbar>
        {auth.isAuthenticated && (
          <SideBar
            show={this.state.show}
            OnHandleShowSideBar={this.OnHandleShowSideBar}
            onLogout={this.props.logoutUser}
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
  auth: state.auth,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(withRouter(Header));
