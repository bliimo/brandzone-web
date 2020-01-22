import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Button from './Button';
import Text from './Text';
import EllipsisText from 'react-ellipsis-text';
import MediaQuery from 'react-responsive';

class BookingProfileList extends Component {
  state = {
    profile: {
      profilePic: '',
      institutionName: ''
    },
    OnHandleResetProfile: null
  };

  componentDidMount() {
    const { OnHandleResetProfile } = this.props.parent;
    this.setState({ OnHandleResetProfile });
  }

  componentWillReceiveProps() {
    const { selectedProfile } = this.props.parent.state;
    if (selectedProfile) this.setState({ profile: selectedProfile });
  }

  render() {
    const { profilePic, institutionName } = this.state.profile;
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
              <img className='booking-profile-img w-100 h-100' src={profilePic} alt='profile' />
            </MDBCol>
            <MDBCol xl={'8'} lg={'6'} md={'6'} className='col-info profile-institution-info'>
              <Text style={style.institutionName}>{institutionName}</Text>
              <MDBRow className='mr-0 ml-0'>
                <MDBCol xl={'6'} md={'12'} className='p-0'>
                  <Text className='booking-profile-info' style={style.profileInfo}>
                    Profile Description:&nbsp;&nbsp;
                    <MediaQuery maxDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={35}
                      />
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={18}
                      />
                    </MediaQuery>
                  </Text>
                </MDBCol>
                <MDBCol xl={'6'} md={'12'} className='p-0'>
                  <Text className='booking-profile-info pl-2' style={style.profileInfo}>
                    Tel Number:&nbsp;&nbsp;
                    <MediaQuery maxDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={40}
                      />
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={18}
                      />
                    </MediaQuery>
                  </Text>
                </MDBCol>
                <MDBCol xl={'6'} md={'12'} className='p-0'>
                  <Text className='booking-profile-info' style={style.profileInfo}>
                    Participant Name:&nbsp;&nbsp;
                    <MediaQuery maxDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={39}
                      />
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={19}
                      />
                    </MediaQuery>
                  </Text>
                </MDBCol>
                <MDBCol xl={'6'} md={'12'} className='p-0'>
                  <Text className='booking-profile-info pl-2' style={style.profileInfo}>
                    Email:&nbsp;&nbsp;
                    <MediaQuery maxDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={45}
                      />
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={23}
                      />
                    </MediaQuery>
                  </Text>
                </MDBCol>
                <MDBCol xl={'6'} md={'12'} className='p-0'>
                  <Text className='booking-profile-info' style={style.profileInfo}>
                    Job Title:&nbsp;&nbsp;
                    <MediaQuery maxDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={45}
                      />
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={27}
                      />
                    </MediaQuery>
                  </Text>
                </MDBCol>
                <MDBCol xl={'6'} md={'12'} className='p-0'>
                  <Text className='booking-profile-info pl-2' style={style.profileInfo}>
                    Available Slots:&nbsp;&nbsp;
                    <MediaQuery maxDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={40}
                      />
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={768}>
                      <EllipsisText
                        text={`sdsds ssds sds dsds ds dsdsdsd dsdsdsd  dsdsdsd dsdsdsd dsdsdsd dsdsdsd v dsdsdsd dsdsdsd`}
                        length={15}
                      />
                    </MediaQuery>
                  </Text>
                </MDBCol>
                <MDBCol size={'12'} className='p-0 mt-2'>
                  <MDBRow>
                    <MDBCol size={'8'} className='pr-0'>
                      <Button style={style.btnSlot} className='btn-profile main-btn-profile'>
                        <Text style={style.time}>2:30 - 2:50</Text>
                      </Button>
                    </MDBCol>
                    <MDBCol size={'4'} className='p-0 '>
                      <Button style={style.btnBook}>
                        <Text style={style.time} className='btn-animate-get-slot'>
                          Get slot
                        </Text>
                      </Button>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol size={'12'} className='sched-text'>
              <Text className='text-center mb-0 avail-sched-text' style={style.scheduleText}>
                Available Schedules:
              </Text>
            </MDBCol>
          </MDBRow>
          <MDBRow className='slot-list-row mt-0' id='first-row-profile-btn'>
            <MDBCol size={'9'} className='pr-0'>
              <Button style={style.btnSlotList} className='btn-profile'>
                <Text style={style.time}>2:30 - 2:50</Text>
              </Button>
            </MDBCol>
            <MDBCol size={'3'} className='p-0'>
              <Button style={style.btnBookList} className='btn-animate-get-slot-list'>
                <Text style={style.time} className='btn-animate-get-slot-text'>
                  Get slot
                </Text>
              </Button>
            </MDBCol>
          </MDBRow>
          <MDBRow className='slot-list-row mt-0'>
            <MDBCol size={'9'} className='pr-0'>
              <Button style={style.btnSlotList} className='btn-profile'>
                <Text style={style.time}>2:30 - 2:50</Text>
              </Button>
            </MDBCol>
            <MDBCol size={'3'} className='p-0'>
              <Button style={style.btnBookList} className='btn-animate-get-slot-list'>
                <Text style={style.time} className='btn-animate-get-slot-text'>
                  Get slot
                </Text>
              </Button>
            </MDBCol>
          </MDBRow>
          <MDBRow className='slot-list-row mt-0'>
            <MDBCol size={'9'} className='pr-0'>
              <Button style={style.btnSlotList} className='btn-profile'>
                <Text style={style.time}>2:30 - 2:50</Text>
              </Button>
            </MDBCol>
            <MDBCol size={'3'} className='p-0'>
              <Button style={style.btnBookList} className='btn-animate-get-slot-list'>
                <Text style={style.time} className='btn-animate-get-slot-text'>
                  Get slot
                </Text>
              </Button>
            </MDBCol>
          </MDBRow>
          <MDBRow className='slot-list-row mt-0'>
            <MDBCol size={'9'} className='pr-0'>
              <Button style={style.btnSlotList} className='btn-profile'>
                <Text style={style.time}>2:30 - 2:50</Text>
              </Button>
            </MDBCol>
            <MDBCol size={'3'} className='p-0'>
              <Button style={style.btnBookList} className='btn-animate-get-slot-list'>
                <Text style={style.time} className='btn-animate-get-slot-text'>
                  Get slot
                </Text>
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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
    font: '31px Harabara',
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
    paddingTop: '1em'
  }
};
export default BookingProfileList;
