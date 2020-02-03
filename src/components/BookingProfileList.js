import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Text from './Text';
import Button from './Button';
import EllipsisText from 'react-ellipsis-text';
import ModalBooking from './ModalBooking';

const Profile = ({ parent }) => {
  let profiles = [];
  parent.state.bookings.map((booking, i) => {
    const { id, setBy, bookedBy } = booking;
    if (bookedBy == null) {
      let institution;
      setBy.roles.map(role => {
        if (role.authority === 'ROLE_EXHIBITOR') institution = setBy.institution.name;
        if (role.authority === 'ROLE_PARTICIPANT') institution = setBy.company.name;
      });
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
                <img
                  src={
                    'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwih5p6w-rTnAhXPc94KHYsJBwIQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Favatar&psig=AOvVaw2fD995hEdizGvBk7WqD4bN&ust=1580804651584965'
                  }
                  alt='Profile'
                  className={`${parent.props.isShowList ? 'h-230' : 'h-100'} w-100 `}
                />
              </MDBCol>
              <MDBCol
                style={style.actionList}
                xl='7'
                lg={'6'}
                md={'6'}
                sm={'12'}
                className='actionList'
              >
                <Text
                  style={style.institutionName}
                  className={`${parent.props.isShowList ? 'mt-1-3' : ''}`}
                >
                  <EllipsisText text={institution} length={13} />
                </Text>
                <Text style={style.name}>
                  <EllipsisText text={`${setBy.firstName} ${setBy.lastName}`} length={19} />
                </Text>
                <Button
                  className='profileBtnList'
                  onClick={() => {
                    parent.state.OnHandleSelectProfile(booking, parent.state.schedule);
                  }}
                  style={style.btnProfile}
                >
                  <Text>View Profile</Text>
                </Button>
                {!parent.props.isShowList && (
                  <Button
                    className='profileBtnList'
                    style={style.btnSlot}
                    onClick={() => {
                      parent.OnHandleToogleModal(id);
                    }}
                  >
                    <Text>Book this slot</Text>
                  </Button>
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      );
    }
  });

  return profiles.length > 0 ? (
    profiles
  ) : (
    <Text style={style.noAvailable}>No available schedules in this event.</Text>
  );
};

class BookingProfileList extends Component {
  state = {
    bookings: [],
    OnHandleSelectProfile: null,
    bookingScheduleId: null,
    schedule: {},
    account: {},
    isOpenModal: false,
    selectedSlot: null,
    selectedSchedule: {},
    event: {},
    OnHandleResetEvents: () => {}
  };

  OnHandleToogleModal(id) {
    this.setState({ isOpenModal: id != undefined, selectedSlot: id });
  }

  OnHandleCloseModal() {
    this.setState({ isOpenModal: false });
    this.state.OnHandleResetEvents();
  }

  componentWillReceiveProps(nextProps) {
    const { parent, bookingScheduleId, users, schedule, account, isShowList } = nextProps;
    const { events, activeItem } = parent.state;
    let bookings = [];
    users.map(user => {
      user.setBy.roles.map(role => {
        const currentRole =
          localStorage.getItem('userType') == 'exhibitor' ? 'ROLE_PARTICIPANT' : 'ROLE_EXHIBITOR';
        if (currentRole === role.authority) {
          bookings.push(user);
        }
      });
    });

    if (events && events.length > 0) {
      this.setState({
        OnHandleSelectProfile: parent.OnHandleSelectProfile,
        bookingScheduleId,
        bookings,
        schedule,
        account,
        selectedSchedule: schedule,
        event: events[activeItem],
        OnHandleResetEvents: parent.OnHandleResetEvents
      });
    }
  }

  render() {
    const { isOpenModal } = this.state;
    return (
      <MDBContainer style={style.main}>
        <MDBRow>
          <Profile parent={this} />
        </MDBRow>
        {isOpenModal && <ModalBooking parent={this} />}
      </MDBContainer>
    );
  }
}

const style = {
  main: {
    padding: '0 2.3em',
    marginBottom: '10em'
  },
  actionList: {
    backgroundColor: 'rgba(28, 44, 49, 0.65)',
    padding: '3em 2em 3.8em 2em'
  },
  institutionName: {
    margin: 0,
    fontFamily: 'Harabara',
    letterSpacing: 2,
    textTransform: 'capitalize',
    fontSize: 16,
    position: 'relative',
    bottom: '.2em',
    textAlign: 'left',
    color: '#fff'
  },
  mainCol: {
    marginTop: '1.8em'
  },
  name: {
    color: '#fff',
    fontFamily: 'Harabara',
    fontWeight: 'bolder',
    letterSpacing: 1.1,
    textTransform: 'capitalize',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'left'
  },
  noAvailable: {
    fontFamily: 'helvetica',
    fontSize: 17,
    color: '#fff'
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
