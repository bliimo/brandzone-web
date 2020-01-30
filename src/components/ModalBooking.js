import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import Button from './Button';
import Text from './Text';
class ModalBooking extends Component {
  state = {
    id: 1,
    startTime: '2:30',
    endTime: '2:50',
    date: 'February 28',
    title: 'New World Hotel Makati',
    isOpen: true
  };

  OnHandleToogle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  componentWillReceiveProps() {
    this.setState({ isOpen: this.props.isOpen });
  }

  render() {
    const { id, startTime, endTime, date, title, isOpen } = this.state;
    return (
      <MDBContainer>
        <MDBModal isOpen={isOpen} toggle={() => this.OnHandleToogle()} style={style.modal} centered>
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
            <Button style={style.buttonConfirm}>
              <Text className='font-weight-bold' style={style.btnText}>
                Confirm slot
              </Text>
            </Button>
            <Button style={style.buttonCancel} onClick={() => this.OnHandleToogle()}>
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
export default ModalBooking;
