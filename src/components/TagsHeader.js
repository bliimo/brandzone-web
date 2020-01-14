import React from 'react';
import { NavLink } from 'react-router-dom';
import Warning from './Warning';

const TagsHeader = ({ onUserAdd }) => (
  <div>
    <Warning text='Warning!!! Tags is still in beta. You may encounter bugs.' />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <h1>Tags</h1>

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
        to='/add-tag'
      >
        ADD TAG
      </NavLink>
    </div>
  </div>
);

export default TagsHeader;
