import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody } from 'mdbreact';
import Button from './Button';
import Text from './Text';
import { book } from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ParticipantSignUp from './ParticipantSignUp';
import ExhibitorSignUp from './ExhibitorSignUp';
import { getInstitution, updateUser, logoutUser } from '../store/actions';
import { toast } from 'react-toastify';

class ModalProfile extends Component {
  toastId = null;
  state = {
    id: null,
    isOpenModal: false,
    institutionTypes: [],
    institutionType: null,
    institutionName: '',
    companyName: '',
    companyCountry: '',
    companyProvince: '',
    companyCity: '',
    companyWebsite: '',
    companyProfile: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    phoneNumber: '',
    programs: '',
    email: '',
    institutionTypeId: undefined,
    isNewInstitution: false,
    otherInstitution: '',
    institutionTypeIndex: 0
  };
  notify = txt => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.error(txt);
    }
  };
  OnHandleSetInstitution = institutionTypes => {
    this.setState({ institutionTypes });
  };

  OnHandleInstitutionType = index => {
    const { institutionTypes } = this.state;
    console.log(institutionTypes[index].id);
    this.setState({ institutionType: institutionTypes[index].id, institutionTypeIndex: index });
  };
  componentDidUpdate() {
    console.log(this.props.updateUser);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    let nameState,
      countryState,
      provinceState,
      cityState,
      websiteState,
      profileState,
      programsState = '';
    const { isOpenModal, account, institution, updateErr, userUpdated } = nextProps;
    let institutionTypeId = 0;
    if (updateErr) {
      toast.error(updateErr);
    }
    if (!updateErr && !updateErr && userUpdated.user) {
      institution.map((e, i) => {
        if (e.id == userUpdated.user.institutionType.id) {
          localStorage.setItem('institutionType', i);
          this.setState({ institutionType: e.id });
        }
      });
      window.location.reload();
    }
    if (institution) {
      this.OnHandleSetInstitution(institution);
    }
    if (institution && account && account.institutionType) {
      institution.map((e, i) => {
        if (e.id == account.institutionType.id) {
          localStorage.setItem('institutionType', i);
          this.setState({ institutionType: e.id });
        }
      });
    }

    this.setState({ isOpenModal });
    if (account) {
      const {
        id,
        firstName,
        lastName,
        jobTitle,
        phoneNumber,
        company,
        institutionType,
        email
      } = account;
      if (institutionType) {
        const { id, name, country, province, city, website, profile, programs } = institutionType;

        if (!localStorage.getItem('institutionType')) {
          localStorage.setItem('institutionType', id);
        }
        nameState = name;
        countryState = country;
        provinceState = province;
        cityState = city;
        websiteState = website;
        profileState = profile;
        programsState = programs;
        institutionTypeId = localStorage.getItem('institutionType')
          ? localStorage.getItem('institutionType')
          : id;
      }
      if (company) {
        const { name, country, province, city, website, profile } = company;
        nameState = name;
        countryState = country;
        provinceState = province;
        cityState = city;
        websiteState = website;
        profileState = profile;
      }

      if (account && account.institution) {
        const { name, country, province, city, website, profile, programs } = account.institution;
        nameState = name;
        countryState = country;
        provinceState = province;
        cityState = city;
        websiteState = website;
        profileState = profile;
        programsState = programs;
      }

      this.setState({
        id,
        companyName: nameState,
        companyCountry: countryState,
        companyProvince: provinceState,
        companyCity: cityState,
        companyWebsite: websiteState,
        companyProfile: profileState,
        firstName,
        lastName,
        jobTitle,
        phoneNumber,
        programs: programsState,
        institutionName: nameState,
        email,
        institutionTypeId
      });
    }
  }

  componentWillMount() {
    const { getInstitution } = this.props;
    getInstitution();
  }

  OnHandleChange = event => {
    if (event.target.value !== '') {
      document.getElementById(event.target.id).classList.remove('invalid-field');
    } else {
      document.getElementById(event.target.id).classList.add('invalid-field');
    }
    this.setState({ [event.target.id]: event.target.value });
  };

  OnHandlePicture = event => {
    const { onUpload } = this.props;
    // onUpload({ filePath: event.target.value });
    this.setState({ profilePic: URL.createObjectURL(event.target.files[0]) });
  };

  OnHandleNewInstitutions = () => {
    const { isNewInstitution, institutionTypes, institutionTypeIndex } = this.state;
    if (!isNewInstitution) {
      this.setState({ institutionType: institutionTypes[institutionTypeIndex] });
    }
    try {
      document.getElementById('institutionTypeId').classList.remove('invalid-field');
    } catch (error) {}
    this.setState({ isNewInstitution: !isNewInstitution });
  };

  OnHandleSignUpForm = userType => {
    if (userType === 'participant') {
      console.log(localStorage.getItem('institutionType'));
      return (
        <ParticipantSignUp
          parent={this}
          isUpdate={true}
          isActive={true}
          Activeid={localStorage.getItem('institutionType')}
        />
      );
    } else if (userType === 'exhibitor') {
      return (
        <ExhibitorSignUp
          parent={this}
          isUpdate={true}
          id={this.state.institutionType ? this.state.institutionType : undefined}
        />
      );
    }
  };

  OnHandleGetParticipants = () => {
    const {
      id,
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
      email
    } = this.state;

    return {
      id,
      email,
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
      userType: 'participant'
    };
  };

  OnHandleGetExibitors = () => {
    const {
      id,
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
      signUpPassword,
      confirmPassword,
      setBookings,
      email
    } = this.state;

    return {
      id,
      email,
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
      password: signUpPassword,
      confirmPassword: confirmPassword,
      bookingScheduleId: { scheduleId: setBookings },
      userType: 'exhibitor'
    };
  };

  OnHandleValidateSignUp = user => {
    for (const key of Object.keys(user)) {
      if (user[key] <= 0) {
        if (user[key] === null || user[key] === undefined || user[key] === '') {
          let fields = {};
          if (localStorage.getItem('userType') === 'participant') {
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

    return true;
  };

  OnHandleSetBookings = () => {
    const bookingScheds = this.state.setBookings;
    const { setBookings } = this.props;
    setBookings({ scheduleId: bookingScheds });
  };

  OnHandleValidateAddInstitution = () => {
    const { isNewInstitution, otherInstitution } = this.state;
    return isNewInstitution ? otherInstitution.trim().length > 0 : true;
  };

  OnHandleUpdate = () => {
    const { updateUser } = this.props;
    const { otherInstitution, isNewInstitution } = this.state;
    const user =
      localStorage.getItem('userType') == 'participant'
        ? this.OnHandleGetParticipants()
        : this.OnHandleGetExibitors();

    if (!this.OnHandleValidateAddInstitution()) {
      this.notify('Required institution name');
      document.getElementById('otherInstitution').classList.add('invalid-field');
      window.scrollTo(0, 0);
    } else {
      try {
        document.getElementById('otherInstitution').classList.remove('invalid-field');
      } catch (error) {}
      const isValid = this.OnHandleValidateSignUp(user);
      if (isValid) {
        user.institutionType = isNewInstitution ? otherInstitution : '';
        user.institutionTypeId = this.state.institutionType
          ? typeof this.state.institutionType == 'object'
            ? this.state.institutionType.id
            : this.state.institutionType
          : 0;
        updateUser(user);
      }
    }
  };

  render() {
    return (
      <MDBContainer>
        <MDBModal
          isOpen={this.state.isOpenModal}
          toggle={() => {}}
          style={style.modal}
          centered
          size='sm'
        >
          <MDBModalBody>
            <h3 className='mb-3'>Edit Profile</h3>
            {this.OnHandleSignUpForm(localStorage.getItem('userType'))}
            <Button style={style.buttonConfirm} onClick={() => this.OnHandleUpdate()}>
              <Text className='font-weight-bold' style={style.btnText}>
                {this.props.isLoading ? 'Please wait' : 'Update'}
              </Text>
            </Button>
            <Button style={style.buttonCancel} onClick={this.props.OnHandleOpenProfile}>
              <Text className='font-weight-bold' style={style.btnText}>
                Cancel
              </Text>
            </Button>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}
const style = {
  modal: {
    maxWidth: '650px',
    paddingLeft: '4em',
    paddingRight: '4em'
  },
  buttonConfirm: {
    border: 'solid 1px #8ec63f85',
    color: '#8ec63f',
    width: '23em',
    borderRadius: '5px',
    padding: '.75em',
    textAlign: 'center',
    fontSize: '1.1em',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 40
  },
  buttonCancel: {
    border: '1px solid rgba(255, 255, 255, 0.35)',
    color: 'rgba(255, 255, 255, 0.51)',
    width: '23em',
    borderRadius: '5px',
    padding: '.75em',
    textAlign: 'center',
    fontSize: '1.1em',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '2em',
    height: 40
  },
  btnText: {
    bottom: '.12em',
    position: 'relative'
  }
};

const mapStateToProps = state => ({
  account: state.auth.currentUser,
  institution: state.institution.institution,
  userUpdated: state.updateUser,
  user: state.updateUser,
  isLoading: state.updateUser.isLoading,
  updateErr: state.updateUser.error
});

export default connect(
  mapStateToProps,
  { book, getInstitution, updateUser, logoutUser }
)(withRouter(ModalProfile));
