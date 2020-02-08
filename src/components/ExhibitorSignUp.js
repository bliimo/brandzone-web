import React from 'react';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import PictureUpload from './PictureUpload';
import Slots from './Slots';

const ExhibitorSignUp = ({ parent, isUpdate }) => {
  let { multipleEvent, schedules } = parent.state;
  const items = parent.state.events;
  let slots = [];
  if (schedules.isAllEvent && schedules.scheds) {
    schedules.scheds.map(s => {
      s.events.map((e, i) => {
        let scheds = e.schedules;
        let eventId = e.id;
        schedules = { scheds, eventId };
        slots.push(<Slots key={i} parent={parent} schedules={schedules} title={e.title} />);
      });
    });
  } else {
    slots.push(
      <Slots
        key={1}
        parent={parent}
        schedules={schedules}
        title={'Select your available time slots'}
      />
    );
  }

  items.map((e, i) => {
    if (e) {
      if (e.title != 'All') {
        for (let index = 0; index < multipleEvent.length; index++) {
          for (let index2 = 0; index2 < multipleEvent[index].events.length; index2++) {
            if (items[i].id == multipleEvent[index].events[index2].id) {
              items[i]['multiple'] = multipleEvent[index];
              break;
            }
          }
        }
      }
    }
  });

  return (
    <div>
      <TextInput
        placeHolder='Institution Name'
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
        placeHolder='Institution Profile'
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
        placeHolder='Unique and Strong Programs'
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
          items={items}
          action={parent.OnHandleEventType}
          isActive={true}
          label='Choose an event you will participating in:'
        />
      )}
      {!isUpdate && parent.state.events.length > 0 && slots}
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
