import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import Button from './Button';
import Text from './Text';
import { getMonthName } from '../helper/date';
import { book } from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import loader from '../assets/images/loader.gif';

import { getInstitution } from '../store/actions';
class ModalBooking extends Component {
  componentDidUpdate() {
    if (this.props.error) {
      toast.error(this.props.error.data.message);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { booking, error, isLoading } = nextProps;
    if (!isLoading && booking != null && Object.keys(error).length == 0) {
      this.props.parent.OnHandleCloseModal();
    }
  }

  componentWillMount() {
    this.props.getInstitution();
  }

  onHandleBooking = () => {
    this.props.book(this.props.parent.state.selectedSlot);
  };

  render() {
    let { title, date } = this.props.parent.state.event;
    let dateArr = date.split('T')[0].split('-');
    date = `${getMonthName(dateArr[1])} ${dateArr[2]}`;
    let { startTime, endTime } = this.props.parent.state.selectedSchedule;
    startTime = startTime.substring(0, startTime.length - 3);
    endTime = endTime.substring(0, endTime.length - 3);
    startTime = startTime.substring(0, 1) === '0' ? startTime.substring(1) : startTime;
    endTime = endTime.substring(0, 1) === '0' ? endTime.substring(1) : endTime;

    return (
      <MDBContainer>
        {this.props.isLoading && (
          <div id='loading' className='text-dark bg-light'>
            <img src={loader} alt='loader' />
          </div>
        )}
        <MDBModal
          isOpen={this.props.parent.state.isOpenModal}
          toggle={() => {}}
          style={style.modal}
          centered
        >
          <MDBModalBody>
            <h6>
              Get the {startTime}-{endTime}pm slot for this agency?
            </h6>
            <h6 className='mb-0'>
              You are booking a slot on {date} in {title}
            </h6>
            <h6 className='mt-0'>
              at {startTime}-{endTime}pm
            </h6>
            <p className='f-italic'>Once you confirm, you cannot cancel this meeting anymore.</p>
            <Button
              style={style.buttonConfirm}
              onClick={() => (this.props.isLoading ? () => {} : this.onHandleBooking())}
            >
              <Text className='font-weight-bold' style={style.btnText}>
                {this.props.isLoading ? 'Please wait...' : 'Confirm slot'}
              </Text>
            </Button>
            {!this.props.isLoading && (
              <Button
                style={style.buttonCancel}
                onClick={() => this.props.parent.OnHandleToogleModal(undefined)}
              >
                <Text className='font-weight-bold' style={style.btnText}>
                  Cancel
                </Text>
              </Button>
            )}
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
    bottom: '.5em',
    position: 'relative'
  }
};

const mapStateToProps = state => ({
  booking: state.booking,
  error: state.booking.error,
  isLoading: state.booking.isLoading
});

export default connect(mapStateToProps, { book, getInstitution })(withRouter(ModalBooking));
