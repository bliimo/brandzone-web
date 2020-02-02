import React, { Component } from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem } from 'mdbreact';
import { NavLink, Redirect } from 'react-router-dom';
import Button from '../components/Button';
import contents from '../constants/contents';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import validation from '../helper/validation';
import Dropdown from './Dropdown';
import ParticipantSignUp from './ParticipantSignUp';
import ExhibitorSignUp from './ExhibitorSignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty, isEqual } from 'lodash';
import { loginUser, getLatestEvents, getInstitution, addUser, setBookings } from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const TabLinks = ({ parent }) => {
  return (
    <MDBNav tabs className='justify-content-center'>
      <MDBNavItem>
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '1' ? 'active-tab' : ''}`}
          onClick={parent.OnHandleToggle('1')}
          role='tab'
        >
          <Text style={style.tabTitle}>About the event</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
      <MDBNavItem style={{ display: parent.state.activeItem === '2' ? 'block' : 'none' }}>
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '2' ? 'active-tab' : ''}`}
          onClick={parent.OnHandleToggle('2')}
          role='tab'
        >
          <Text style={style.tabTitle}>Login</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
      <MDBNavItem style={{ display: parent.state.activeItem === '3' ? 'block' : 'none' }}>
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '3' ? 'active-tab' : ''}`}
          onClick={parent.OnHandleToggle('3')}
          role='tab'
        >
          <Text style={style.tabTitle}>Sign up</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
    </MDBNav>
  );
};

const AboutTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='1' role='tabpanel' className='fade-effect'>
      <Text className='text-center' style={style.tabTitleHeader}>
        About
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <Text className='text-center' style={{ ...style.about, ...style.aboutFirst }}>
        {contents.about[0]}
      </Text>
      <Text className='text-center mt-2 ' style={{ ...style.about, ...style.about }}>
        {contents.about[1]}
      </Text>
      <Text className='text-center mt-2 ' style={{ ...style.about, ...style.about }}>
        {contents.about[2]}
      </Text>
      <Button
        style={style.buttonSignUp}
        className='btn-animate-signup'
        onClick={parent.OnHandleToggle('3')}
      >
        <Text className='btn-animate-text-signup'>Sign Up</Text>
      </Button>
      <Button
        style={style.buttonLogin}
        className='btn-animate-login'
        onClick={parent.OnHandleToggle('2')}
      >
        <Text className='btn-animate-text-login'>Login</Text>
      </Button>
    </MDBTabPane>
  );
};

const LoginTab = ({ parent }) => {
  return (
    <MDBTabPane
      tabId='2'
      role='tabpanel'
      className='fade-effect'
      style={{ display: parent.state.activeItem === '2' ? 'block' : 'none' }}
    >
      <Text className='text-center' style={style.tabTitleHeader}>
        Login
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <MDBContainer style={style.loginForm} id='loginForm'>
        <TextInput
          placeholder='Email address'
          id='email'
          onChange={parent.OnHandleChange}
          type='email'
          value={parent.state.email}
          size='sm'
          style={{ ...style.input, ...style.inputEmail }}
          required={true}
          autocomplete='off'
        />
        <TextInput
          placeholder='Password'
          id='password'
          onChange={parent.OnHandleChange}
          type='password'
          value={parent.state.password}
          size='sm'
          style={style.input}
          required={true}
          className='mt-4'
        />
        <Button
          style={style.buttonLogin}
          id='btnLoginTab'
          className='btn-animate-login main-btn-login'
          onClick={parent.props.auth.isLoading ? () => {} : parent.OnHandleLogin}
        >
          <Text className='btn-animate-text-login'>
            {parent.props.auth.isLoading ? 'Please wait...' : 'Login'}
          </Text>
        </Button>
      </MDBContainer>
    </MDBTabPane>
  );
};

const SingUpTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='3' role='tabpanel' className='fade-effect'>
      <Text className='text-center' style={style.tabTitleHeader}>
        Sign up
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <MDBContainer style={style.signUpForm} id='signUpForm'>
        <Dropdown
          items={contents.userType}
          action={parent.OnHandleSignUpType}
          label='Registration Type'
        />
        {parent.OnHandleSignUpForm()}
        {parent.state.userTypeSelected != null && <SubmitSignUp parent={parent} />}
      </MDBContainer>
    </MDBTabPane>
  );
};

const SubmitSignUp = ({ parent }) => {
  return (
    <div className='mt-5'>
      <Text style={style.privacyPolicy}>
        Read&nbsp;
        <NavLink to='#' style={style.privacyPolicyLinks}>
          <strong>Privacy Policy</strong>
        </NavLink>
        &nbsp;and&nbsp;
        <NavLink to='#' style={style.privacyPolicyLinks}>
          <strong>Terms and Conditions</strong>
        </NavLink>
      </Text>
      <div className='m-auto text-center'>
        <div className='d-inline-block' style={style.agreeContainer}>
          <span
            onClick={() => parent.OnHandleCheckPrivacy()}
            style={style.privacyCheckBox}
            className={parent.state.isCheckedPrivacy ? 'privacy-checked' : ''}
          ></span>
          <span style={style.agree}>I agree to the terms and conditions of BrandZone</span>
        </div>
        <Button
          style={style.buttonSignUp}
          className='btn-animate-signup'
          id='btnSignup'
          onClick={parent.props.user.isLoading ? () => {} : parent.OnHandleSignUp}
        >
          <Text className='btn-animate-text-signup'>
            {parent.props.user.isLoading ? 'Please wait...' : 'Sign Up'}
          </Text>
        </Button>
      </div>
    </div>
  );
};

class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.toastId = null;
    this.state = {
      activeItem: '1',
      email: '',
      password: '',
      companyName: '',
      companyCountry: '',
      companyProvince: '',
      companyProfile: '',
      companyCity: '',
      jobTitle: '',
      phoneNumber: '',
      signUpEmail: '',
      signUpPassword: '',
      institutionName: '',
      firstName: '',
      lastName: '',
      programs: '',
      profilePic: null,
      isCheckedPrivacy: false,
      events: [],
      schedules: [],
      userTypeSelected: null,
      institutionTypes: [],
      institutionType: null,
      companyWebsite: '',
      confirmPassword: '',
      selectedSchedules: {},
      selectedEvent: null,
      allEvents: {},
      setBookings: []
    };
  }

  notify = txt => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.error(txt);
    }
  };

  OnHandleToggle = tab => () => {
    if (this.toastId) toast.dismiss(this.toastId);
    this.setState({ activeItem: tab });
  };

  OnHandleChange = event => {
    let { emailError, passwordError } = this.state;
    if (event.target.value !== '') {
      document.getElementById(event.target.id).classList.remove('invalid-field');
    } else {
      document.getElementById(event.target.id).classList.add('invalid-field');
    }
    if (event.target.id === 'email') emailError = !validation.isEmail(event.target.value);
    if (event.target.id === 'password')
      passwordError = !validation.isValidPassword(event.target.value);
    this.setState({ [event.target.id]: event.target.value, emailError, passwordError });
  };

  OnHandleGetTimeSlots = selectedSchedules => {
    this.setState({ selectedSchedules });
    this.OnHandleSelectedSchedules(selectedSchedules);
  };

  OnHandleCheckTerms = () => {
    const { isCheckedPrivacy } = this.state;
    this.setState({ isCheckedPrivacy: !isCheckedPrivacy });
  };

  OnHandleSignUpType = index => {
    this.setState({ userTypeSelected: index });
  };

  OnHandleInstitutionType = index => {
    const { institutionTypes } = this.state;
    this.setState({ institutionType: institutionTypes[index].id });
  };

  OnHandleSignUpForm = () => {
    if (this.state.userTypeSelected === 0) {
      return <ParticipantSignUp parent={this} />;
    } else if (this.state.userTypeSelected === 1) {
      return <ExhibitorSignUp parent={this} />;
    }
  };

  OnHandleSetEvents = events => {
    if (this.state.events.length == 0 && events.length > 0) {
      const allEvents = {
        id: events[events.length - 1].id + 1,
        date: new Date(),
        title: 'All',
        address: '',
        isAllEvent: true,
        schedules: [
          {
            id: 1,
            startTime: '02:00:00',
            endTime: '02:20:00'
          },
          {
            id: 2,
            startTime: '02:20:00',
            endTime: '02:40:00'
          },
          {
            id: 3,
            startTime: '02:40:00',
            endTime: '03:00:00'
          },
          {
            id: 4,
            startTime: '03:00:00',
            endTime: '03:20:00'
          },
          {
            id: 5,
            startTime: '03:20:00',
            endTime: '03:40:00'
          },
          {
            id: 6,
            startTime: '03:40:00',
            endTime: '04:00:00'
          },
          {
            id: 7,
            startTime: '04:00:00',
            endTime: '04:20:00'
          },
          {
            id: 8,
            startTime: '04:20:00',
            endTime: '04:40:00'
          },
          {
            id: 9,
            startTime: '04:40:00',
            endTime: '05:00:00'
          },
          {
            id: 10,
            startTime: '05:00:00',
            endTime: '05:20:00'
          },
          {
            id: 11,
            startTime: '05:20:00',
            endTime: '05:40:00'
          },
          {
            id: 12,
            startTime: '05:40:00',
            endTime: '06:00:00'
          }
        ]
      };
      events.push(allEvents);
      this.setState({
        events,
        allEvents,
        schedules: allEvents.schedules,
        selectedEvent: allEvents
      });
    }
  };

  OnHandleSetInstitution = institutionTypes => {
    this.setState({ institutionTypes });
  };

  componentWillReceiveProps(nextProps) {
    const { auth, events, institution, user, loginError, signUpError } = nextProps;

    const { activeItem } = this.state;

    if (loginError && activeItem === '2') {
      this.notify(loginError);
      return false;
    }

    if (signUpError && activeItem === '3') {
      this.notify(signUpError);
      return false;
    }

    if (user.user && Object.keys(user.user).length > 0 && this.state.activeItem === '3') {
      toast.success('Successfully registered please login');
      this.setState({
        activeItem: '2',
        email: '',
        password: '',
        companyName: '',
        companyCountry: '',
        companyProvince: '',
        companyProfile: '',
        companyCity: '',
        jobTitle: '',
        phoneNumber: '',
        signUpEmail: '',
        signUpPassword: '',
        institutionName: '',
        firstName: '',
        lastName: '',
        programs: '',
        profilePic: null,
        isCheckedPrivacy: false,
        companyWebsite: '',
        confirmPassword: ''
      });
    }

    if (auth.isAuthenticated) window.location.reload();

    if (events && !auth.isLoading) {
      this.OnHandleSetEvents(events);
      this.OnHandleSetInstitution(institution);
    }
  }

  OnHandleLogin = () => {
    const { email, password } = this.state;
    const { loginUser } = this.props;
    if (isEmpty(email)) {
      this.notify('Please enter your email address');
    } else if (isEmpty(password)) {
      this.notify('Please enter your password');
    } else {
      loginUser({
        email,
        password
      });
    }
  };

  OnHandleSelectedSchedules = selectedSchedules => {
    const { selectedEvent, events } = this.state;
    let setBookings = [];
    if (selectedEvent.isAllEvent) {
      Object.values(selectedSchedules).map(scheds => {
        events.map(e => {
          if (e.id != selectedEvent.id) {
            e.schedules.map(sched => {
              if (sched.startTime == scheds.startTime) {
                setBookings.push(sched.id);
              }
            });
          }
        });
      });
    } else {
      Object.keys(selectedSchedules).map(scheds => {
        setBookings.push(scheds);
      });
    }
    this.setState({ setBookings: [...new Set(setBookings)], selectedSchedules });
  };

  OnHandleGetParticipants = () => {
    const {
      institutionType,
      companyName,
      companyCountry,
      companyProvince,
      companyCity,
      companyWebsite,
      companyProfile,
      firstName,
      lastName,
      jobTitle,
      phoneNumber,
      signUpEmail,
      signUpPassword,
      confirmPassword,
      setBookings
    } = this.state;

    return {
      institutionTypeId: institutionType,
      companyName,
      companyCountry,
      companyProvince,
      companyCity,
      companyWebsite,
      companyProfile,
      firstName,
      lastName,
      jobTitle,
      phoneNumber,
      email: signUpEmail,
      password: signUpPassword,
      confirmPassword,
      bookingScheduleId: { scheduleId: setBookings },
      userType: 'participant'
    };
  };

  OnHandleGetExibitors = () => {
    const {
      institutionName,
      companyProfile,
      companyProvince,
      companyCity,
      companyCountry,
      companyWebsite,
      phoneNumber,
      programs,
      firstName,
      lastName,
      jobTitle,
      signUpEmail,
      signUpPassword,
      confirmPassword,
      setBookings
    } = this.state;

    return {
      institutionName,
      institutionProfile: companyProfile,
      institutionProvince: companyProvince,
      institutionCity: companyCity,
      institutionCountry: companyCountry,
      institutionWebsite: companyWebsite,
      institutionTelephone: phoneNumber,
      programs: programs,
      firstName,
      lastName,
      jobTitle,
      phoneNumber,
      email: signUpEmail,
      password: signUpPassword,
      confirmPassword: confirmPassword,
      bookingScheduleId: { scheduleId: setBookings },
      userType: 'exhibitor'
    };
  };

  OnHandleValidateSignUp = user => {
    const { userTypeSelected, isCheckedPrivacy, selectedSchedules } = this.state;

    for (const key of Object.keys(user)) {
      if (user[key] <= 0) {
        if (user[key] === null || user[key] === undefined || user[key] === '') {
          let fields = {};
          if (userTypeSelected == 0) {
            fields = {
              institutionTypeId: 'institutionType',
              companyName: 'companyName',
              companyCountry: 'companyCountry',
              companyProvince: 'companyProvince',
              companyCity: 'companyCity',
              companyWebsite: 'companyWebsite',
              companyProfile: 'companyProfile',
              firstName: 'firstName',
              lastName: 'lastName',
              jobTitle: 'jobTitle',
              phoneNumber: 'phoneNumber',
              email: 'signUpEmail',
              password: 'signUpPassword',
              confirmPassword: 'confirmPassword'
            };
          } else {
            fields = {
              institutionName: 'institutionName',
              institutionProfile: 'companyProfile',
              institutionProvince: 'companyProvince',
              institutionCity: 'companyCity',
              institutionCountry: 'companyCountry',
              institutionWebsite: 'companyWebsite',
              institutionTelephone: 'phoneNumber',
              programs: 'programs',
              firstName: 'firstName',
              lastName: 'lastName',
              jobTitle: 'jobTitle',
              phoneNumber: 'phoneNumber',
              email: 'signUpEmail',
              password: 'signUpPassword',
              confirmPassword: 'confirmPassword'
            };
          }

          Object.keys(fields).map((v, k) => {
            try {
              if (key === v) {
                document.getElementById(key).classList.add('invalid-field');
              } else {
                document.getElementById(k).classList.remove('invalid-field');
              }
            } catch (error) {}
          });

          this.notify(
            `Required ${key
              .replace('Id', '')
              .replace('company', 'company ')
              .replace('institution', 'institution ')
              .replace('institutionName', 'institution name')
              .replace('firstName', 'first name')
              .replace('lastName', 'last name')
              .replace('confirm', 'confirm ')
              .replace('job', 'job ')
              .toLowerCase()}`
          );
          return false;
        }
      }
    }

    if (Object.keys(selectedSchedules).length <= 0) {
      this.notify('Please select time slot');
      return false;
    }

    if (!isCheckedPrivacy) {
      this.notify('Please agree with the terms and conditions');
      return false;
    }

    return true;
  };

  OnHandleSetBookings = () => {
    const bookingScheds = this.state.setBookings;
    const { setBookings } = this.props;
    setBookings({ scheduleId: bookingScheds });
  };

  OnHandleSignUp = () => {
    console.log(this.state.setBookings);
    const { addUser } = this.props;
    const { userTypeSelected } = this.state;
    const user =
      userTypeSelected == 0 ? this.OnHandleGetParticipants() : this.OnHandleGetExibitors();
    if (this.OnHandleValidateSignUp(user)) addUser(user);
  };

  OnHandleEventType = index => {
    let { events } = this.state;
    this.setState({
      schedules: events[index].schedules,
      selectedEvent: events[index]
    });
  };

  OnHandlePicture = event => {
    const { onUpload } = this.props;

    // onUpload({ filePath: event.target.value });
    this.setState({ profilePic: URL.createObjectURL(event.target.files[0]) });
  };

  OnHandleCheckPrivacy = () => {
    const { isCheckedPrivacy } = this.state;
    this.setState({ isCheckedPrivacy: !isCheckedPrivacy });
  };

  componentWillMount() {
    const { getLatestEvents, getInstitution } = this.props;
    getLatestEvents();
    getInstitution();
  }

  render() {
    return (
      <MDBContainer style={style.main} id='mainTab'>
        <TabLinks parent={this} />
        {this.props.auth.isAuthenticated && <Redirect to='/events' />}
        <MDBTabContent className='card' activeItem={this.state.activeItem} style={style.tabs}>
          <AboutTab parent={this} />
          <LoginTab parent={this} />
          <SingUpTab parent={this} />
        </MDBTabContent>
        <ToastContainer />
      </MDBContainer>
    );
  }
}

const style = {
  main: {
    width: '63.7vw'
  },
  tabs: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  white: {
    color: '#fff'
  },
  about: {
    color: '#fff',
    lineHeight: '1.5em',
    fontSize: 15.5,
    fontFamily: 'Helvetica'
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
    width: '5.5em',
    position: 'relative',
    bottom: '.1em',
    margin: 'auto'
  },
  aboutFirst: {
    marginTop: '2em'
  },
  buttonSignUp: {
    border: 'solid 1px #8ec63f85',
    color: '#8ec63f',
    width: '23em',
    borderRadius: '5px',
    padding: '.75em',
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 40
  },
  buttonLogin: {
    border: '1px solid rgba(255, 255, 255, 0.35)',
    color: 'rgba(255, 255, 255, 0.51)',
    width: '23em',
    borderRadius: '5px',
    padding: '.75em',
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '2.5em',
    height: 40
  },
  tabTitle: {
    marginTop: 7,
    marginBottom: 1,
    fontFamily: 'Harabara',
    fontSize: 14
  },
  input: {
    fontSize: 10,
    padding: '1em 1.5em',
    color: '#fff'
  },
  inputEmail: {
    position: 'relative',
    top: '1.3em'
  },
  loginForm: {
    width: '28.3vw',
    position: 'relative',
    top: '1em'
  },
  signUpForm: {
    width: '22.9vw',
    position: 'relative',
    marginTop: '1.8em'
  },
  inputs: {
    margin: 0
  },
  privacyPolicy: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 13.5,
    letterSpacing: 0.3,
    textAlign: 'center'
  },
  privacyPolicyLinks: {
    color: '#fff',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  privacyCheckBox: {
    height: 18,
    width: 18,
    border: 'solid 1px #8ec63f',
    display: 'inline-block',
    borderRadius: 3,
    marginRight: 16,
    cursor: 'pointer'
  },
  agree: {
    fontSize: 13,
    position: 'relative',
    bottom: '.4em',
    color: '#fff',
    fontFamily: 'Helvetica'
  },
  agreeContainer: {
    position: 'relative',
    right: '1em',
    width: '110%'
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  loginError: state.auth.error,
  events: state.event.events,
  institution: state.institution.institution,
  user: state.user,
  signUpError: state.user.error,
  booking: state.booking
});

export default connect(
  mapStateToProps,
  { loginUser, getLatestEvents, getInstitution, addUser, setBookings }
)(withRouter(HomeTab));
