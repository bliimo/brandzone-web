import React from 'react';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import PictureUpload from './PictureUpload';
import EventTimeSlot from './EventTimeSlot';

const ParticipantSignUp = ({ parent, events }) => {
  return (
    <div>
      <div style={style.participant}>
        <Dropdown
          items={parent.state.institutionTypes}
          action={parent.OnHandleInstitutionType}
          label='Type of Institution'
        />
      </div>
      <TextInput
        placeholder='Name of Company'
        id='companyName'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.companyName}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
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
        placeholder='Short profile of the Company'
        id='companyProfile'
        onChange={parent.OnHandleChange}
        type='textarea'
        value={parent.state.companyProfile}
        size='sm'
        required={true}
        autocomplete='off'
        className='signup-input'
        style={style.inputs}
        rows={5}
      />
      <hr style={style.divider} />
      <TextInput
        placeholder='Name of Representative'
        id='repName'
        onChange={parent.OnHandleChange}
        type='text'
        value={parent.state.repName}
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
      <EventTimeSlot
        OnHandleGetTimeSlots={parent.OnHandleGetTimeSlots}
        scheds={parent.state.scheds}
      />
    </div>
  );
};

export default ParticipantSignUp;

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