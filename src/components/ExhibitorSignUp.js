import React from 'react';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import PictureUpload from './PictureUpload';
import EventTimeSlot from './EventTimeSlot';

const ExhibitorSignUp = ({ parent }) => {
  console.log(parent);
  return (
    <div>
      <TextInput
        placeholder='Institution Name'
        id='institutionName'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.institutionName}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
      />
      <TextInput
        placeholder='Country'
        id='companyCountry'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.companyCountry}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='Province'
        id='companyProvince'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.companyProvince}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='City'
        id='companyCity'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.companyCity}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='Website'
        id='companyWebsite'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.companyWebsite}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='Institution Profile'
        id='companyProfile'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.companyProfile}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
        rows={5}
      />
      <TextInput
        placeholder='Unique and Strong programs'
        id='programs'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.programs}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
        rows={5}
      />
      <hr style={style.divider} />
      <TextInput
        placeholder='Representative First name'
        id='firstName'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.firstName}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='Representative Last name'
        id='lastName'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.lastName}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='Job Title'
        id='jobTitle'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.jobTitle}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='Email'
        id='signUpEmail'
        onChange={parent.OnHandleChange}
        type='email'
        value={parent.state.signUpEmail}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='Password'
        id='signUpPassword'
        onChange={parent.OnHandleChange}
        type='password'
        value={parent.state.signUpPassword}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <TextInput
        placeholder='Telephone Number'
        id='phoneNumber'
        onChange={parent.OnHandleChange}
        type='email'
        value={parent.state.phoneNumber}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
      />
      <PictureUpload OnHandlePicture={parent.OnHandlePicture} parent={parent} />
      <Dropdown
        items={parent.state.events}
        action={parent.OnHandleEventType}
        label='Choose an event you will be participating in:'
      />
      <EventTimeSlot OnHandleGetTimeSlots={parent.OnHandleGetTimeSlots} parent={parent} />
    </div>
  );
};

export default ExhibitorSignUp;

const style = {
  inputs: {
    margin: 0
  },
  participant: {
    marginTop: '1em',
    marginBottom: '1.3em',
    backgroundColor: '#4B5755',
    borderRadius: 5
  },
  divider: {
    border: 'solid 0.7px #ffffff2e',
    width: 150,
    marginBottom: '2.5em',
    marginTop: '1.8em'
  }
};
