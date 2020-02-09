import React, { Component } from 'react';
import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBRow, MDBCol } from 'mdbreact';
import { NavLink, Redirect } from 'react-router-dom';
import Text from '../components/Text';
import Button from './Button';
import BookingProfileList from './BookingProfileList';
import BookingProfile from './BookingProfile';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser, getLatestEvents, setNotes } from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMonthName } from '../helper/date';
import Header from './Header';
import AboutContent from './AboutContent';
import PrivacyContent from './PrivacyContent';
import TermsContent from './TermsContent';
import ModalProfile from './ModalProfile';
import Profile from './Profile';
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';

const Link = ({ data, parent, index }) => {
  const { title } = data;
  return (
    <MDBNavItem>
      <NavLink
        id={`tab-${index}`}
        to='#'
        className={`nav-links ${parent.state.activeItem === index ? 'active-tab' : ''}`}
        onClick={parent.OnHandleToggle(index)}
        role='tab'
      >
        <Text style={style.tabTitle}>{title}</Text>
        <hr />
      </NavLink>
    </MDBNavItem>
  );
};

const Tab = ({ data, index, isShowList }) => {
  let { title, address, date } = data;
  let dateArr = date.split('T')[0].split('-');
  date = `${getMonthName(dateArr[1])} ${dateArr[2]}`;
  return (
    <MDBTabPane tabId={`${index}`} role='tabpanel' className='fade-effect' style={style.pane}>
      <Text className='text-center' style={style.tabTitleHeader}>
        {!isShowList
          ? title
          : localStorage.getItem('userType') == 'exhibitor'
          ? 'List of Participants'
          : 'List of Exhibitors'}
      </Text>
      {!isShowList && (
        <React.Fragment>
          <Text className='text-center' style={style.tabTitleSmall}>
            {`${date} - ${address}`}
          </Text>
          <hr style={style.tabTitleHeaderHr} />
        </React.Fragment>
      )}
    </MDBTabPane>
  );
};

const Tabs = ({ parent }) => {
  const { events } = parent.state;
  let event = [];
  let link = [];
  events.map((e, i) => {
    link.push(<Link data={e} key={i} index={i.toString()} parent={parent} />);
    event.push(<Tab data={e} key={i} isShowList={parent.state.isShowList} index={i.toString()} />);
  });

  return (
    <div>
      <MDBNav tabs className='justify-content-center event-tabs'>
        {link}
      </MDBNav>
      <div className={`text-center ${parent.state.selectedProfile != null ? 'd-none' : 'd-block'}`}>
        <MDBTabContent className='card' activeItem={parent.state.activeItem} style={style.tabs}>
          {event}
        </MDBTabContent>
        <div style={style.schedules}>
          {!parent.state.isShowList && <Schedules parent={parent} />}
          {parent.state.isShowList && <List parent={parent} />}
        </div>
      </div>
      <div className={`text-center ${parent.state.selectedProfile != null ? 'd-block' : 'd-none'}`}>
        <BookingProfile parent={parent} />
      </div>
    </div>
  );
};

const Schedule = ({ data, parent, index }) => {
  let { id, startTime, endTime, booking } = data;
  const { account } = parent.props;
  const { events, activeItem } = parent.state;
  let isBooked = false;
  let setBy,
    bookedBy = {};
  let bookingId = null;
  let dateTime = null;
  let isDone = false;
  let isStart = false;
  let booked = {};
  if (booking && account) {
    booking.map(e => {
      if (e.bookedBy !== null && e.bookedBy.id == account.id) {
        booked = e;
        isBooked = true;
        setBy = e.setBy;
        bookingId = e.id;
      } else if (e.bookedBy !== null && e.setBy.id == account.id) {
        booked = e;
        isBooked = true;
        bookedBy = e.bookedBy;
        bookingId = e.id;
      }
    });
  }

  let user = setBy ? setBy : bookedBy;
  let institutionName = '';

  if (user) {
    if (user.institutionType) {
      institutionName = user.institutionType.name;
    } else if (user.institution) {
      institutionName = user.institution.name;
    }
  }

  booked['title'] = institutionName;

  let currentDate = new Date();
  let date = events[activeItem].date;
  let hour = parseInt(endTime.split(':')[0]) + 12;
  let min = endTime.split(':')[1];

  date = date.split('T')[0].split('-');
  dateTime = new Date(date[0], parseInt(date[1]) - 1, date[2], hour, min);
  isDone = currentDate > dateTime;
  hour = parseInt(startTime.split(':')[0]) + 12;
  min = startTime.split(':')[1];
  dateTime = new Date(date[0], parseInt(date[1]) - 1, date[2], hour, min);
  isStart = dateTime;

  startTime = startTime.substring(0, startTime.length - 3);
  endTime = endTime.substring(0, endTime.length - 3);
  startTime = startTime.substring(0, 1) === '0' ? startTime.substring(1) : startTime;
  endTime = endTime.substring(0, 1) === '0' ? endTime.substring(1) : endTime;

  return (
    <div
      className={`mb-3 text-light mt-3 fade-effect ${
        id === parent.state.isOpen || parent.state.isOpen === null
          ? 'd-block'
          : 'd-none margin-absolute'
      }`}
    >
      <Button
        style={isBooked || isDone ? style.buttonTimeBooked : style.buttonTime}
        className={`${
          !isBooked && !isDone ? 'btn-animate-time' : isDone ? 'btn-done' : 'btn-inprogress'
        } ${parent.state.isOpen === null ? 'inactive' : ''}`}
        onClick={() => {
          if (!isDone) {
            isBooked ? parent.OnHandleSelectProfile(booked, data) : parent.OnHandleOpenTime(id);
          } else {
            isBooked
              ? parent.OnHandleSelectProfile(booked, data)
              : toast.error('This schedules are elapsed/done');
          }
        }}
      >
        <Text
          className={`text-capitalize font-bold ${
            !isBooked && !isDone && !isStart
              ? 'btn-animate-text-time'
              : isDone
              ? 'btn-booked done'
              : 'btn-booked'
          } ${id === parent.state.isOpen ? 'font-weight-bold text-light font-size-15' : ''}`}
          title={`${startTime} - ${endTime}${
            isBooked
              ? ` | ${institutionName} | ${
                  Object.keys(bookedBy).length > 0 ? bookedBy.firstName : setBy.firstName
                } ${
                  Object.keys(bookedBy).length > 0
                    ? bookedBy.lastName.substr(0, 1)
                    : setBy.lastName.substr(0, 1)
                }.`
              : ''
          }`}
        >
          {`${startTime} - ${endTime}${
            isBooked
              ? ` | ${
                  institutionName.length > 20
                    ? `${institutionName.substr(0, 20)}...`
                    : institutionName
                } | ${Object.keys(bookedBy).length > 0 ? bookedBy.firstName : setBy.firstName} ${
                  Object.keys(bookedBy).length > 0
                    ? bookedBy.lastName.substr(0, 1)
                    : setBy.lastName.substr(0, 1)
                }.`
              : ''
          }`}
        </Text>
      </Button>
      <div
        className={`fade-effect .fade-out-effect mt-3 time-collapse ${
          id === parent.state.isOpen ? 'd-block' : 'd-none'
        }`}
      >
        <Text className='text-center' style={style.participantText}>
          Available&nbsp;
          {localStorage.getItem('userType') == 'participant' ? 'Exhibitors' : 'Participants'}:
        </Text>
        <BookingProfileList
          parent={parent}
          bookingScheduleId={id}
          users={booking}
          schedule={data}
          account={parent.props.account}
          isShowList={parent.state.isShowList}
        />
      </div>
    </div>
  );
};

const Schedules = ({ parent }) => {
  let scheds = [];
  const { activeItem, events } = parent.state;
  if (events.length > 0 && events[activeItem]) {
    events[activeItem].schedules.map((e, i) => {
      if (e.booking.length > 0) {
        scheds.push(<Schedule key={i} parent={parent} data={e} index={i + 1} />);
      }
    });
  }
  return scheds;
};

const List = ({ parent }) => {
  const { activeItem, events } = parent.state;
  let users = {};
  let schedule = {};
  let usersArr = [];
  if (events.length > 0) {
    events[activeItem].schedules.map((sched, i) => {
      const { startTime } = sched;
      let currentDate = new Date();
      let date = events[activeItem].date;
      let hour = parseInt(startTime.split(':')[0]) + 12;
      let min = startTime.split(':')[1];
      date = date.split('T')[0].split('-');
      const dateTime = new Date(date[0], parseInt(date[1]) - 1, date[2], hour, min);
      if (currentDate <= dateTime) {
        if (sched.booking.length > 0) {
          sched.booking.map(booking => {
            if (!users[booking.setBy.id] && booking.bookedBy == null) {
              booking = { ...booking, schedule: sched };
              users[booking.setBy.id] = booking;
            }
          });
        }
      }
    });
  }

  Object.values(users).map(user => {
    usersArr.push(user);
  });
  return (
    <BookingProfileList
      parent={parent}
      bookingScheduleId={null}
      users={usersArr}
      schedule={schedule}
      account={parent.props.account}
      isShowList={parent.state.isShowList}
    />
  );
};

const PrivacyPolicyTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='100' role='tabpanel' className='fade-effect'>
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
    <MDBTabPane tabId='101' role='tabpanel' className='fade-effect'>
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
            parent.state.activeItem === '100' || parent.state.activeItem === '101'
              ? 'block'
              : 'none'
        }}
      >
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '100' ? 'active-tab' : ''}`}
          onClick={() => parent.OnHandleTogglePrivacy('100')}
          role='tab'
        >
          <Text style={style.tabTitle}>PRIVACY POLICY</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
      <MDBNavItem
        style={{
          display:
            parent.state.activeItem === '100' || parent.state.activeItem === '101'
              ? 'block'
              : 'none'
        }}
      >
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '101' ? 'active-tab' : ''}`}
          onClick={() => parent.OnHandleTogglePrivacy('101')}
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
      <MDBTabContent className='card' activeItem={parent.state.activeItem} style={style.tabs}>
        <PrivacyPolicyTab parent={parent} />
        <TermsTab parent={parent} />
      </MDBTabContent>
    </React.Fragment>
  );
};

const AboutUsTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='102' role='tabpanel' className='fade-effect'>
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
    <MDBTabPane tabId='103' role='tabpanel' className='fade-effect'>
      <Button className='cursor-pointer booking-signup-back' onClick={parent.OnHandleToggle('1')}>
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
        <a href='https://www.facebook.com/brandzoneinc'>
          <Text className='m-0 mt-2' style={style.address}>
            https://www.facebook.com/brandzoneinc
          </Text>
        </a>
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
    <MDBTabPane tabId='104' role='tabpanel' className='fade-effect'>
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
        {parent.state.activeItem === '104' && (
          <Profile
            account={parent.state.account}
            OnHandleOpenProfile={parent.OnHandleOpenProfile}
          />
        )}
      </div>
    </MDBTabPane>
  );
};

class EventTab extends Component {
  state = {
    activeItem: '0',
    events: [],
    isOpen: null,
    schedules: [],
    selectedProfile: null,
    selectedSchedule: {},
    account: {},
    isShowList: false,
    isOpenProfile: false
  };

  OnHandleToggle = tab => () => {
    const { events } = this.state;
    if (events[tab])
      this.setState({ isOpen: null, schedules: events[tab].schedules, selectedProfile: null });
    if (this.state.activeItem !== tab) this.setState({ activeItem: tab });
  };

  OnHandleTogglePrivacy = tab => {
    window.scrollTo(0, 0);
    this.setState({ activeItem: tab });
  };

  OnHandleResetEvents = () => {
    const { id } = this.state.account;
    this.props.getLatestEvents(id);
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
    this.setState({ isOpen, selectedProfile: null });
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
      activeItem === '100' ||
      activeItem === '101' ||
      activeItem === '102' ||
      activeItem === '103' ||
      activeItem === '104'
    ) {
      activeItem = 0;
    }
    window.scrollTo(0, 0);
    this.setState({ isShowList: isShow, activeItem });
    this.OnHandleResetEvents();
  };

  componentWillReceiveProps(nextProps) {
    const { events, account, booking } = nextProps;
    try {
      if (account) this.setState({ account });
      if (events.length > 0 || Object.keys(this.props.events).length > 0) {
        events[this.state.activeItem].schedules.map(e => {});
        this.setState({ isOpen: null, events, schedules: events[this.state.activeItem].schedules });
      }
    } catch (error) {}
  }

  componentWillMount() {
    this.props.getLatestEvents(localStorage.getItem('id'));
  }
  componentDidUpdate() {
    console.log(this.state.activeItem);
  }

  OnHandleOpenProfile = () => {
    const { isOpenProfile } = this.state;
    this.setState({ isOpenProfile: !isOpenProfile });
  };

  OnHandleToggleHome(tab) {}

  render() {
    return (
      <React.Fragment>
        <Header
          isShow={this.OnHandleShowList}
          OnHandleToggle={this.OnHandleTogglePrivacy}
          isEvent={true}
          OnHandleToggleHome={this.OnHandleToggleHome}
          OnHandleOpenProfile={this.OnHandleOpenProfile}
        />
        <div
          style={style.main}
          className={`p-0 mb-5 ${
            this.state.activeItem === '100' ||
            this.state.activeItem === '101' ||
            this.state.activeItem === '102' ||
            this.state.activeItem === '103' ||
            this.state.activeItem === '104'
              ? 'open-privacy-terms'
              : ''
          }`}
          id='mainTab'
        >
          {!this.props.auth.isAuthenticated && <Redirect to='/' />}
          {this.state.schedules &&
            this.state.activeItem !== '100' &&
            this.state.activeItem !== '101' &&
            this.state.activeItem !== '102' &&
            this.state.activeItem !== '103' &&
            this.state.activeItem !== '104' && <Tabs parent={this} />}

          {(this.state.activeItem === '100' && <FooterTabs parent={this} />) ||
            (this.state.activeItem === '101' && <FooterTabs parent={this} />)}

          {this.state.activeItem === '102' && <AboutUsTab parent={this} />}
          {this.state.activeItem === '103' && <ContactUsTab parent={this} />}

          {this.state.activeItem === '104' && <ProfileTab parent={this} />}
          <ToastContainer />
        </div>
        <ModalProfile
          OnHandleOpenProfile={this.OnHandleOpenProfile}
          isOpenModal={this.state.isOpenProfile}
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
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  account: state.auth.currentUser,
  error: state.auth.error,
  events: state.event.events,
  user: state.user,
  booking: state.booking.booking,
  isLoading: state.booking.isLoading
});

export default connect(
  mapStateToProps,
  { loginUser, getLatestEvents, setNotes }
)(withRouter(EventTab));
