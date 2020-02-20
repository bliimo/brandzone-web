import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Text from './Text';
import EllipsisText from 'react-ellipsis-text';
import MediaQuery from 'react-responsive';
import Button from './Button';
import ShowMoreText from 'react-show-more-text';
import { getReports } from '../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Informations = ({ account, OnHandleOpenProfile, OnHandleGetReports, isLoading }) => {
  let { phoneNumber, firstName, lastName, email, jobTitle, institution, company } = account;
  let nameInfo,
    countryInfo,
    provinceInfo,
    websiteInfo,
    profileDesc,
    cityInfo = '';

  if (company) {
    const { name, country, province, website, profile, city } = company;
    nameInfo = name;
    countryInfo = country;
    provinceInfo = province;
    websiteInfo = website;
    profileDesc = profile;
    cityInfo = city;
  }

  if (institution) {
    const { name, country, province, website, profile, city } = institution;
    nameInfo = name;
    countryInfo = country;
    provinceInfo = province;
    websiteInfo = website;
    profileDesc = profile;
    cityInfo = city;
  }

  return (
    <MDBCol size='12' className='col-info profile-institution-info'>
      <Text style={style.institutionName} className='mt-3'>
        {nameInfo}
      </Text>
      <MDBRow className='mr-0 ml-0'>
        <MDBCol xl='12' md='12' className='p-0'>
          <Text className='booking-profile-info p-desc p-main-desc' style={style.profileInfo}>
            {profileDesc}
          </Text>
        </MDBCol>
        <MDBCol xl='12' md='12' className='p-0 mt-3'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <span className='p-desc'>Name of representative:</span>&nbsp;
            <span className='text-capitalize'>
              {firstName}&nbsp;{lastName}
            </span>
          </Text>
        </MDBCol>
        <MDBCol xl='12' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <span className='p-desc'>Tel Number:</span>&nbsp;
            {phoneNumber && (
              <MediaQuery maxDeviceWidth={768}>
                <EllipsisText text={phoneNumber} length={40} />
              </MediaQuery>
            )}
            {phoneNumber && (
              <MediaQuery minDeviceWidth={768}>
                <EllipsisText text={phoneNumber} length={18} />
              </MediaQuery>
            )}
          </Text>
        </MDBCol>
        <MDBCol size='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <span className='p-desc'>Job title:</span>&nbsp;
            <span className='text-capitalize'>{jobTitle}</span>
          </Text>
        </MDBCol>
        <MDBCol size='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <span className='p-desc'>Email:</span>&nbsp;
            <span className='text-lowercase'>{email}</span>
          </Text>
        </MDBCol>
        <MDBCol size='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <span className='p-desc'>Country:</span>&nbsp;{' '}
            <span className='text-capitalize'>{countryInfo}</span>
          </Text>
        </MDBCol>
        <MDBCol size='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <span className='p-desc'>Province:</span>&nbsp;{' '}
            <span className='text-capitalize'>{provinceInfo}</span>
          </Text>
        </MDBCol>
        <MDBCol size='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <span className='p-desc'>City:</span>&nbsp;{' '}
            <span className='text-capitalize'>{cityInfo}</span>
          </Text>
        </MDBCol>
        <MDBCol size='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <span className='p-desc'>Website:</span>&nbsp;
            {websiteInfo}
          </Text>
        </MDBCol>
        <MDBCol sm='12' md='6' lg='6' className='justify-content-center'>
          <Button
            className='w-100'
            id='btn-edit-profile'
            onClick={() => {
              OnHandleGetReports();
            }}
            style={style.btnDownLoad}
          >
            <Text style={style.time}>{isLoading ? 'Please wait ...' : 'Download schedules'}</Text>
          </Button>
        </MDBCol>
        <MDBCol sm='12' md='6' lg='6' className='justify-content-center'>
          <Button
            className='w-100'
            id='btn-edit-profile'
            onClick={() => {
              OnHandleOpenProfile();
            }}
            style={style.btnBookList}
          >
            <Text style={style.time}>Edit Profile</Text>
          </Button>
        </MDBCol>
      </MDBRow>
    </MDBCol>
  );
};

class Profile extends Component {
  state = {
    account: undefined
  };

  componentWillReceiveProps(nextProps) {
    const { report } = nextProps;
    if (Object.keys(report).length > 0) {
      window.open(report['MyBookedUrl']);
      window.open(report['BookedOnMeUrl']);
    }
  }

  componentDidMount() {
    if (this.props.account) {
      const { account } = this.props;
      this.setState({ account });
    }
  }

  render() {
    const { account } = this.state;
    let profilePicture = '';
    if (account) {
      profilePicture = account.profilePicture;
    }

    return (
      <div className='w-100'>
        <MDBContainer className='booking-profile'>
          <MDBRow id='booking-profile-row'>
            <MDBCol size='12' className='col-img'>
              <img
                style={style.profile}
                className={`booking-profile-img`}
                src={profilePicture}
                alt='profile'
              />
            </MDBCol>
            {account && (
              <Informations
                account={account}
                OnHandleOpenProfile={this.props.OnHandleOpenProfile}
                OnHandleGetReports={this.props.getReports}
                isLoading={this.props.isLoading}
              />
            )}
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const style = {
  backBtn: {
    color: '#fff'
  },
  backText: {
    opacity: 0.4,
    font: '10.5px Helvetica',
    marginLeft: 10,
    position: 'relative',
    bottom: '.1em'
  },
  backIcon: {
    fontSize: 13
  },
  institutionName: {
    color: '#fff',
    font: '16px Harabara',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'left',
    fontWeight: 'bold',
    display: 'inline-block',
    background: 'red'
  },
  profileInfo: {
    color: '#fff',
    textAlign: 'left',
    fontSize: '13px',
    fontFamily: 'Helvetica'
  },
  profileInfoTitle: {
    color: 'rgb(255, 255, 255)',
    textAlign: 'left',
    font: '16px Harabara',
    textTransform: 'uppercase',
    letterSpacing: 8,
    marginBottom: '0.65em',
    display: 'inline-block',
    background: 'red'
  },
  btnBookList: {
    color: '#b1b1b1',
    backgroundColor: 'rgba(75, 87, 85)',
    borderRadius: '6px',
    padding: '.5em',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '2em',
    height: 35,
    width: '110%',
    float: 'left',
    right: '1.7em',
    letterSpacing: 0.7
  },
  btnDownLoad: {
    backgroundColor: '#8ec63f',
    color: '#fff',
    borderRadius: '6px',
    padding: '.5em',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '2em',
    height: 35,
    width: '110%',
    float: 'left',
    right: '1.7em',
    letterSpacing: 0.7
  },
  time: {
    font: '11px helvetica',
    position: 'relative',
    top: '.5em'
  },
  profile: {
    objectFit: 'contain',
    float: 'left',
    background: '#fff',
    padding: '.8em'
  }
};

const mapStateToProps = state => ({
  isLoading: state.report.isLoading,
  report: state.report.reports
});

export default connect(mapStateToProps, { getReports })(withRouter(Profile));
