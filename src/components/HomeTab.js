import React, { Component } from 'react';
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
} from 'mdbreact';
import Text from '../components/Text';
import {
  loginUser,
  getLatestEvents,
  getInstitution,
  addUser,
  setBookings,
  getMultipleLatestEvents,
  upload
} from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from '../assets/images/logo.png';

class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.toastId = null;
    this.state = {};
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <React.Fragment>
        <MDBContainer style={style.main} id='mainTab'>
          <MDBTabContent
            className='card'
            activeItem={this.state.activeItem}
            style={style.tabs}
          >
            <MDBTabPane tabId='1' role='tabpanel' className='fade-effect' style={style.container}>
              <img src={logo} style={style.logo} className='logo' />
              <Text className='text-center tab-title' style={{ ...style.tabTitleHeader, padding: '80px 0 0 0', lineHeight: 1.5 }} >
                Website under construction
              </Text>
              <hr style={style.tabTitleHeaderHr} />
            </MDBTabPane>
          </MDBTabContent>
        </MDBContainer>
      </React.Fragment>
    );
  }

  componentDidMount() {
    localStorage.removeItem('institutionType');
  }
}

const style = {
  main: {
    marginBottom: '2em',
    width: '63.7vw'
  },
  container: {
    display: 'block',
    top: '50%',
    transform: 'translateY(-50%)',
    position: 'relative'
  },
  logo: {
    margin: '0 auto',
    display: 'block',
    width: '300px'
  },
  tabs: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: '100vh',
    display: 'block'
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
    fontFamily: 'Helvetica',
    margin: '40px 0 30px',
    fontSize: '25px'
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
  backBtn: {
    color: '#fff'
  },
  backText: {
    opacity: 0.4,
    font: '10.5px Helvetica',
    marginLeft: '30px !important',
    position: 'relative',
    bottom: '.6em'
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
  },
  fb: {
    height: 20,
    marginTop: 10
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  loginError: state.auth.error,
  events: state.event.events,
  institution: state.institution.institution,
  user: state.user,
  signUpError: state.user.error,
  booking: state.booking,
  multipleEvent: state.multipleEvent,
  isLoadingMulti: state.multipleEvent.isLoading,
  upload: state.upload.upload,
  isloadingUpload: state.upload.isLoading
});

export default connect(mapStateToProps, {
  loginUser,
  getLatestEvents,
  getInstitution,
  addUser,
  setBookings,
  getMultipleLatestEvents,
  upload
})(withRouter(HomeTab));
