import React, { Component } from 'react';
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBRow,
  MDBCol
} from 'mdbreact';
import { NavLink, Redirect } from 'react-router-dom';
import Button from '../components/Button';
import contents from '../constants/contents';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import validation from '../helper/validation';
import Dropdown from './Dropdown';
import ParticipantSignUp from './ParticipantSignUp';
import ExhibitorSignUp from './ExhibitorSignUp';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { loginUser, getLatestEvents, getInstitution, addUser, setBookings } from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import client1 from '../assets/images/clients/partners1-educanada@2x.png';
import client2 from '../assets/images/clients/partners1-Aus@2x.png';
import client3 from '../assets/images/clients/partners1-enz@2x.png';
import client4 from '../assets/images/clients/partners2-bc@2x.png';
import client5 from '../assets/images/clients/partners2-cican@2x.png';
import client6 from '../assets/images/clients/partners3-idp@2x.png';
import client7 from '../assets/images/clients/partners3-fortrust@2x.png';
import client8 from '../assets/images/clients/partners3-eca@2x.png';
import client9 from '../assets/images/clients/partners3-ielts@2x.png';
import client10 from '../assets/images/clients/partners4-scotiabank@2x.png';
import client11 from '../assets/images/clients/partners4-alberta@2x.png';
import client12 from '../assets/images/clients/partners4-brandwatch@2x.png';
import client13 from '../assets/images/clients/partners4-aircanada@2x.png';
import client14 from '../assets/images/clients/partners4-PAL@2x.png';
import client15 from '../assets/images/clients/partners4-qantas@2x.png';
import client16 from '../assets/images/clients/partners4-pldt@2x.png';
import client17 from '../assets/images/clients/partners4-laybare@2x.png';
import client18 from '../assets/images/clients/partners4-anz@2x.png';
import client19 from '../assets/images/clients/partners2-studyperth@2x.png';
import client20 from '../assets/images/clients/partners2-cbie@2x.png';
import client21 from '../assets/images/clients/partners2-edunova@2x.png';
import PrivacyContent from './PrivacyContent';
import AboutContent from './AboutContent';
import TermsContent from './TermsContent';

const TabLinks = ({ parent }) => {
  return (
    <MDBNav
      tabs
      className={`justify-content-center ${parent.state.activeItem == 1 ? 'd-none' : ''}`}
    >
      <MDBNavItem
        style={{
          display:
            parent.state.activeItem === '1' ||
            parent.state.activeItem === '2' ||
            parent.state.activeItem === '3'
              ? 'block'
              : 'none'
        }}
      >
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
      <MDBNavItem
        style={{
          display:
            parent.state.activeItem === '4' || parent.state.activeItem === '5' ? 'block' : 'none'
        }}
      >
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '4' ? 'active-tab' : ''}`}
          onClick={parent.OnHandleToggle('4')}
          role='tab'
        >
          <Text style={style.tabTitle}>PRIVACY POLICY</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
      <MDBNavItem
        style={{
          display:
            parent.state.activeItem === '5' || parent.state.activeItem === '4' ? 'block' : 'none'
        }}
      >
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '5' ? 'active-tab' : ''}`}
          onClick={parent.OnHandleToggle('5')}
          role='tab'
        >
          <Text style={style.tabTitle}>TERMS & CONDITIONS</Text>
          <hr />
        </NavLink>
      </MDBNavItem>

      <MDBNavItem
        style={{
          display: parent.state.activeItem === '6' ? 'block' : 'none'
        }}
      >
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '6' ? 'active-tab' : ''}`}
          onClick={parent.OnHandleToggle('6')}
          role='tab'
        >
          <Text style={style.tabTitle}>About Us</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
      <MDBNavItem
        style={{
          display: parent.state.activeItem === '7' ? 'block' : 'none'
        }}
      >
        <NavLink
          to='#'
          className={`nav-links ${parent.state.activeItem === '7' ? 'active-tab' : ''}`}
          onClick={parent.OnHandleToggle('7')}
          role='tab'
        >
          <Text style={style.tabTitle}>Contact Us</Text>
          <hr />
        </NavLink>
      </MDBNavItem>
    </MDBNav>
  );
};

const AboutTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='1' role='tabpanel' className='fade-effect'>
      <Text className='text-center tab-title' style={style.tabTitleHeader}>
        Welcome to Brandzone E-Scheduler
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <h4 className='text-center mt-5' style={style.abouth4}>
        Find the right partner for your institution
      </h4>
      <Text className='text-center m-0' style={{ ...style.about, ...style.aboutFirst }}>
        This business matching platform is made exclusively for exhibitors and participants at
        Brandzone's organized events. (small font)
      </Text>
      <div className='mt-5'>
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
      </div>
    </MDBTabPane>
  );
};
const AboutUsTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='6' role='tabpanel' className='fade-effect'>
      <Button className='cursor-pointer booking-signup-back' onClick={parent.OnHandleToggle('1')}>
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText}>Back to signup</span>
        </Text>
      </Button>
      <Text className='text-center tab-title' style={style.tabTitleHeader}>
        ABOUT US
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <div className='text-justify' style={{ ...style.about, ...style.aboutFirst }}>
        <AboutContent />
      </div>
    </MDBTabPane>
  );
};

const ContactUsTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='7' role='tabpanel' className='fade-effect'>
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
      <div className='text-center mt-3'>
        <Text className='m-0'>
          <h5 style={style.brand}>Brandzone Inc.</h5>
        </Text>
        <Text className='m-0 mt-2' style={style.address}>
          5388 Curie St., Brgy. Palanan, Makati City, Philippines
        </Text>
        <Text className='m-0 mt-2' style={style.address}>
          Tel. +632 8296 9044
        </Text>
        <a href='https://www.facebook.com/brandzoneinc'>
          <Text className='m-0 mt-2' style={style.address}>
            https://www.facebook.com/brandzoneinc
          </Text>
        </a>
        <a href='mailto:jjsaez@brandzone.ph'>
          <Text className='m-0 mt-2' style={style.address}>
            jjsaez@brandzone.ph
          </Text>
        </a>
      </div>
    </MDBTabPane>
  );
};

const PrivacyPolicyTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='4' role='tabpanel' className='fade-effect'>
      <Button className='cursor-pointer booking-signup-back' onClick={parent.OnHandleToggle('1')}>
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText}>Back to sign up</span>
        </Text>
      </Button>
      <Text className='text-center tab-title' style={style.tabTitleHeader}>
        PRIVACY POLICY
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <div className='text-justify' style={{ ...style.about, ...style.aboutFirst }}>
        <PrivacyContent />
      </div>
    </MDBTabPane>
  );
};

const TermsTab = ({ parent }) => {
  return (
    <MDBTabPane tabId='5' role='tabpanel' className='fade-effect'>
      <Button className='cursor-pointer booking-signup-back' onClick={parent.OnHandleToggle('1')}>
        <Text style={style.backBtn} className='back-button-text-signup'>
          <div id='chevron'></div>
          <span style={style.backText}>Back to sign up</span>
        </Text>
      </Button>
      <Text className='text-center tab-title' style={style.tabTitleHeader}>
        TERMS & CONDITIONS
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <div className='text-justify' style={{ ...style.about, ...style.aboutFirst }}>
        <TermsContent />
      </div>
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
      <Text className='text-center tab-title' style={style.tabTitleHeader}>
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
      <Text className='text-center tab-title' style={style.tabTitleHeader}>
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
        <NavLink to='#' style={style.privacyPolicyLinks} onClick={parent.OnHandleToggle('4')}>
          <strong>Privacy Policy</strong>
        </NavLink>
        &nbsp;and&nbsp;
        <NavLink to='#' style={style.privacyPolicyLinks} onClick={parent.OnHandleToggle('5')}>
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

const Clients = () => {
  return (
    <MDBContainer style={style.client} className='w-100 m-0 clients'>
      <Text style={style.clientTitle} className='mb-2'>
        OUR CLIENTS
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <MDBContainer className='clients text-center mt-5'>
        <img src={client1} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client2} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client3} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client21} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client4} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client5} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client6} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client7} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client8} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client9} style={style.clientImg} className='clientImg' alt='client' />
      </MDBContainer>
      <MDBContainer className='clients text-center'>
        <img src={client10} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client11} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client12} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client13} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client14} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client15} style={style.clientImg} className='clientImg' alt='client' />
      </MDBContainer>
      <MDBContainer className='clients text-center'>
        <img src={client16} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client17} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client18} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client19} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client20} style={style.clientImg} className='clientImg' alt='client' />
      </MDBContainer>
    </MDBContainer>
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
    console.log(tab);
    let { email, password } = this.state;
    if (tab === '1') {
      email = '';
      password = '';
    }
    if (this.toastId) toast.dismiss(this.toastId);
    window.scrollTo(0, 0);
    this.setState({ activeItem: tab, email, password });
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
    if (loginError && activeItem === '2' && this.state.email != '' && this.state.password != '') {
      this.notify(loginError);
      return false;
    }
    if (signUpError && activeItem === '3') {
      window.scrollTo(0, 0);
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
          window.scrollTo(0, 0);
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
      <React.Fragment>
        <Header OnHandleToggleHome={this.OnHandleToggle} />
        <MDBContainer style={style.main} id='mainTab'>
          <TabLinks parent={this} />
          {this.props.auth.isAuthenticated && <Redirect to='/events' />}
          <MDBTabContent className='card' activeItem={this.state.activeItem} style={style.tabs}>
            <AboutTab parent={this} />
            <LoginTab parent={this} />
            <SingUpTab parent={this} />
            <AboutUsTab parent={this} />
            <PrivacyPolicyTab parent={this} />
            <TermsTab parent={this} />
            <ContactUsTab parent={this} />
          </MDBTabContent>
          <ToastContainer />
        </MDBContainer>
        <Footer
          Clients={this.state.activeItem === '1' ? Clients : undefined}
          isAuthenticated={this.props.auth.isAuthenticated}
          isEvent={false}
          OnHandleToggle={this.OnHandleToggle}
        />
      </React.Fragment>
    );
  }
}

const style = {
  main: {
    marginBottom: '2em',
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
  abouth4: {
    color: '#fff',
    lineHeight: '1.5em',
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
    marginBottom: '1.25em',
    lineHeight: '.8em'
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
    width: '27vw',
    minWidth: '25vw !important',
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
    textAlign: 'center',
    marginBottom: '1em'
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
  },
  client: {
    backgroundColor: '#37424B',
    paddingTop: '4em',
    paddingBottom: '4em'
  },
  clientTitle: {
    fontSize: 39,
    letterSpacing: 4,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Harabara',
    textAlign: 'center',
    height: 35
  },
  clientImg: {
    height: 68,
    width: 'auto'
  },
  rowClient: {
    justifyContent: 'center'
  },
  backBtn: {
    color: '#fff'
  },
  backText: {
    opacity: 0.4,
    font: '10.5px Helvetica',
    marginLeft: '30px !important',
    position: 'relative',
    bottom: '.1em'
  },
  backIcon: {
    fontSize: 13
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
