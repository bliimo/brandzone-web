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
    <MDBCol xl='8' lg='6' md='6' className='col-info profile-institution-info'>
      <Text style={style.institutionName}>{nameInfo}</Text>
      <br />
      <MDBRow className='mr-0 ml-0'>
        <MDBCol xl='12' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            <ShowMoreText
              lines={6}
              more='show more'
              less='show less'
              anchorClass=''
              expanded={false}
            >
              {profileDesc}
            </ShowMoreText>
          </Text>
        </MDBCol>
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Name of representative:&nbsp;&nbsp;
            <span className='text-capitalize'>
              {firstName}&nbsp;{lastName}
            </span>
          </Text>
        </MDBCol>
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Tel Number:&nbsp;&nbsp;
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
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Job title:&nbsp;&nbsp;
            <span className='text-capitalize'>{jobTitle}</span>
          </Text>
        </MDBCol>
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Email:&nbsp;&nbsp;
            <span className='text-lowercase'>{email}</span>
          </Text>
        </MDBCol>
        <br />
        <br />
        <MDBCol md='12' xl='6' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Country:&nbsp;&nbsp; <span className='text-capitalize'>{countryInfo}</span>
          </Text>
        </MDBCol>
        <MDBCol md='12' xl='6' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Province:&nbsp;&nbsp; <span className='text-capitalize'>{provinceInfo}</span>
          </Text>
        </MDBCol>
        <MDBCol md='12' xl='6' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            City:&nbsp;&nbsp; <span className='text-capitalize'>{cityInfo}</span>
          </Text>
        </MDBCol>
        <MDBCol md='12' xl='6' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Website:&nbsp;&nbsp;
            {websiteInfo}
          </Text>
        </MDBCol>
        <MDBCol size='12' className='justify-content-center'>
          <Button
            className='w-75'
            id='btn-edit-profile'
            onClick={() => {
              OnHandleGetReports();
            }}
            style={style.btnDownLoad}
          >
            <Text style={style.time}>{isLoading ? 'Please wait ...' : 'Download schedules'}</Text>
          </Button>
        </MDBCol>
        <MDBCol size='12' className='justify-content-center mt-3'>
          <Button
            className='w-75'
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
        <MDBContainer>
          <MDBRow id='booking-profile-row'>
            <MDBCol xl={'4'} lg={'6'} md={'6'} className='col-img'>
              <img
                style={style.profile}
                className={`booking-profile-img w-100 mh-300`}
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
    font: '30px Harabara',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'left'
  },
  profileInfo: {
    color: '#fff',
    textAlign: 'left',
    font: '15px Helvetica',
    marginBottom: '.65em'
  },
  profileInfoTitle: {
    color: 'rgb(255, 255, 255)',
    textAlign: 'left',
    font: '30px Harabara',
    textTransform: 'uppercase',
    letterSpacing: 8,
    marginBottom: '0.65em'
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
    objectFit: 'containt',
    padding: '1em',
    backgroundColor: '#fff'
  }
};

const mapStateToProps = state => ({
  isLoading: state.report.isLoading,
  report: state.report.reports
});

export default connect(mapStateToProps, { getReports })(withRouter(Profile));
