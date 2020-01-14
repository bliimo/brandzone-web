import React from 'react';
import { NavLink } from 'react-router-dom';
import Warning from './Warning';

const ProfilesHeader = ({ onUserAdd }) => (
  <div>
    <Warning text='Warning!!! Profiles is still in beta. You may encounter bugs.' />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <h1>Profiles</h1>
      <NavLink
        style={{
          backgroundColor: 'deeppink',
          color: 'white',
          fontSize: 14,
          fontWeight: 'bold',
          padding: 15,
          borderRadius: 5
        }}
        onClick={onUserAdd}
        type='button'
        to='/add-profile'
      >
        ADD PROFILE
      </NavLink>
    </div>
  </div>
);

export default ProfilesHeader;
