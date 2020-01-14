import React from 'react';
import { NavLink } from 'react-router-dom';

const BannersHeader = ({ onUserAdd }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <h1>Banners</h1>
    <NavLink
      style={{
        backgroundColor: 'deeppink',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 15,
        borderRadius: 5
      }}
      type='button'
      to='/add-banner'
    >
      ADD PHOTO
    </NavLink>
  </div>
);

export default BannersHeader;
