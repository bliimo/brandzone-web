import React from 'react';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import PictureUpload from './PictureUpload';
import Checkbox from './Checkbox';
import Text from './Text';
import Slots from './Slots';
import { getMonthName } from '../helper/date';

const ParticipantSignUp = ({ parent, events, isUpdate, id, Activeid, isActive }) => {
  let { multipleEvent, schedules } = parent.state;
  const items = parent.state.events;
  let slots = [];
  if (schedules && schedules.isAllEvent && schedules.scheds) {
    schedules.scheds.map(s => {
      s.events.map((e, i) => {
        let dateArr = e['date'].split('T')[0].split('-');
        let date = `${getMonthName(dateArr[1])} ${dateArr[2]}`;
        let scheds = e.schedules;
        let eventId = e.id;
        schedules = { scheds, eventId };
        const roles = e.roles.split(',');
        let isParticipants = false;
        roles.map(r => {
          if (parseInt(r) == 1) isParticipants = true;
        });
        if (isParticipants) {
          slots.push(
            <Slots key={i} parent={parent} schedules={schedules} title={`${date} - ${e.address}`} />
          );
        }
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
  if (items) {
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
  }
  return (
    <div>
      {parent.state.institutionType && !parent.state.isNewInstitution && (
        <Text className='label-input mt-4'>Institution name</Text>
      )}
      {parent.state.otherInstitution && parent.state.isNewInstitution && (
        <Text className='label-input mt-4'>Institution name</Text>
      )}
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
          className='check-others'
          text='Others'
          checked={parent.state.isNewInstitution}
          onSelect={parent.OnHandleNewInstitutions}
          id='check-others'
        />
      </div>
      {parent.state.companyName && <Text className='label-input mt-3'>Name of Company</Text>}
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
      {parent.state.companyCountry && <Text className='label-input'>Country</Text>}
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
      {parent.state.companyProvince && <Text className='label-input'>Province</Text>}
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
      {parent.state.companyCity && <Text className='label-input'>City</Text>}
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
      {parent.state.companyWebsite && <Text className='label-input'>Website</Text>}
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
      {parent.state.companyProfile && (
        <Text className='label-input'>Short profile of the Company</Text>
      )}
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
        rows={10}
        maxLength={5000}
      />
      <hr style={style.divider} />
      {parent.state.firstName && <Text className='label-input'>Representative First name</Text>}
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
      {parent.state.lastName && <Text className='label-input'>Representative Last name</Text>}
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
      {parent.state.jobTitle && <Text className='label-input'>Job Title</Text>}
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
      {!isUpdate && parent.state.signUpEmail && <Text className='label-input'>Email</Text>}
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
      {!isUpdate && parent.state.signUpPassword && <Text className='label-input'>Password</Text>}
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
      {!isUpdate && parent.state.confirmPassword && (
        <Text className='label-input'>Confirm Password</Text>
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
      {parent.state.phoneNumber && <Text className='label-input'>Telephone Number</Text>}
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
      {!isUpdate && (
        <Text style={style.txt}>
          Choose all timeslot/s that you will be available to meet with the Canadian Institutions.
        </Text>
      )}
      {!isUpdate && parent.state.events.length > 0 && (
        <Dropdown
          items={items}
          isEvent={true}
          action={parent.OnHandleEventType}
          isActive={true}
          customClass='mb-4'
          label={`Choose an event you you\'ll participate in:`}
          usertype={parent.state.userTypeSelected}
        />
      )}
      {!isUpdate && parent.state.events.length > 0 && slots}
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
  },
  txt: {
    font: '14px helvetica',
    color: '#fff',
    marginBottom: '1em'
  }
};
