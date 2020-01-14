import React from 'react';
import { NavLink } from 'react-router-dom';

const UserHeader = ({ onUserAdd }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <h1>Users</h1>
    <NavLink
      type='button'
      style={{
        backgroundColor: 'deeppink',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 15,
        borderRadius: 5
      }}
      to='/add-user'
    >
      ADD USER
    </NavLink>
  </div>
);

export default UserHeader;
