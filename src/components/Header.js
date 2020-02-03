import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';
import Text from './Text';
import logo from '../assets/images/logo.png';
import { loginUser, logoutUser } from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Profile = ({ OnHandleShowSideBar, account }) => {
  const { firstName, lastName, profilePicture } = account;
  return (
    <div className='d-flex' style={style.profile}>
      <div className='d-flex' id='profile-lg'>
        <img
          src={
            profilePicture
              ? profilePicture
              : 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwih5p6w-rTnAhXPc94KHYsJBwIQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Favatar&psig=AOvVaw2fD995hEdizGvBk7WqD4bN&ust=1580804651584965'
          }
          style={style.avatar}
          alt='profile'
        />
        <Text style={style.userName}>
          Hi, {firstName} {lastName}!
        </Text>
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
    payload: null,
    account: {}
  };

  OnHandleShowSideBar = () => {
    this.setState({ show: !this.state.show });
  };

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps;
    this.setState({ account });
  }
  componentDidMount() {}

  render() {
    const { auth, OnHandleToggleHome } = this.props;
    const { account } = this.state;
    return (
      <div>
        <MDBNavbar color='transparent' expand='md' className='header-nav'>
          <MDBNavbarBrand>
            <NavLink to={auth.isAuthenticated ? '#' : '/'} onClick={OnHandleToggleHome('1')}>
              <img src={logo} alt='logo' className='logo' />
            </NavLink>
          </MDBNavbarBrand>
          {auth.isAuthenticated && (
            <MDBNavbarNav right>
              <MDBNavItem>
                {account && (
                  <Profile account={account} OnHandleShowSideBar={this.OnHandleShowSideBar} />
                )}
              </MDBNavItem>
            </MDBNavbarNav>
          )}
        </MDBNavbar>
        {auth.isAuthenticated && (
          <SideBar
            account={account}
            show={this.state.show}
            OnHandleShowSideBar={this.OnHandleShowSideBar}
            onLogout={this.props.logoutUser}
            isShow={this.props.isShow}
            OnHandleToggle={this.props.OnHandleToggle}
            isEvent={this.props.isEvent}
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
    letterSpacing: 1,
    textTransform: 'capitalize'
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
  error: state.auth.error,
  account: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(withRouter(Header));
