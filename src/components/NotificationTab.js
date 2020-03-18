import React, { Component } from 'react';
import {
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBRow,
  MDBCol
} from 'mdbreact';
import { NavLink, Redirect } from 'react-router-dom';
import Text from '../components/Text';
import Button from './Button';

import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import {
  loginUser,
  getLatestEvents,
  setNotes,
  viewNotifications
} from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMonthName } from '../helper/date';
import Header from './Header';
import AboutContent from './AboutContent';
import PrivacyContent from './PrivacyContent';
import TermsContent from './TermsContent';
import ModalProfile from './ModalProfile';
import Profile from './Profile';
import UpdatesAndNotifications from './UpdatesAndNotifications';
import loader from '../assets/images/loader.gif';
import fb from '../assets/images/fb.png';
import PasswordModal from './PasswordModal';

const PrivacyPolicyTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='privacy' role='tabpanel' className='fade-effect'>
      <Button
        className='cursor-pointer booking-signup-back'
        onClick={() => window.location.reload()}
      >
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText}>Back to events</span>
        </Text>
      </Button>
      <Text className='text-center tab-title' style={style.tabTitleHeader}>
        PRIVACY POLICY
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <div style={{ ...style.about, ...style.aboutFirst }}>
        <PrivacyContent />
      </div>
    </MDBTabPane>
  );
};

const TermsTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='terms' role='tabpanel' className='fade-effect'>
      <Button
        className='cursor-pointer booking-signup-back'
        onClick={() => window.location.reload()}
      >
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText}>Back to events</span>
        </Text>
      </Button>
      <Text className='text-center tab-title mt-5' style={style.tabTitleHeader}>
        TERMS & CONDITIONS
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <div style={{ ...style.about, ...style.aboutFirst }}>
        <TermsContent />
      </div>
    </MDBTabPane>
  );
};

const TabLinks = ({ parent }) => {
  return (
    <MDBNav tabs className='justify-content-center'>
      <MDBNavItem
        style={{
          display:
            parent.state.activeItem === 'privacy' ||
            parent.state.activeItem === 'terms'
              ? 'block'
              : 'none'
        }}
      >
        <NavLink
          to='#'
          className={`nav-links ${
            parent.state.activeItem === 'privacy' ? 'active-tab' : ''
          }`}
          onClick={() => parent.OnHandleTogglePrivacy('privacy')}
          role='tab'
        >
          <Text style={style.tabTitle}>PRIVACY POLICY</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
      <MDBNavItem
        style={{
          display:
            parent.state.activeItem === 'privacy' ||
            parent.state.activeItem === 'terms'
              ? 'block'
              : 'none'
        }}
      >
        <NavLink
          to='#'
          className={`nav-links ${
            parent.state.activeItem === 'terms' ? 'active-tab' : ''
          }`}
          onClick={() => parent.OnHandleTogglePrivacy('terms')}
          role='tab'
        >
          <Text style={style.tabTitle}>TERMS & CONDITIONS</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
    </MDBNav>
  );
};

const FooterTabs = ({ parent }) => {
  return (
    <React.Fragment>
      <TabLinks parent={parent} />
      <MDBTabContent
        className='card'
        activeItem={parent.state.activeItem}
        style={style.tabs}
      >
        <PrivacyPolicyTab parent={parent} />
        <TermsTab parent={parent} />
      </MDBTabContent>
    </React.Fragment>
  );
};

const AboutUsTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='about' role='tabpanel' className='fade-effect'>
      <Button
        className='cursor-pointer booking-signup-back mt-5 mb-5'
        onClick={() => window.location.reload()}
      >
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText}>Back to events</span>
        </Text>
      </Button>
      <Text className='text-center tab-title mt-5' style={style.tabTitleHeader}>
        ABOUT US
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <div style={{ ...style.about, ...style.aboutFirst }}>
        <AboutContent />
      </div>
    </MDBTabPane>
  );
};

const ContactUsTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='contact' role='tabpanel' className='fade-effect'>
      <Button
        className='cursor-pointer booking-signup-back'
        onClick={parent.OnHandleToggle('1')}
      >
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText}>Back to signup</span>
        </Text>
      </Button>
      <Text className='text-center tab-title' style={style.tabTitleHeader}>
        CONTACT US
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <div className='text-center mt-3 content contact-us'>
        <Text className='m-0'>
          <h5 style={style.brand}>Brandzone Inc.</h5>
        </Text>
        <Text className='m-0 mt-2' style={style.address}>
          5388 Curie St., Brgy. Palanan, Makati City, Philippines
        </Text>
        <Text className='m-0 mt-2' style={style.address}>
          Landline (02) 7618 3979
          <br />
          Mobile (0917) 165 2805
        </Text>
        <div className='d-inline m-auto text-center'>
          <div className='d-inline-flex'>
            <img src={fb} alt='fb' style={style.fb} />
            <Text className='m-0 mt-2 ml-2' style={style.address}>
              /brandzoneinc
            </Text>
          </div>
        </div>
        <a href='mailto:admin@brandzone.ph'>
          <Text className='m-0 mt-2' style={style.address}>
            admin@brandzone.ph
          </Text>
        </a>
      </div>
    </MDBTabPane>
  );
};

const ProfileTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='profile' role='tabpanel' className='fade-effect'>
      <Button
        className='cursor-pointer booking-signup-back mt-5'
        onClick={() => window.location.reload()}
      >
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText} className='ml-4'>
            Back to events
          </span>
        </Text>
      </Button>
      <br />
      <div style={{ ...style.about, ...style.aboutFirst }}>
        {parent.state.activeItem === 'profile' && (
          <Profile
            account={parent.state.account}
            OnHandleOpenProfile={parent.OnHandleOpenProfile}
          />
        )}
      </div>
    </MDBTabPane>
  );
};

const UpdatesAndNotifsTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='about' role='tabpanel' className='fade-effect'>
      <Button
        className='cursor-pointer booking-signup-back mt-5 mb-5'
        onClick={() => window.location.reload()}
      >
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText}>Back to events</span>
        </Text>
      </Button>
      <Text className='text-center tab-title mt-5' style={style.tabTitleHeader}>
        UPDATES AND NOTIFICATIONS
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <div style={{ ...style.about, ...style.aboutFirst }}>
        <UpdatesAndNotifications />
      </div>
    </MDBTabPane>
  );
};

class NotificationTab extends Component {
  state = {
    activeItem: '0',
    events: [],
    isOpen: null,
    schedules: [],
    selectedProfile: null,
    selectedSchedule: {},
    account: {},
    isShowList: false,
    isOpenProfile: false,
    isOpenList: false,
    isOpenPassword: false,
    notifId: window.location.pathname.split('/')[2]
  };

  OnHandleToggle = tab => () => {
    const { events } = this.state;
    if (events[tab])
      this.setState({
        isOpen: null,
        schedules: events[tab].schedules,
        selectedProfile: null
      });
    if (this.state.activeItem !== tab) this.setState({ activeItem: tab });
  };

  OnHandleTogglePrivacy = tab => {
    window.scrollTo(0, 0);
    this.setState({ activeItem: tab });
  };

  OnHandleResetEvents = () => {
    this.props.getLatestEvents();
    try {
      document.getElementById(`tab-${this.state.activeItem}`).click();
    } catch (error) {
      setTimeout(() => {
        try {
          document.getElementById(`tab-${this.state.activeItem}`).click();
        } catch (error) {
          window.location.reload();
        }
      }, 50);
    }
  };

  OnHandleOpenTime = id => {
    let { isOpen } = this.state;
    isOpen = id != isOpen ? id : null;
    this.setState({ isOpen, selectedProfile: null, isOpenList: false });
  };

  OnHandleGetTimeSlots = schedules => {
    this.setState({ schedules });
  };

  OnHandleSelectProfile = (selectedProfile, selectedSchedule) => {
    this.setState({ selectedProfile, selectedSchedule });
  };

  OnHandleResetProfile = () => {
    const { events } = this.state;
    this.setState({ selectedProfile: null, events });
  };

  OnHandleSetNotes = (id, notes) => {
    const { events, activeItem } = this.state;
    events[activeItem].schedules.map(sched => {
      sched.booking.map(book => {
        if (book.id == id) {
          book.notes = notes;
        }
      });
    });
    if (notes && notes.length > 0) {
      this.props.setNotes(id, notes);
    } else {
      toast.error('Required notes');
    }
  };

  OnHandleShowList = isShow => {
    let { activeItem } = this.state;
    if (
      activeItem === 'privacy' ||
      activeItem === 'terms' ||
      activeItem === 'about' ||
      activeItem === 'contact' ||
      activeItem === 'profile'
    ) {
      activeItem = 0;
    }
    window.scrollTo(0, 0);
    this.setState({ isShowList: isShow, activeItem, isOpenList: true });
    this.OnHandleResetEvents();
  };

  componentWillReceiveProps(nextProps) {
    const { events, account, booking } = nextProps;
    try {
      if (account) this.setState({ account });
      if (events.length > 0 || Object.keys(this.props.events).length > 0) {
        events[this.state.activeItem].schedules.map(e => {});
        this.setState({
          isOpen: null,
          events,
          schedules: events[this.state.activeItem].schedules
        });
      }
    } catch (error) {}
  }
  x;
  componentWillMount() {
    const { notifId } = this.state;
    const { viewNotifications, getLatestEvents } = this.props;

    getLatestEvents();
    viewNotifications(notifId);
  }

  componentDidUpdate() {}

  OnHandleOpenProfile = () => {
    const { isOpenProfile } = this.state;
    this.setState({ isOpenProfile: !isOpenProfile });
  };

  OnHandleOpenPassword = () => {
    const { isOpenPassword } = this.state;
    this.setState({ isOpenPassword: !isOpenPassword });
  };

  OnHandleToggleHome(tab) {}

  render() {
    const { notifId } = this.state;

    return (
      <React.Fragment>
        <Header
          isShow={this.OnHandleShowList}
          OnHandleToggle={this.OnHandleTogglePrivacy}
          isEvent={true}
          OnHandleToggleHome={this.OnHandleToggleHome}
          OnHandleOpenProfile={this.OnHandleOpenProfile}
          OnHandleOpenPassword={this.OnHandleOpenPassword}
        />
        <div
          style={style.main}
          className={`p-0 mb-5 ${
            this.state.activeItem === 'privacy' ||
            this.state.activeItem === 'terms' ||
            this.state.activeItem === 'about' ||
            this.state.activeItem === 'contact' ||
            this.state.activeItem === 'updatesAndNotifs' ||
            this.state.activeItem === 'profile'
              ? 'open-privacy-terms'
              : ''
          }`}
          id='mainTab'
        >
          {this.state.schedules &&
            this.state.activeItem !== 'privacy' &&
            this.state.activeItem !== 'terms' &&
            this.state.activeItem !== 'about' &&
            this.state.activeItem !== 'contact' &&
            this.state.activeItem !== 'updatesAndNotifs' &&
            this.state.activeItem !== 'profile' &&
            !this.props.eventLoading && (
              <>
                <Text
                  className='text-center tab-title mt-5'
                  style={style.tabTitleHeader}
                >
                  NOTIFICATION
                </Text>
                <hr style={style.tabTitleHeaderHr} />

                <p style={style.notificationBody}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse et dui magna. Phasellus quam justo, dapibus ut
                  luctus nec, auctor facilisis dolor. Fusce vel magna venenatis,
                  sollicitudin mauris vel, lobortis massa. Curabitur id nulla a
                  dolor sagittis sagittis sed non tellus. In porttitor
                  consectetur sapien in tincidunt. Etiam sit amet odio a eros
                  placerat mollis eget eget mi. Nam ullamcorper sem ligula,
                  vitae tincidunt est malesuada eu. Etiam convallis, sem at
                  sagittis faucibus, tortor magna blandit velit, vehicula
                  dapibus dui neque quis erat. Integer sagittis enim turpis,
                  eget hendrerit nunc fermentum eget. Nunc et imperdiet metus.
                  Integer aliquam tellus eget metus ultrices ultrices. Curabitur
                  scelerisque diam lacus, et faucibus ex vestibulum ac.
                </p>

                <p style={style.notificationBody}>
                  Fusce varius dolor quis massa mollis, et venenatis dolor
                  posuere. Nunc vitae leo eget ante rhoncus iaculis a nec nunc.
                  Maecenas efficitur fermentum arcu ut ullamcorper. Nunc
                  pulvinar sapien in felis convallis, quis convallis dolor
                  congue. Cras a est ac dui fringilla varius. Interdum et
                  malesuada fames ac ante ipsum primis in faucibus. Nullam ut
                  dapibus sem. Fusce volutpat quam sed augue efficitur
                  facilisis. Aliquam erat volutpat. Curabitur porttitor sodales
                  eros a congue. In luctus ante dui, sed accumsan justo maximus
                  et. Sed bibendum urna vitae tristique malesuada. Curabitur ut
                  diam purus. Suspendisse fringilla ex tristique dui
                  ullamcorper, et laoreet arcu tincidunt. Sed ut ullamcorper
                  magna, in pellentesque urna. Nunc at efficitur leo, id congue
                  neque.
                </p>
              </>
            )}

          {this.props.eventLoading && (
            <div id='loading' className='text-dark bg-light'>
              <img src={loader} alt='loader' />
            </div>
          )}

          {!this.props.auth.isAuthenticated && <Redirect to='/' />}

          {(this.state.activeItem === 'privacy' && (
            <FooterTabs parent={this} />
          )) ||
            (this.state.activeItem === 'terms' && !this.props.eventLoading && (
              <FooterTabs parent={this} />
            ))}
          {this.state.activeItem === 'updatesAndNotifs' &&
            !this.props.eventLoading && <UpdatesAndNotifsTab parent={this} />}
          {this.state.activeItem === 'about' && !this.props.eventLoading && (
            <AboutUsTab parent={this} />
          )}
          {this.state.activeItem === 'contact' && !this.props.eventLoading && (
            <ContactUsTab parent={this} />
          )}

          {this.state.activeItem === 'profile' && !this.props.eventLoading && (
            <ProfileTab parent={this} />
          )}
          <ToastContainer />
        </div>
        <ModalProfile
          OnHandleOpenProfile={this.OnHandleOpenProfile}
          isOpenModal={this.state.isOpenProfile}
        />
        <PasswordModal
          OnHandleToogleModal={this.OnHandleOpenPassword}
          toggle={this.state.isOpenPassword}
        />
        <Footer
          isShow={this.OnHandleShowList}
          OnHandleToggle={this.OnHandleTogglePrivacy}
          isEvent={true}
          isAuthenticated={this.props.auth.isAuthenticated}
          OnHandleOpenProfile={this.OnHandleOpenProfile}
        />
      </React.Fragment>
    );
  }
}

const style = {
  main: {
    padding: '0 !important'
  },
  tabs: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  white: {
    color: '#fff'
  },
  tabTitleHeader: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 6,
    fontSize: '2.3em',
    position: 'relative',
    top: '.5em',
    fontFamily: 'Harabara',
    marginBottom: '1.25em'
  },
  tabTitleHeaderHr: {
    borderBottom: '3.2px solid #8ec63f',
    width: '5.6em',
    position: 'relative',
    margin: 'auto'
  },

  tabTitle: {
    marginTop: 7,
    marginBottom: 1,
    fontFamily: 'Harabara',
    fontSize: 14
  },
  tabTitleSmall: {
    position: 'relative',
    bottom: '.9em',
    fontFamily: 'Harabara',
    fontSize: 14,
    letterSpacing: 2,
    color: '#fff'
  },
  pane: {
    position: 'relative',
    bottom: '.1em'
  },
  buttonTime: {
    border: 'solid 1px #4b5755',
    color: '#b1b1b1',
    backgroundColor: '#4b5755',
    width: '31.5em',
    borderRadius: '5px',
    padding: '.5em',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 37
  },
  buttonTimeBooked: {
    color: '#fff',
    backgroundColor: 'transparent',
    width: '31.5em',
    borderRadius: '5px',
    padding: '.5em',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 37
  },
  schedules: {
    position: 'relative',
    top: '.5em'
  },
  participantText: {
    fontSize: 11.5,
    fontFamily: 'Helvetica',
    position: 'relative',
    top: '.8em',
    color: '#fff',
    marginBottom: '0'
  },
  aboutFirst: {
    marginTop: '2em'
  },
  about: {
    color: '#fff',
    lineHeight: '1.5em',
    fontSize: 15.5,
    fontFamily: 'Helvetica'
  },
  backBtn: {
    zIndex: 2,
    color: '#fff'
  },
  backText: {
    opacity: 0.4,
    font: '10.5px Helvetica',
    marginLeft: '30px !important',
    position: 'relative',
    bottom: '.6em'
  },
  brand: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
  address: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 12
  },
  fb: {
    height: 20,
    marginTop: 10
  },
  notificationBody: {
    padding: '20px 30px',
    color: 'white',
    fontSize: '20px',
    lineHeight: '30px',
    textIndent: '20px'
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  account: state.auth.currentUser,
  error: state.auth.error,
  events: state.event.events,
  user: state.user,
  booking: state.booking.booking,
  isLoading: state.booking.isLoading,
  eventLoading: state.event.isLoading
});

export default connect(mapStateToProps, {
  loginUser,
  getLatestEvents,
  setNotes,
  viewNotifications
})(withRouter(NotificationTab));
