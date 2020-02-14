import React, { Component } from 'react';
import { MDBContainer, MDBModalHeader, MDBModalBody, MDBModal, MDBModalFooter } from 'mdbreact';
import TextInput from './TextInput';
import Button from './Button';
import Text from './Text';
import { passwordUpdate } from '../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

class PasswordModal extends Component {
  state = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
    toggle: false
  };

  toastId = null;

  notify = txt => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.error(txt);
    }
  };
  OnHandleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    const { toggle, password, error, isLoading } = nextProps;
    if (toggle !== false) {
      if (!isLoading && error) this.notify(error);
      if (
        Object.keys(this.props.password).length === 0 &&
        !isLoading &&
        !error &&
        Object.keys(password).length > 0
      ) {
        toast.success(password.msg, 'success');
        this.setState({ oldPassword: '', password: '', confirmPassword: '' });
      }
    }
    this.setState({ toggle });
  }

  OnHandlePasswordChange = () => {
    this.props.passwordUpdate(this.state);
  };

  render() {
    const { oldPassword, password, confirmPassword } = this.state;
    return (
      <MDBContainer>
        <MDBModal
          size='sm'
          centered
          isOpen={this.state.toggle}
          toggle={this.props.OnHandleToogleModal}
        >
          <MDBModalHeader toggle={this.props.OnHandleToogleModal}>Change Password</MDBModalHeader>
          <MDBModalBody>
            {oldPassword && <Text className='label-input'>Old Password</Text>}
            <TextInput
              id='oldPassword'
              type='password'
              onChange={this.OnHandleChange}
              placeHolder='Old Password'
              maxLength='30'
              value={oldPassword}
              style={style.input}
              className='signup-input'
            />
            {password && <Text className='label-input'>New Password</Text>}
            <TextInput
              id='password'
              type='password'
              onChange={this.OnHandleChange}
              placeHolder='New Password'
              maxLength='30'
              value={password}
              style={style.input}
              className='signup-input'
            />
            {confirmPassword && <Text className='label-input'>Confirm Password</Text>}
            <TextInput
              id='confirmPassword'
              type='password'
              placeHolder='Confirm Password'
              maxLength='30'
              onChange={this.OnHandleChange}
              value={confirmPassword}
              style={style.input}
              className='signup-input'
            />
            <Button
              className='btn-edit'
              style={style.buttonConfirm}
              onClick={() => (!this.props.isLoading ? this.OnHandlePasswordChange() : '')}
            >
              <Text className='font-weight-bold' style={style.btnText}>
                {this.props.isLoading ? 'Please wait' : 'Update'}
              </Text>
            </Button>
            <Button
              className='btn-edit'
              style={style.buttonCancel}
              onClick={this.props.OnHandleToogleModal}
            >
              <Text className='font-weight-bold' style={style.btnText}>
                Cancel
              </Text>
            </Button>
          </MDBModalBody>
          <MDBModalFooter></MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

const style = {
  input: {
    fontSize: 10,
    padding: '1em 1.5em',
    color: '#fff'
  },
  buttonConfirm: {
    border: 'solid 1px #8ec63f85',
    color: '#8ec63f',
    width: '100%',
    borderRadius: '5px',
    padding: '.75em',
    textAlign: 'center',
    fontSize: '14px',
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
    width: '100%',
    borderRadius: '5px',
    padding: '.75em',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '2em',
    height: 40
  },
  btnText: {
    bottom: '.1em',
    position: 'relative'
  }
};

const mapStateToProps = state => ({
  password: state.password.password,
  error: state.password.error,
  isLoading: state.password.isLoading
});

export default connect(mapStateToProps, { passwordUpdate })(withRouter(PasswordModal));
