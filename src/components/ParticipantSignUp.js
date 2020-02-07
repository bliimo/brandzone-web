import React from 'react';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import PictureUpload from './PictureUpload';
import EventTimeSlot from './EventTimeSlot';
import Checkbox from './Checkbox';

const ParticipantSignUp = ({ parent, events, isUpdate, id, Activeid, isActive }) => {
  return (
    <div>
      <div className='d-flex institution-type-wrapper'>
        {!parent.state.isNewInstitution && (
          <div style={style.participant} className='other-institution'>
            <Dropdown
              Activeid={Activeid}
              isActive={isActive}
              id='institutionTypeId'
              items={parent.state.institutionTypes}
              action={parent.OnHandleInstitutionType}
              label='Type of Institution'
            />
          </div>
        )}
        {parent.state.isNewInstitution && (
          <TextInput
            placeHolder='Institution name'
            id='otherInstitution'
            onChange={parent.OnHandleChange}
            type='text'
            value={parent.state.otherInstitution}
            size='sm'
            required={true}
            autocomplete='off'
            className='signup-input w-100'
            style={style.inputs}
          />
        )}
        <Checkbox
          text='Others'
          checked={parent.state.isNewInstitution}
          onSelect={parent.OnHandleNewInstitutions}
          id='check-others'
        />
      </div>

      <TextInput
        placeHolder='Name of Company'
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
        placeHolder='Country'
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
        placeHolder='Province'
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
        placeHolder='City'
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
        placeHolder='Website'
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
        placeHolder='Short profile of the Company'
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
        placeHolder='Representative First name'
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
        placeHolder='Representative Last name'
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
        placeHolder='Job Title'
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
      {!isUpdate && (
        <TextInput
          placeHolder='Email'
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
      )}
      {!isUpdate && (
        <TextInput
          placeHolder='Password'
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
      )}
      {!isUpdate && (
        <TextInput
          placeHolder='Confirm Password'
          id='confirmPassword'
          onChange={parent.OnHandleChange}
          type='password'
          value={parent.state.confirmPassword}
          size='sm'
          required={true}
          autocomplete='off'
          className='signup-input'
          style={style.inputs}
        />
      )}
      <TextInput
        placeHolder='Telephone Number'
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
      {!isUpdate && parent.state.events.length > 0 && (
        <Dropdown
          items={parent.state.events}
          action={parent.OnHandleEventType}
          isActive={true}
          label='Choose an event you will participating in:'
        />
      )}
      {!isUpdate && parent.state.events.length > 0 && (
        <EventTimeSlot
          OnHandleGetTimeSlots={parent.OnHandleGetTimeSlots}
          isReset={parent.state.isReset}
          schedules={parent.state.schedules}
          onResetSelected={parent.OnHandleResetSelected}
          parent={parent}
        />
      )}
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
