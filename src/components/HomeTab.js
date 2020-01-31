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
import { login, getInstitution, addUser, upload } from '../store/actions';
import { connect } from 'react-redux';

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
          onClick={parent.OnHandleSignUp}
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
    events: [
      {
        id: 0,
        date: 'Feb 28',
        address: 'New world Hotel Makati',
        scheds: [
          {
            id: 1,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 2,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 3,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 4,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 5,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 6,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 7,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 8,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 9,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 10,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 11,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 12,
            startTime: '2:30',
            endTime: '2:50'
          }
        ]
      },
      {
        id: 1,
        date: 'Feb 28',
        address: 'New world Hotel Makati',
        scheds: [
          {
            id: 13,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 14,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 15,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 16,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 17,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 18,
            startTime: '2:30',
            endTime: '2:50'
          }
        ]
      },
      {
        id: 2,
        date: 'Feb 28',
        address: 'All',
        scheds: [
          {
            id: 19,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 20,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 21,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 22,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 23,
            startTime: '2:30',
            endTime: '2:50'
          },
          {
            id: 24,
            startTime: '2:30',
            endTime: '2:50'
          }
        ]
      }
    ],
    schedules: {},
    userTypeSelected: null,
    institutionTypes: [],
    institutionType: null,
    companyWebsite: '',
    confirmPassword: ''
  };

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) window.location.replace('/events');
  }

  OnHandleToggle = tab => () => {
    if (this.state.activeItem !== tab) this.setState({ activeItem: tab });
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

  OnHandleGetTimeSlots = schedules => {
    this.setState({ schedules });
  };

  OnHandleCheckTerms = () => {
    const { isCheckedPrivacy } = this.state;
    this.setState({ isCheckedPrivacy: !isCheckedPrivacy });
  };

  OnHandleSignUpType = id => {
    this.setState({ userTypeSelected: id });
  };

  OnHandleInstitutionType = id => {
    const { institutionTypes } = this.state;
    this.setState({ institutionType: id });
  };

  OnHandleSignUpForm = () => {
    if (this.state.userTypeSelected === 0) {
      return <ParticipantSignUp parent={this} />;
    } else if (this.state.userTypeSelected === 1) {
      return <ExhibitorSignUp parent={this} />;
    }
  };

  componentWillReceiveProps() {
    const {
      isLoggedIn,
      payloadLogin,
      isLoggingIn,
      payloadUser,
      isRequesting,
      payloadInstitution,
      requestSuccessful,
      isUploading,
      isUploaded
    } = this.props;

    if (isUploading && !isUploaded) {
      console.log(payloadUser);
    } else if (!isUploading && isUploaded) {
      console.log(payloadUser);
    }

    if (Object.keys(payloadInstitution).length > 0) {
      let types = [];

      delete payloadInstitution.status;
      delete payloadInstitution.ok;
      Object.values(payloadInstitution).map((e, i) => {
        types.push(e);
      });
      console.log(types);
      this.setState({ institutionTypes: types });
    }

    if (isRequesting && !requestSuccessful) {
      if (payloadUser.code != 200) {
        try {
          if (
            payloadUser.message.search('email') >= 0 ||
            payloadUser.message.search('Email') >= 0
          ) {
            document.getElementById('signUpEmail').classList.add('invalid-field');
            toast.error(payloadUser.message);
          } else {
            document.getElementById('signUpEmail').classList.remove('invalid-field');
          }
          console.log(payloadUser.message.search('Password'));
          if (payloadUser.message.search('Password') >= 0) {
            document.getElementById('signUpPassword').classList.add('invalid-field');
            toast.error(payloadUser.message);
          } else {
            document.getElementById('signUpPassword').classList.remove('invalid-field');
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else if (requestSuccessful && !isRequesting) {
      toast.success('Successfully registered');
    }

    if (isLoggingIn) {
      if (isLoggedIn && payloadLogin.accessToken) {
        if (payloadLogin.userType !== 'Admin') {
          window.location.replace('/events');
        } else if (isLoggedIn) {
          toast.error('Admin should not access this');
        }
      } else if (isLoggingIn && payloadLogin.code === 500) {
        toast.error(payloadLogin.message);
      }
    }
  }

  OnHandleLogin = () => {
    const { email, password } = this.state;
    const { onLogin } = this.props;

    if (isEmpty(email)) {
      toast.error('Please enter your email address');
    } else if (isEmpty(password)) {
      toast.error('Please enter your password');
    } else {
      onLogin({
        email,
        password
      });
    }
  };

  OnHandleSignUp = () => {
    const { onAddUser } = this.props;
    const {
      companyName,
      companyCountry,
      companyProvince,
      companyProfile,
      companyCity,
      firstName,
      lastName,
      jobTitle,
      phoneNumber,
      signUpEmail,
      signUpPassword,
      institutionName,
      programs,
      institutionType,
      companyWebsite,
      confirmPassword,
      userTypeSelected,
      isCheckedPrivacy
    } = this.state;

    const participant = {
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
      confirmPassword
    };

    const exhibitor = {
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
      confirmPassword: confirmPassword
    };

    let userType, user;
    if (userTypeSelected == 0) {
      userType = 'participant';
      user = participant;
    } else {
      userType = 'exhibitor';
      user = exhibitor;
    }

    for (const key of Object.keys(user)) {
      if (user[key] <= 0) {
        if (user[key] === null || user[key] === undefined || user[key].trim() === '') {
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
                console.log(key);
                document.getElementById(key).classList.add('invalid-field');
              } else {
                document.getElementById(k).classList.remove('invalid-field');
              }
            } catch (error) {}
          });

          toast.error(
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
          return true;
        }
      }
    }

    if (!isCheckedPrivacy) {
      toast.error('Please agree with the terms and conditions');
      return false;
    }

    const userData = {
      ...user,
      userType
    };

    onAddUser(userData);
  };

  OnHandleEventType = id => {
    let { events, scheds } = this.state;
    events.map(e => {
      if (e['id'] == id) {
        scheds = e.scheds;
      }
    });

    this.setState({ scheds });
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
    const { events } = this.state;
    for (let i = 0; i < events.length; i++) {
      events[i]['name'] = `${events[i]['date']} - ${events[i]['address']}`;
    }
    const { onShowInstitution } = this.props;
    onShowInstitution();

    this.setState({ events });
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <MDBContainer style={style.main} id='mainTab'>
        {/* {isLoggedIn && <Redirect to='/events' />} */}
        <TabLinks parent={this} />
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
  payloadLogin: state.auth.payload,
  isLoggedIn: state.auth.isLoggedIn,
  isLoggingIn: state.auth.isLoggingIn,
  payloadInstitution: state.institution.payload,
  isRequesting: state.user.isRequesting,
  payloadUser: state.user.payload,
  requestSuccessful: state.user.requestSuccessful
});

const mapDispatchToProps = dispatch => ({
  onShowInstitution: () => dispatch(getInstitution()),
  onLogin: data => dispatch(login(data)),
  onAddUser: data => dispatch(addUser(data)),
  onUpload: data => dispatch(upload(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTab);
