import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';
import EllipsisText from 'react-ellipsis-text';
import MediaQuery from 'react-responsive';
import ModalBooking from './ModalBooking';
import Countdown from 'react-countdown';
import { setNotes } from '../store/actions';
const Counter = ({ parent }) => {
  const { event, selectedSchedule } = parent.state;
  const { startTime } = selectedSchedule;
  let date = event.date;
  let hour = parseInt(startTime.split(':')[0]) + 12;
  let min = startTime.split(':')[1];

  date = date.split('T')[0].split('-');
  let dateTime = new Date(date[0], parseInt(date[1]) - 1, date[2], hour, min);

  return (
    <Countdown
      date={dateTime}
      intervalDelay={0}
      precision={3}
      zeroPadTime={2}
      onComplete={parent.state.OnHandleResetProfile()}
      renderer={props => (
        <MDBRow>
          <MDBCol size={'12'}>
            <p style={style.counterRemaining}>Time Remaining</p>
          </MDBCol>
          <MDBCol size={'12'}>
            <div style={{ display: 'inline-flex', width: '100%' }}>
              <Text>
                <p style={style.counterMin}>
                  {props.minutes > 9 ? props.minutes : `0${props.minutes}`}
                </p>
                <p style={style.counterTitleMin}>Minutes</p>
              </Text>
              <Text style={style.counter}>:</Text>
              <Text>
                <p style={style.counter}>
                  {props.seconds > 9 ? props.seconds : `0${props.seconds}`}
                </p>
                <p style={style.counterTitleSec}>Seconds</p>
              </Text>
            </div>
          </MDBCol>
        </MDBRow>
      )}
    />
  );
};
const Slot = ({ slots, parent }) => {
  const slot = [];
  const { profile } = parent.state;
  slots.map((booking, index) => {
    let { startTime, endTime } = booking.schedule;
    startTime = startTime.substring(0, startTime.length - 3);
    endTime = endTime.substring(0, endTime.length - 3);
    startTime = startTime.substring(0, 1) === '0' ? startTime.substring(1) : startTime;
    endTime = endTime.substring(0, 1) === '0' ? endTime.substring(1) : endTime;
    if (profile.id != booking.booking.id) {
      slot.push(
        <MDBRow
          className='slot-list-row mt-0'
          key={index}
          id={index == 0 ? 'first-row-profile-btn' : ''}
        >
          <MDBCol size={'9'} className='pr-0'>
            <Button style={style.btnSlotList} className='btn-profile'>
              <Text style={style.time}>
                {startTime} - {endTime}
              </Text>
            </Button>
          </MDBCol>
          <MDBCol size={'3'} className='p-0'>
            <Button
              onClick={() => {
                parent.OnHandleToogleModal(booking.booking.id);
                parent.setState({ selectedSchedule: booking.schedule });
              }}
              style={style.btnBookList}
              className='btn-animate-get-slot-list'
            >
              <Text style={style.time} className='btn-animate-get-slot-text'>
                Get slot
              </Text>
            </Button>
          </MDBCol>
        </MDBRow>
      );
    }
  });

  return slot;
};
const Slots = ({ parent }) => {
  const { slots } = parent.state;
  return (
    <React.Fragment>
      <div id='slots'>{slots.length > 0 && <Slot slots={slots} parent={parent} />}</div>
    </React.Fragment>
  );
};

const Informations = ({ parent }) => {
  let {
    phoneNumber,
    firstName,
    lastName,
    email,
    jobTitle,
    institution
  } = parent.state.profile.setBy;
  let institutionName = '';

  try {
    institutionName = institution.name;
  } catch (error) {
    institutionName = parent.state.profile.setBy.company.name;
  }

  const { id, title } = parent.state.profile;
  let { startTime, endTime } =
    Object.keys(parent.state.selectedSchedule).length > 0
      ? parent.state.selectedSchedule
      : parent.state.profile.schedule;
  startTime = startTime.substring(0, startTime.length - 3);
  endTime = endTime.substring(0, endTime.length - 3);
  startTime = startTime.substring(0, 1) === '0' ? startTime.substring(1) : startTime;
  endTime = endTime.substring(0, 1) === '0' ? endTime.substring(1) : endTime;

  let date = parent.state.event.date;
  let hour = parseInt(startTime.split(':')[0]) + 12;
  let min = startTime.split(':')[1];

  date = date.split('T')[0].split('-');
  let dateTime = new Date(date[0], parseInt(date[1]) - 1, date[2], hour, min);
  const isDone = dateTime < new Date();
  return (
    <MDBCol xl='8' lg='6' md='6' className='col-info profile-institution-info'>
      {!title && <Text style={style.institutionName}>{institutionName}</Text>}
      <MDBRow className='mr-0 ml-0'>
        {title && (
          <MDBCol size='12' className='p-0'>
            <Text className='booking-profile-info' style={style.profileInfoTitle}>
              {title}
            </Text>
          </MDBCol>
        )}
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info' style={style.profileInfo}>
            Profile Description:&nbsp;&nbsp;N/A
            {/* <MediaQuery maxDeviceWidth={768}>
              <EllipsisText
                text={}
                length={35}
              />
            </MediaQuery> */}
            {/* <MediaQuery minDeviceWidth={768}>
              <EllipsisText
                text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                length={18}
              />
            </MediaQuery> */}
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
            {localStorage.getItem('userType') == 'exhibitor' ? 'Participant' : 'Exhibitor'}
            &nbsp; Name:&nbsp;&nbsp;
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
          <Text className='booking-profile-info pl-2' style={style.profileInfo}>
            Email:&nbsp;&nbsp;
            {email && (
              <MediaQuery maxDeviceWidth={768}>
                <EllipsisText text={email} length={45} />
              </MediaQuery>
            )}
            {email && (
              <MediaQuery minDeviceWidth={768}>
                <EllipsisText text={email} length={23} />
              </MediaQuery>
            )}
          </Text>
        </MDBCol>
        <MDBCol xl='6' md='12' className='p-0'>
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
        <MDBCol xl='6' md='12' className='p-0'>
          <Text className='booking-profile-info pl-2' style={style.profileInfo}>
            Available Slots:&nbsp;&nbsp;{parent.state.slots.length}
          </Text>
        </MDBCol>
        {!title && (
          <MDBCol size='12' className='p-0 mt-2'>
            <MDBRow>
              <MDBCol size='8' className='pr-0'>
                <Button style={style.btnSlot} className='btn-profile main-btn-profile'>
                  <Text style={style.time}>
                    {startTime} - {endTime}
                  </Text>
                </Button>
              </MDBCol>
              <MDBCol size='4' className='p-0 '>
                <Button
                  style={style.btnBook}
                  onClick={() => {
                    parent.OnHandleToogleModal(id);
                  }}
                >
                  <Text style={style.time} className='btn-animate-get-slot'>
                    Get slot
                  </Text>
                </Button>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        )}

        {title && isDone && (
          <MDBCol size='12' className='p-0 mt-2'>
            <Button style={style.buttonTimeBooked} className='btn-done inactive meeting-done'>
              <Text className='text-capitalize btn-booked done'>Meeting Done</Text>
            </Button>
          </MDBCol>
        )}
        {title && parent.OnHandleType() && (
          <MDBCol size='12' className='p-0 mt-2'>
            <Counter parent={parent} />
          </MDBCol>
        )}
        {title && !parent.OnHandleType() && !isDone && (
          <MDBCol size='12' className='p-0 mt-2'>
            <Text style={style.bookedSlot}>
              Booked Slot:&nbsp;{startTime}&nbsp;-&nbsp;{endTime}pm
            </Text>
          </MDBCol>
        )}
      </MDBRow>
    </MDBCol>
  );
};

class BookingProfile extends Component {
  state = {
    account: {},
    profile: {},
    OnHandleResetProfile: null,
    selectedSchedule: {},
    event: {},
    selectedSlot: null,
    slots: [],
    notes: '',
    isEditing: false,
    OnHandleResetEvents: () => {},
    OnHandleSetNotes: () => {}
  };

  componentWillReceiveProps(nextProps) {
    const {
      selectedProfile,
      selectedSchedule,
      events,
      activeItem,
      account
    } = this.props.parent.state;

    if (!this.props.parent.props.isLoading && this.props.parent.props.booking) {
      this.OnHandleEditing(false);
    }

    const { OnHandleResetProfile, OnHandleResetEvents, OnHandleSetNotes } = this.props.parent;
    const event = events[activeItem];
    let slots = [];
    if (event != undefined && Object.keys(event).length > 0 && selectedProfile) {
      event.schedules.map(schedule => {
        schedule.booking.map(booking => {
          if (booking.bookedBy == null && booking.setBy.id === selectedProfile.setBy.id) {
            slots.push({ booking, schedule });
          }
        });
      });
    }
    if (selectedProfile) {
      this.setState({
        profile: { ...selectedProfile, isOpenModal: false },
        selectedSchedule: selectedProfile.schedule ? selectedProfile.schedule : selectedSchedule,
        event,
        OnHandleResetProfile,
        OnHandleResetEvents,
        OnHandleSetNotes,
        slots,
        account,
        notes: selectedProfile.notes
      });
    }
  }

  OnHandleToogleModal(id) {
    this.setState({ isOpenModal: id != undefined, selectedSlot: id });
  }

  OnHandleCloseModal() {
    this.setState({ isOpenModal: false });
    this.state.OnHandleResetEvents();
  }

  OnHandleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  OnHandleType = () => {
    const { event, selectedSchedule } = this.state;
    const { startTime, endTime } = selectedSchedule;
    let date = event.date;
    let hour = parseInt(startTime.split(':')[0]) + 12;
    let min = startTime.split(':')[1];
    date = date.split('T')[0].split('-');
    let start = new Date(date[0], parseInt(date[1]) - 1, date[2], hour, min);
    hour = parseInt(endTime.split(':')[0]) + 12;
    min = endTime.split(':')[1];
    let end = new Date(date[0], parseInt(date[1]) - 1, date[2], hour, min);

    return new Date() >= start && new Date() < end;
  };

  OnHandleEditing = isEdit => {
    let { isEditing } = this.state;
    isEditing = isEdit != undefined ? isEdit : !isEditing;
    this.setState({ isEditing });
  };

  render() {
    const { profile, isOpenModal, event, account, OnHandleSetNotes, notes } = this.state;
    const { profilePic, title, bookedBy } = profile;

    return (
      <MDBContainer fluid className='booking-profile'>
        <Button
          className='cursor-pointer booking-profile-back'
          onClick={() => this.state.OnHandleResetProfile()}
        >
          <Text style={style.backBtn} className='back-button-text'>
            <div id='chevron'></div>
            <span style={style.backText}>Back to your schedule</span>
          </Text>
        </Button>
        <MDBContainer className='booking-profile-main'>
          <MDBRow id='booking-profile-row'>
            <MDBCol xl={'4'} lg={'6'} md={'6'} className='col-img'>
              <img
                className={`booking-profile-img w-100 mh-300`}
                src={
                  'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwih5p6w-rTnAhXPc94KHYsJBwIQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Favatar&psig=AOvVaw2fD995hEdizGvBk7WqD4bN&ust=1580804651584965'
                }
                alt='profile'
              />
            </MDBCol>
            {Object.keys(profile).length > 0 && <Informations parent={this} />}
            {!title && this.state.slots.length > 1 && (
              <MDBCol size={'12'} className='sched-text'>
                <Text className='text-center mb-0 avail-sched-text' style={style.scheduleText}>
                  Available Schedules:
                </Text>
              </MDBCol>
            )}
            {title && (
              <MDBCol size={'12'}>
                <Text>
                  <p style={style.notes}>Notes:</p>
                </Text>
                <TextInput
                  id='notes'
                  onChange={this.OnHandleChange}
                  type='textarea'
                  value={this.state.notes}
                  size='xl'
                  disabled={!this.state.isEditing || account.id !== bookedBy.id}
                  required={true}
                  autocomplete='off'
                  className='signup-input'
                  style={style.inputs}
                  rows={5}
                />
                {account.id === bookedBy.id && (
                  <Button
                    onClick={() =>
                      this.props.parent.props.isLoading
                        ? () => {}
                        : !this.state.isEditing
                        ? this.OnHandleEditing()
                        : OnHandleSetNotes(profile.id, notes)
                    }
                    style={style.btnSave}
                  >
                    <Text style={style.txtSave}>
                      {this.props.parent.props.isLoading
                        ? 'Please wait...'
                        : !this.state.isEditing
                        ? 'Edit'
                        : 'Save'}
                    </Text>
                  </Button>
                )}
              </MDBCol>
            )}
          </MDBRow>
          {!title && this.state.slots.length > 1 && <Slots parent={this} />}
        </MDBContainer>
        {isOpenModal && <ModalBooking parent={this} />}
      </MDBContainer>
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
    font: '11.2px Helvetica',
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
  btnSlot: {
    color: '#b1b1b1',
    backgroundColor: 'rgba(75, 87, 85, 0.47)',
    borderRadius: '5px',
    padding: '.6em',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 37,
    width: '89%',
    float: 'left'
  },
  btnBook: {
    color: '#fff',
    backgroundColor: '#8ec63f',
    borderRadius: '5px',
    padding: '.4em',
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 37,
    width: '105%',
    float: 'left',
    right: '1em',
    letterSpacing: 0.5
  },
  btnSlotList: {
    color: '#b1b1b1',
    backgroundColor: 'rgba(75, 87, 85)',
    borderRadius: '6px',
    padding: '.18em',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 27,
    width: '90.5%',
    float: 'left'
  },
  btnBookList: {
    color: '#8ec63f',
    border: '1px solid #8ec63f',
    backgroundColor: 'transparent',
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
  },
  scheduleText: {
    fontSize: 11.5,
    fontFamily: 'Helvetica',
    position: 'relative',
    color: '#fff',
    bottom: '2em'
  },
  counter: {
    color: '#8ec63f',
    fontSize: 45,
    fontFamily: 'harabara',
    letterSpacing: 7,
    textAlign: 'center',
    padding: '0 .1em'
  },
  counterMin: {
    color: '#8ec63f',
    fontSize: 45,
    fontFamily: 'harabara',
    letterSpacing: 7,
    textAlign: 'center',
    padding: '0 .1em 0 0'
  },
  counterTitle: {
    color: '#fff',
    fontFamily: 'harabara',
    letterSpacing: 2,
    paddingTop: '.2em'
  },
  counterTitleMin: {
    color: '#fff',
    fontFamily: 'harabara',
    letterSpacing: 2,
    paddingTop: '.2em',
    textAlign: 'left',
    fontSize: '.7em'
  },
  counterTitleSec: {
    position: 'absolute',
    marginLeft: '.3em',
    color: '#fff',
    fontFamily: 'harabara',
    letterSpacing: 2,
    paddingTop: '.2em',
    fontSize: '.7em',
    textAlign: 'left'
  },
  counterRemaining: {
    color: '#fff',
    fontFamily: 'harabara',
    letterSpacing: 2,
    fontSize: '.6em',
    textAlign: 'left',
    paddingTop: '2em'
  },
  notes: {
    color: '#fff',
    fontFamily: 'harabara',
    letterSpacing: 2,
    fontSize: '.9em',
    textAlign: 'left',
    marginTop: '1.7em'
  },
  inputs: {
    margin: 0,
    height: 250
  },
  btnSave: {
    color: 'rgb(142, 198, 63)',
    border: '1px solid rgb(142, 198, 63)',
    backgroundColor: 'transparent',
    borderRadius: '6px',
    padding: '1.3em',
    width: '150px',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    height: '27px',
    letterSpacing: '0.7px'
  },
  txtSave: {
    font: '11px helvetica',
    position: 'relative',
    bottom: '.5em'
  },
  bookedSlot: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'left'
  },
  buttonTimeBooked: {
    color: '#fff',
    backgroundColor: 'transparent',
    width: '31.5em',
    borderRadius: '5px',
    padding: '.5em',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 37
  }
};

export default BookingProfile;
