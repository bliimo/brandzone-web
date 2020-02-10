import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Text from './Text';
import EllipsisText from 'react-ellipsis-text';
import MediaQuery from 'react-responsive';
import Button from './Button';

const Informations = ({ account, OnHandleOpenProfile }) => {
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
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Profile Description:&nbsp;&nbsp;{profileDesc}
          </Text>
        </MDBCol>
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info pl-2' style={style.profileInfo}>
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
            Name:&nbsp;&nbsp;
            {firstName && (
              <MediaQuery maxDeviceWidth={768}>
                <EllipsisText text={`${firstName} ${lastName}`} length={39} />
              </MediaQuery>
            )}
            {firstName && (
              <MediaQuery minDeviceWidth={768}>
                <EllipsisText text={`${firstName} ${lastName}`} length={19} />
              </MediaQuery>
            )}
          </Text>
        </MDBCol>
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info pl-2 text-lowercase ' style={style.profileInfo}>
            Email:&nbsp;&nbsp;
            {email}
          </Text>
        </MDBCol>
        <MDBCol xl='12' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Job Title:&nbsp;&nbsp;
            {jobTitle && (
              <MediaQuery maxDeviceWidth={768}>
                <EllipsisText text={jobTitle} length={45} />
              </MediaQuery>
            )}
            {jobTitle && (
              <MediaQuery minDeviceWidth={768}>
                <EllipsisText text={jobTitle} length={27} />
              </MediaQuery>
            )}
          </Text>
        </MDBCol>
        <br />
        <br />
        <MDBCol md='12' xl='6' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Country:&nbsp;&nbsp; {countryInfo}
          </Text>
        </MDBCol>
        <MDBCol md='12' xl='6' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Province:&nbsp;&nbsp; {provinceInfo}
          </Text>
        </MDBCol>
        <MDBCol md='12' xl='6' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            City:&nbsp;&nbsp; {cityInfo}
          </Text>
        </MDBCol>
        <MDBCol md='12' xl='6' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Website:&nbsp;&nbsp; {websiteInfo}
          </Text>
        </MDBCol>
        <br />
        <MDBCol size='12' className='justify-content-center'>
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

  componentWillReceiveProps(nextProps) {}

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
                className={`booking-profile-img w-100 mh-300`}
                src={
                  profilePicture
                    ? profilePicture
                    : 'https://bpxk748cf4n2yzlvi1rkrh61-wpengine.netdna-ssl.com/wp-content/uploads/sites/17/2018/06/Avatar-Unisex-Default.jpg'
                }
                alt='profile'
              />
            </MDBCol>
            {account && (
              <Informations
                account={account}
                OnHandleOpenProfile={this.props.OnHandleOpenProfile}
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
    padding: '.07em',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 27,
    width: '110%',
    float: 'left',
    right: '1.7em',
    letterSpacing: 0.7
  },
  time: {
    font: '11px helvetica',
    position: 'relative',
    top: '.5em'
  }
};

export default Profile;
