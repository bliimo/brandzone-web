import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Text from './Text';
import Button from './Button';
import EllipsisText from 'react-ellipsis-text';

const Profile = ({ parent }) => {
  let profiles = [];
  parent.state.users.map((e, i) => {
    profiles.push(
      <MDBCol
        key={i}
        xl={'4'}
        lg={'6'}
        md={'6'}
        sm={'12'}
        className='profile-list-booking'
        style={style.mainCol}
      >
        <MDBContainer>
          <MDBRow style={style.rowProfile} id='row-profile'>
            <MDBCol className='p-0' xl='5' lg={'6'} md={'6'} sm={'12'}>
              <img src={e.profilePic} alt='Profile' className='w-100 h-100' />
            </MDBCol>
            <MDBCol
              style={style.actionList}
              xl='7'
              lg={'6'}
              md={'6'}
              sm={'12'}
              className='actionList'
            >
              <Text style={style.institutionName}>
                <EllipsisText text={e.institutionName} length={13} />
              </Text>
              <Text style={style.name}>
                <EllipsisText text={`${e.firstName} ${e.lastName}`} length={19} />
              </Text>
              <Button className='profileBtnList' style={style.btnProfile}>
                <Text>{'View Profile'}</Text>
              </Button>
              <Button className='profileBtnList' style={style.btnSlot}>
                <Text>{'Book this slot'}</Text>
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBCol>
    );
  });

  return profiles;
};

class BookingProfileList extends Component {
  state = {
    users: [
      {
        id: 1,
        firstName: 'Participant',
        lastName: 'Name',
        institutionName: 'Institution',
        bookingId: 1,
        profilePic: 'https://i.pravatar.cc/300'
      },
      {
        id: 1,
        firstName: 'Participant',
        lastName: 'Name',
        institutionName: 'Institution',
        bookingId: 1,
        profilePic: 'https://i.pravatar.cc/300'
      },
      {
        id: 1,
        firstName: 'Participant',
        lastName: 'Name',
        institutionName: 'Institution',
        bookingId: 1,
        profilePic: 'https://i.pravatar.cc/300'
      },
      {
        id: 1,
        firstName: 'Participant',
        lastName: 'Name',
        institutionName: 'Institution',
        bookingId: 1,
        profilePic: 'https://i.pravatar.cc/300'
      },
      {
        id: 1,
        firstName: 'firstname',
        lastName: 'Name',
        institutionName: 'Institution',
        bookingId: 1,
        profilePic: 'https://i.pravatar.cc/300'
      },
      {
        id: 1,
        firstName: 'Participant',
        lastName: 'Name',
        institutionName: 'Institution',
        bookingId: 1,
        profilePic: 'https://i.pravatar.cc/300'
      }
    ]
  };

  componentWillMount() {}

  render() {
    return (
      <MDBContainer style={style.main}>
        <MDBRow>
          <Profile parent={this} />
        </MDBRow>
      </MDBContainer>
    );
  }
}

const style = {
  main: {
    padding: '0 2.3em'
  },
  actionList: {
    backgroundColor: 'rgba(28, 44, 49, 0.65)',
    padding: '3em 2em 3.8em 2em'
  },
  institutionName: {
    margin: 0,
    fontFamily: 'Harabara',
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontSize: 16,
    position: 'relative',
    bottom: '.2em'
  },
  mainCol: {
    marginTop: '1.8em'
  },
  name: {
    fontFamily: 'Harabara',
    fontWeight: 'bolder',
    letterSpacing: 1.1,
    textTransform: 'capitalize',
    fontSize: 13,
    marginTop: 4
  },
  btnProfile: {
    border: '.5px solid rgba(255, 255, 255, 0.56)',
    color: '#fff',
    backgroundColor: 'transparent',
    width: '100%',
    borderRadius: '5px',
    padding: '.45em',
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: 'normal',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '.5em'
  },
  btnSlot: {
    border: 'solid .5px rgba(142, 198, 63, 0.75)',
    color: '#8ec63f',
    backgroundColor: 'transparent',
    width: '100%',
    borderRadius: '5px',
    padding: '.45em',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1.5em',
    letterSpacing: 1
  }
};
export default BookingProfileList;
