import React, { Component } from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';
import contents from '../constants/contents';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import response from '../helper/response';
import validation from '../helper/validation';
import Dropdown from './Dropdown';
import PictureUpload from './PictureUpload';
import EventTimeSlot from './EventTimeSlot';

const ParticipantDropDown = ({ parent }) => {
  return (
    <div style={style.participant}>
      <Dropdown
        items={parent.state.institutionTypes}
        action={parent.OnHandleInstitutionType}
        label='Type of Institution'
      />
    </div>
  );
};

const TabLinks = ({ parent }) => {
  return (
    <MDBNav tabs className='justify-content-center'>
      <MDBNavItem>
        <NavLink
          to='/'
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
        <Text
          className={`text-danger float-right text-error ${
            parent.state.emailError ? 'd-block' : 'd-none'
          }`}
        >
          {response.invalid('email address')}
        </Text>
        <TextInput
          placeholder='Password'
          id='password'
          onChange={parent.OnHandleChange}
          type='password'
          value={parent.state.password}
          size='sm'
          style={style.input}
          required={true}
        />
        <Text
          className={`text-danger float-right text-error bottom-3 ${
            parent.state.passwordError ? 'd-block' : 'd-none'
          }`}
        >
          {response.invalid('Invalid password')}
        </Text>
        <Button
          style={style.buttonLogin}
          id='btnLoginTab'
          className='btn-animate-login'
          onClick={() => parent.OnHandleLogin()}
        >
          <Text className='btn-animate-text-login'>Login</Text>
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
          items={parent.state.userType}
          action={parent.OnHandleSignUpType}
          label='Registration Type'
        />
        <ParticipantDropDown parent={parent} />
        <TextInput
          placeholder='Name of Company'
          id='companyName'
          onChange={parent.OnHandleChange}
          type='text'
          value={parent.state.companyName}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <TextInput
          placeholder='Country'
          id='companyCountry'
          onChange={parent.OnHandleChange}
          type='text'
          value={parent.state.companyCountry}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <TextInput
          placeholder='Province'
          id='companyProvince'
          onChange={parent.OnHandleChange}
          type='text'
          value={parent.state.companyProvince}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <TextInput
          placeholder='City'
          id='companyCity'
          onChange={parent.OnHandleChange}
          type='text'
          value={parent.state.companyCity}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <TextInput
          placeholder='Website'
          id='companyWebsite'
          onChange={parent.OnHandleChange}
          type='text'
          value={parent.state.companyWebsite}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <TextInput
          placeholder='Short profile of the Company'
          id='companyProfile'
          onChange={parent.OnHandleChange}
          type='textarea'
          value={parent.state.companyProfile}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
          rows={5}
        />
        <hr style={style.divider} />
        <TextInput
          placeholder='Name of Representative'
          id='repName'
          onChange={parent.OnHandleChange}
          type='text'
          value={parent.state.repName}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <TextInput
          placeholder='Job Title'
          id='jobTitle'
          onChange={parent.OnHandleChange}
          type='text'
          value={parent.state.jobTitle}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <TextInput
          placeholder='Email'
          id='signUpEmail'
          onChange={parent.OnHandleChange}
          type='email'
          value={parent.state.signUpEmail}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <TextInput
          placeholder='Telephone Number'
          id='phoneNumber'
          onChange={parent.OnHandleChange}
          type='email'
          value={parent.state.phoneNumber}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
        <PictureUpload OnHandlePicture={parent.OnHandlePicture} />
        <Dropdown
          items={parent.state.events}
          action={parent.OnHandleEventType}
          label='Choose an event you will be participating in:'
        />
        <EventTimeSlot OnHandleGetTimeSlots={parent.OnHandleGetTimeSlots} />
        <SubmitSignUp parent={parent} />
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
          onClick={parent.OnHandleToggle('3')}
        >
          <Text className='btn-animate-text-signup'>Sign Up</Text>
        </Button>
      </div>
    </div>
  );
};

class HomeTab extends Component {
  state = {
    activeItem: '3',
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    companyName: '',
    companyCountry: '',
    companyProvince: '',
    companyProfile: '',
    companyCity: '',
    repName: '',
    jobTitle: '',
    phoneNumber: '',
    signUpEmail: '',
    isCheckedPrivacy: false,
    userType: [
      {
        id: 1,
        name: 'Participant'
      },
      {
        id: 2,
        name: 'Exhibitors'
      }
    ],
    institutionTypes: [
      {
        id: 0,
        name: 'Organization'
      },
      {
        id: 1,
        name: 'University'
      }
    ],
    events: [
      {
        id: 0,
        name: 'Feb 28 - New world Hotel Makati'
      },
      {
        id: 1,
        name: 'March 2 - Seda Hotel Cebu'
      },
      {
        id: 2,
        name: 'All'
      }
    ],
    timeSlots: {}
  };

  OnHandleToggle = tab => () => {
    if (this.state.activeItem !== tab) this.setState({ activeItem: tab });
  };

  OnHandleChange = event => {
    let { emailError, passwordError } = this.state;
    if (event.target.id === 'email') emailError = !validation.isEmail(event.target.value);
    if (event.target.id === 'password')
      passwordError = !validation.isValidPassword(event.target.value);
    this.setState({ [event.target.id]: event.target.value, emailError, passwordError });
  };

  OnHandleLogin = () => {
    let { email, password, emailError, passwordError } = this.state;
    emailError = !validation.isEmail(email);
    passwordError = !validation.isValidPassword(password);
    this.setState({ emailError, passwordError });
  };

  OnHandleGetTimeSlots = timeSlots => {
    this.setState({ timeSlots });
  };

  OnHandleCheckTerms = () => {
    const { isCheckedPrivacy } = this.state;
    this.setState({ isCheckedPrivacy: !isCheckedPrivacy });
  };

  OnHandleSignUpType = id => {
    console.log('test', id);
  };

  OnHandleEventType = id => {
    console.log('test', id);
  };

  OnHandleInstitutionType = id => {
    console.log('test 2', id);
  };

  OnHandlePicture = event => {
    console.log('pic', event.target.files);
  };

  OnHandleCheckPrivacy = () => {
    const { isCheckedPrivacy } = this.state;
    this.setState({ isCheckedPrivacy: !isCheckedPrivacy });
  };

  render() {
    return (
      <MDBContainer style={style.main} id='mainTab'>
        <TabLinks parent={this} />
        <MDBTabContent className='card' activeItem={this.state.activeItem} style={style.tabs}>
          <AboutTab parent={this} />
          <LoginTab parent={this} />
          <SingUpTab parent={this} />
        </MDBTabContent>
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
  participant: {
    marginTop: '1em',
    marginBottom: '1.3em',
    backgroundColor: '#4B5755',
    borderRadius: 5
  },
  inputs: {
    margin: 0
  },
  divider: {
    border: 'solid 0.7px #ffffff2e',
    width: 150,
    marginBottom: '2.5em',
    marginTop: '1.8em'
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
export default HomeTab;
