import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge
} from 'mdbreact';
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';
import Text from './Text';
import logo from '../assets/images/logo.png';
import {
  loginUser,
  logoutUser,
  getNotifications,
  viewNotifications
} from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMonthName } from '../helper/date';

import Swal from 'sweetalert2';
const Notification = ({ parent, className }) => {
  const { notification } = parent.state;
  const notifs = [];
  if (notification.data) {
    notification.data.map((e, i) => {
      const { content, date, isViewed, id } = e;
      let newDate = date.split('T')[0];
      let dateArr = newDate.split('-');

      notifs.push(
        <React.Fragment key={i}>
          <MDBDropdownItem
            onClick={() => parent.onHandleNotification(e)}
            key={i}
            className={!isViewed ? 'bg-gray' : ''}
          >
            <div className='d-flex'>
              <MDBIcon icon='info-circle' className='text-gray info-icon' />
              <div
                className='notif-btn-list'
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <span className='notif-date'>
                {getMonthName(dateArr[1])} {dateArr[2]}, {dateArr[0]}{' '}
                {date.split('T')[1].split('.')[0]}
              </span>
            </div>
          </MDBDropdownItem>
        </React.Fragment>
      );
    });
  }
  return notification.data && notification.data.length > 0 ? (
    <MDBDropdown className={`p-0 ${className}`}>
      <MDBDropdownToggle id='notif-btn'>
        <MDBBadge color='danger'>
          <MDBIcon icon='bell' />
          {notification.count > 0 && <strong>{notification.count}</strong>}
        </MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu right basic>
        {notifs}
      </MDBDropdownMenu>
    </MDBDropdown>
  ) : (
      <span></span>
    );
};
const Profile = ({ OnHandleShowSideBar, account, parent }) => {
  const { firstName, lastName, profilePicture } = account;
  return (
    <div className='d-flex' style={style.profile}>
      <div className='d-flex' id='profile-lg'>
        <img
          src={
            profilePicture
              ? profilePicture
              : 'https://brandzone.ph/upload/default-avatar.jpeg'
          }
          style={style.avatar}
          alt='profile'
        />
        <Text style={style.userName}>
          Hi, {firstName} {lastName}!
        </Text>
        <Notification parent={parent} className='bg-notif' />
        <span style={style.divider}></span>
      </div>
      <div className='d-flex'>
        <Notification parent={parent} className='sm-notif' />
        <span onClick={() => OnHandleShowSideBar()}>
          <MDBIcon icon='bars' style={style.bars} id='bars' />
        </span>
      </div>
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
    account: {},
    isOpenNotif: false,
    notification: []
  };

  OnHandleShowSideBar = () => {
    this.setState({ show: !this.state.show });
  };

  componentWillReceiveProps(nextProps) {
    const { account, notification } = nextProps;
    if (notification) this.setState({ notification });
    if (account) this.setState({ account });
  }
  componentWillMount() {
    this.props.getNotifications();
  }

  onHandleNotification = data => {
    window.location.href = `/notification/${data.id}`;

    // if (!data.isViewed) this.props.viewNotifications(data.id);
    // Swal.fire({
    //   title: 'Notification',
    //   html: data.content,
    //   showCancelButton: false,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Ok'
    // }).then(result => {});
  };

  render() {
    const { auth, OnHandleToggleHome } = this.props;
    const { account } = this.state;
    return (
      <div>
        <MDBNavbar color='transparent' expand='md' className='header-nav'>
          <MDBNavbarBrand>
            <NavLink
              to={auth.isAuthenticated ? '#' : '/'}
              onClick={OnHandleToggleHome('1')}
            >
              <img src={logo} alt='logo' className='logo' />
            </NavLink>
          </MDBNavbarBrand>
          {auth.isAuthenticated && (
            <MDBNavbarNav right>
              <MDBNavItem>
                {account && (
                  <Profile
                    parent={this}
                    account={account}
                    OnHandleShowSideBar={this.OnHandleShowSideBar}
                  />
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
            OnHandleOpenProfile={this.props.OnHandleOpenProfile}
            OnHandleOpenPassword={this.props.OnHandleOpenPassword}
          />
        )}
      </div>
    );
  }
}

const style = {
  userName: {
    position: 'relative',
    top: 10,
    paddingLeft: '1.1em',
    paddingRight: '1.2em',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Helvetica',
    color: '#fff',
    letterSpacing: 1,
    textTransform: 'capitalize'
  },
  bars: {
    position: 'relative',
    top: 8
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
    top: 13
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 4,
    objectFit: 'contain',
    background: '#fff',
    padding: '.2em'
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
  account: state.auth.currentUser,
  notification: state.notification.notification
});

export default connect(mapStateToProps, {
  loginUser,
  logoutUser,
  getNotifications,
  viewNotifications
})(withRouter(Header));
